require('./config/config');

const path = require('path');
const _ = require('lodash');
var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');
const bcrypt = require('bcryptjs');
var cloudinary = require('cloudinary');

var {mongoose} = require('./db/mongoose');
var {Story} = require('./models/story');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');
var {upload} = require('./server-utils/multer');

var app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
require('./sockets')(io);
const port = process.env.PORT;
const publicPath = path.join(__dirname, '..', 'public');
app.use(express.static(publicPath));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//add new story
app.post('/stories', authenticate, (req, res) => {
  var story = new Story({
    heading: req.body.heading,
    text: req.body.text,
    privacy: req.body.privacy,
    creatorName: req.user.fullName,
    _creator: req.user._id
  });

  story.save().then((story) => {
    res.send({story});
  }).catch((e) => {
    res.status(400).send(e);
  });
});

//get all public strories
app.get('/stories/public', (req, res) => {
  Story.find({
    privacy: false
  }).then((stories) => {
    res.send({stories});
  }).catch((e) => {
    res.status(400).send(e);
  });
});

//get all public stories from an individual user by userId
app.get('/stories/allpublic/:id', (req, res) => {
  var id = req.params.id;
  if(!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Story.find({
    _creator: id,
    privacy: false
  }).then((stories) => {
    return User.findById(id).then((user) => {
      res.send({
        stories,
        creatorImage: user.imageName
      });
    });
  }).catch((e) => {
    res.status(400).send(e);
  });
});

//get One public story by storyId
app.get('/stories/singlepublic/:id', (req, res) => {
  var id = req.params.id;

  if(!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Story.findOne({_id: id, privacy: false}).then((story) => {
    if(!story) {
      return res.status(404).send();
    }
    
    return User.findById(story._creator).then((user) => {
      res.send({
      story,
      createdAt: story._id.getTimestamp(),
      creatorImage: user.imageName
      });
    });
  }).catch((e) => {
    res.status(400).send(e);
  });
});

//get all strories of authenticated(active) user
app.get('/stories', authenticate, (req, res) => {
  Story.find({
    _creator: req.user._id
  }).then((stories) => {
    res.send({stories});
  }).catch((e) => {
    res.status(400).send(e);
  });
});

//delete a story
app.delete('/stories/:id', authenticate, (req, res) => {
  var id = req.params.id;

  if(!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Story.findOneAndRemove({_id: id, _creator: req.user._id}).then((story) => {
    if(!story) {
      return res.status(404).send();
    }

    res.send({story});
  }).catch((e) => {
    res.status(400).send(e);
  })
});

//update a story
app.patch('/stories/:id', authenticate, (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['heading', 'text', 'privacy', 'completed']);

  if(!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if(_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime()
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Story.findOneAndUpdate({_id: id, _creator: req.user._id}, {$set: body}, {new: true}).then((story) => {
    if(!story) {
      return res.status(404).send();
    }

    res.send({story});
  }).catch((e) => {
    res.status(400).send(e);
  })
});

//comment on a story
app.patch('/stories/comment/:id', authenticate, (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['comment']);

  if(!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  body.commentedBy_userName = req.user.fullName;
  body.commentedBy_userId = req.user._id;
  body.commentedAt = new Date().getTime();

  Story.findOneAndUpdate({_id: id}, {$push: {comments: body}}, {new: true}).then((story) => {
    if(!story) {
      return res.status(404).send();
    }

    res.send(body);
  }).catch((e) => {
    res.status(400).send(e);
  })
});

// -auth part from below- //

//SignUp route
app.post('/users', (req,res) => {
  var body = _.pick(req.body, ['fullName', 'email', 'password']);
  var user = new User(body);

  user.save().then(() => {
      return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  });
});

//user edit
app.post('/users/edit', authenticate, (req, res) => {
  var body = _.pick(req.body, ['coverQuote', 'bio', 'location']);

  User.findByIdAndUpdate({_id: req.user._id}, {$set: body}, {new: true}).then((user) => {
    if(!user) {
      res.status(404).send();
    }
    res.send({ user })
  }, (err) => {
    res.status(400).send(err);
  });
});

//image upload 
app.post('/upload', authenticate, (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.status(400).send(err);
    } else {
      if (req.file == undefined) {
        res.status(400).send('Error: No File Selected!');
      } else {
        cloudinary.uploader.upload(
          path.join(__dirname, '..', `public/images/${req.file.filename}`),
          (result) => { 
            const dpUrl = `v${result.version}/${result.public_id}.${result.format}`;
            User.findByIdAndUpdate({_id: req.user._id}, {$set: {dpUrl}}, {new: true}).then((user) => {
              res.status(200).send({dpUrl});
            }, (err) => {
              res.status(400).send(err);
            });
           },
          { public_id: `${req.user._id}_dp`,
            invalidate: true
          }      
        )
      }
    }
  });
});



//this route will return a individual authenticated user
app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

app.get('/users/:id', (req, res) => {
  const id = req.params.id;
  User.findById(id).then((user) => {
    if(!user) {
      res.status(404).send();
    }
    res.send({user});
  }).catch((e) => {
    res.status(400).send(e);
  })
})

// POST /users/login {email, password}
app.post('/users/login', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);

  User.findByCredentials(body.email, body.password).then((user) => {
    return user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user);
    });
  }).catch((e) => {
    res.status(400).send();
  });
});

app.delete('/users/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  }, () => {
    res.status(400).send();
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'))
})

server.listen(port, () => {
  console.log(`started up at port ${port}`);
});

module.exports = {app};
