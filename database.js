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
    const passwordHash = await bcrypt.hash(user.password, 10)

    await users.insertOne({
        username: user.username,
        email: user.email,
        password: passwordHash,
        token: uuid.v4(),
        savedImages: [],
    })

    return true;
}

// Returns a JSON object with one property - IsAuthenticated: boolean
async function authenticateUser(username, password) {
    let user = await getUserByUsername(username);
    if (await bcrypt.compare(password, user.password)) {
        return { isAuthenticated: true };
    } else {
        return { isAuthenticated: false };
    }
}

function getUserByEmail(email) {
    return users.findOne({ email: email });
}

function getUserByUsername(username) {
    return users.findOne({ username: username });
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
    getUserByUsername,
    getUserByAuthToken,
    getImages,
    addUserImage,
};