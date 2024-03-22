const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.username}:${config.password}@${config.hostname}/?retryWrites=true&w=majority&appName=MyRPGVisual`;
const client = new MongoClient(url);
const db = client.db('myrpgvisual');
const users = db.collection('users');
const images = db.collection('images');

// Authentication Functions
async function createUser(user) {
    await users.insertOne({
        username: user.username,
        email: user.email,
        password: "abc123",
        savedImages: [],
    })
    return true;
}

async function authenticateUser(username, password) {

}

async function getUserByEmail(email) {

}

async function getUserByAuthToken(token) {

}

// Image Functions
async function getImages() {

}

async function addUserImage() {

}


module.exports = {
    createUser,
    authenticateUser,
    getUserByEmail,
    getUserByAuthToken,
    getImages,
    addUserImage,
};