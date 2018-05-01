const {mongoose} = require('../db/mongoose');

const RoomSchema = new mongoose.Schema({
    name: { type: String, trim: true, minlength: 1, required: true },
    users: [mongoose.Schema.Types.ObjectId],
    messages: [{
        name: {type: String, trim: true, minlength: 1, required: true},
        message: {type: String, trim: true, minlength: 1, required: true},
        createdAt: {type: Number, required: true}
    }],
    admin: [mongoose.Schema.Types.ObjectId]
})

const Room = mongoose.model('Room', RoomSchema);

module.exports = {Room};