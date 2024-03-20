const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.username}:${config.password}:${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('TODO: FILL THIS IN');
const users = db.collection('users');
const images = db.collection('images');

