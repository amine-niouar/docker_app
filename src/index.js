const express = require('express');
//const mongoose = require('mongoose');
const { Client } = require('pg');
const redis = require('redis');

const PORT= process.env.PORT | 5000;
const app = express();

const redis_port = 6379;
const redis_host = 'redis';
const redisClient = redis.createClient({
    url: `redis://${redis_host}:${redis_port}`
});
redisClient.on('error', err => console.log('Redis Client Error', err));

redisClient.on('connect', () => console.log('connected to redis... '));
redisClient.connect(); 




// const db_user = 'root';
// const db_password = 'root';
// const db_port = 27017;
// const db_host = 'mongo';
// const uri = `mongodb://${db_user}:${db_password}@${db_host}:${db_port}`;
// mongoose.connect(uri).then(() => console.log('connect to db ...')).catch((err) => console.log('failed to connect to db ',err));

const db_user = 'root';
const db_password = 'root';
const db_port = 5432;
const db_host = 'postgres';
const uri = `postgresql://${db_user}:${db_password}@${db_host}:${db_port}`;
const client = new Client({
    connectionString : uri ,
});  

client.connect()
   .then(() => console.log('connect to postgress db ...'))
   .catch((err) => console.log('failed to connect to postgress db ',err));

app.get('/',(req,res) => {
    redisClient.set('players','players...');    
    res.send("Hello World noice \n")

});

app.get('/data',async (req,res) => {
    const players = await redisClient.get('players');
    res.send(`Welcome to ${players} \n`)

});

app.listen(PORT,() => console.log("CHANGE HER"));
