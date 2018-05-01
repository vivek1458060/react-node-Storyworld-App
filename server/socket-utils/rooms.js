const {Room} = require('../models/room');

class Rooms {
    constructor() {
        this.rooms = [];
    }
    createRoom(creator, name) {
        return new Room({ name, users: [creator], admin: [creator] }).save().then((room) => {  
            const filteredRoom = {
                id: room._id,
                name: room.name,
                users: room.users,
                messages: []
            }
            this.rooms.push(filteredRoom);
            return filteredRoom;
        });
    }
}

const rooms = new Rooms();
rooms.createRoom('5acf2cf41cfb5623ecf87ac0', 'bhatha').then((room) => {
    console.log(room);
}).catch((e) => {
    console.log(e);
});
