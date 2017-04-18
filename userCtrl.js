var users = require('./users.js');

var allUsers;

exports.readAll = () => {
    return users.find();;
}

exports.findUserById = (userId) => {
    var user = users.findOne('id', userId);
    return user ? user : null;
}

exports.getAdmins = () => {
    var admins = users.find('type', 'admin');
    return admins ? admins : null;
}

exports.getNonAdmins = () => {
    var nonAdminUsers = users.find('type', 'user');
    return nonAdminUsers ? nonAdminUsers : null;
}

exports.getUsersByFavorite = (favorite) => {
    allUsers = users.find();
    var usersWithFav = allUsers.filter(user => {
    if (user.favorites.indexOf(favorite) !== -1) {
        return user;
        }
    })
  return usersWithFav ? usersWithFav : null;
}

exports.getUsersByAgeLimit = (age) => {
    allUsers = users.find();
    var underThisAge = allUsers.filter(user => {
        return user.age < age;
    })
    return underThisAge ? underThisAge : null;
}

exports.findUserByQuery = (query, value) => {
    if (query === 'last_name') {
        allUsers = users.find(query, value);
        return allUsers ? allUsers : null;
    } 
    if (query === 'email') {
        allUsers = users.find(query, value);
        return allUsers ? allUsers : null;
    }
    if (query === 'state') {
        allUsers = users.find(query, value);
        return allUsers ? allUsers : null;
    }
}

exports.createUser = (user, obj) => {
    var newUser = users.add(user, obj);
    return newUser ? newUser : null;
}

exports.updateUser = (userId, obj) => {
    var updatedUser = users.update('id', userId, obj);
    return updatedUser;
}

exports.removeUser = function(userId) {
    var deletedUser = users.findOne('id', userId);
    users.remove('id', userId);
    return deletedUser;
}