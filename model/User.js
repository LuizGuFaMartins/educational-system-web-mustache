let ids = 0;
let users = [];

module.exports = {
    new(name) {
        let user = {id: ++ids, name: name};
        users.push(user);
        return user;
    },
    update (id, name) {
        let pos = this.getPositionById(id)
        if (pos >= 0) {
            users[pos].name = name;
        }
    },
    list() {
        return users;
    },
    getElementById(id) {
        let pos = this.getPositionById(id)
        if (pos >= 0) {
            return users[pos];
        }
        return null;
    },
    getPositionById(id) {
        for (let i = 0; i<users.length; i++) {
            if (users[i].id == id) {
                return i;
            }
        }
        return -1;
    },
    delete(id) {
        let i = this.getPositionById(id);
        if (i >= 0) {
            users.splice(i, 1);
            return true;
        }
        return false; 
    }
}