var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var userCtrl = require('./userCtrl.js');

var allUsers;

var donkey = function(prop) {
    return prop ? res.status(200).send(prop) : res.sendStatus(404);
}

app.use(bodyParser.json());

app.get('/api/users/', function(req, res) {
    if (req.query === 'favorites') {
        allUsers = userCtrl.getUsersByFavorite(req.query.favorites)
        return allUsers ? res.status(200).send(allUsers) : res.sendStatus(404);
    } 

    if (req.query === 'age') {
        allUsers = userCtrl.getUsersByAgeLimit(req.query.age)
        return allUsers ? res.status(200).send(allUsers) : res.sendStatus(404);
    } 

    if (req.query === 'last_name') {
        allUsers = userCtrl.findUserByQuery(req.query.last_name)
        return allUsers ? res.status(200).send(allUsers) : res.sendStatus(404);
    } 

    if (req.query === 'email') {
        allUsers = userCtrl.findUserByQuery(req.query.email)
        return allUsers ? res.status(200).send(allUsers) : res.sendStatus(404);
    } 

    else {
        allUsers = userCtrl.readAll();
        return allUsers ? res.status(200).send(allUsers) : res.sendStatus(404);
  }
})

app.get('/api/users/:id', function(req, res) {
    var user = userCtrl.findUserById(req.params.id);
    return user ? res.status(200).send(user) : res.sendStatus(404);
})

app.get('/api/admins', function(req, res) {
    var admins = userCtrl.getAdmins();
    res.status(200).send(admins)
})

app.get('/api/nonadmins', function(req, res) {
    var nonAdminUsers = userCtrl.getNonAdmins();
    res.status(200).send(nonAdminUsers);
})

app.put('/api/users/:id', function(req, res) {
    var updated = userCtrl.updateUser(req.params.id, req.body);
    return updated ? res.status(200).send(updated) : res.sendStatus(404);
})

app.post('/api/users', function(req, res) {
    var newUser = userCtrl.createUser(req.body);
    return newUser ? res.status(200).send(newUser) : res.sendStatus(404);
})

app.delete('/api/users/:id', function(req, res) {
  var removeUser = userCtrl.removeUser(req.params.id)
  return removeUser ? res.status(200).send(removeUser) : res.sendStatus(404);
})

module.exports = app;