const express = require('express');
const socket = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

if (process.env === 'production'){
    app.use(express.static(path.join(__dirname, '../../build')));
}

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://admin:a12345@ds217921.mlab.com:17921/web_final', function(err) {
    if (err) throw err;
});

var connection = mongoose.connection;

connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', function(callback) {
    console.log('connection open');
    // connection.db.collection("shops", function(err, collection) {
    // 	collection.find({}).toArray(function(err, data) {
    // 		console.log(data);
    // 	})
    // })
});




const userList = [
    { account: 'admin', password: '123' , age: '20', cart: [], order: []},
    { acocunt: 'tony' , password: '123', age: '21', cart: [], order: []}
];
const rice = {
    name: 'rice',
    price: 100,
};

const meat = {
    name: 'meat',
    price: 10,
};

const coke = {
    name: 'coke',
    price: 1000,
};

const shop1 = {
    name:'活大自助餐',
    rate: 0.5,
    img: 'https://uploadfile.huiyi8.com/2015/1201/20151201054035448.jpg',
    food: [rice, meat],
};

const shop2 = {
    name: '胖老爹',
    rate: 5,
    img: 'https://picdn.gomaji.com/products/918/182918/182918_1_1_r.jpg',
    food: [meat, coke],
};

const shoplist = [shop1, shop2];
const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
    console.log('server is running on port ' + port);
});

const io = socket(server);

const log = [];


app.get('/api/home', function(req, res){
    connection.db.collection('shops', function(err, collection) {
        collection.find({}).toArray(function(err, data) {
            res.send(data);
        });
    });
    io.emit('RECEIVE_MESSAGE', {from: 'bot', message: 'hello' });
});

app.post('/api/login', function(req, res){
    let user = userList.find(function(e) {
        return e.account === req.body.account;
    });
    if (user && user.password === req.body.password) {
        console.log(user.account + ' log in');
        res.send({ valid: true });
    }
    else {
        res.send({ valid: false});
    }
});

app.post('/api/register', function(req, res){
    userList.push({
        account: req.body.account,
        password: req.body.password,
        age: req.body.age,
        cart: [],
        order: [],
    });
    res.send({valid: true});
    console.log(userList);
});
app.get('/api/shop', function(req, res){
    let shop = shoplist.find(function(e) {
        return e.name === req.query.shopname;
    });
    if (shop) {
        res.send({
            food: shop.food,
            img: shop.img
        });
    }
    else {
        res.send('error');
    }
});

app.post('/api/addtocart', function(req, res){
    let account = userList.find(function(e) {
        return e.account === req.body.account;
    });
    if (account) {
        account.cart.push({
            food: req.body.food,
            price: req.body.price,
            quantity: req.body.quantity,
        });
    }
    else {
        res.send('error');
    }
    console.log(account);
});

app.get('/api/cart', function(req, res){
    let account = userList.find(function(e) {
        return e.account === req.query.account;
    });
    console.log(account);
    if (account) {
        res.send(account.cart);
    }
    else {
        res.send('error');
    }
});

app.get('/api/checkout', function(req, res){
    let account = userList.find(function(e) {
        return e.account === req.query.account;
    });
    console.log(account);
    if (account) {
        console.log(account.cart);
        account.order.push({
            id: (account.order.length+1).toString(),
            content: account.cart,
            rate: 0,
            deliver: req.query.deliver,
        });
        console.log(account.order);
        account.cart = [];
        res.send( {success: true} );
    }
    else {
        res.send('error');
    }
});

app.get('/api/clearcart', function(req, res){
    let account = userList.find(function(e) {
        return e.account === req.query.account;
    });
    console.log(account);
    if (account) {
        account.cart = [];
        res.send( {success: true} );
    }
    else {
        res.send('error');
    }
});

app.get('/api/account', function(req, res){
    let account = userList.find(function(e) {
        return e.account === req.query.account;
    });
    console.log(account);
    if (account) {
        res.send(account.order);
    }
    else {
        res.send('error');
    }
});

app.get('/api/order', function(req, res){
    let account = userList.find(function(e) {
        return e.account === req.query.account;
    });
    let order = account.order.find(function(e){
        console.log(e);
        return e.id === req.query.id;
    });
    console.log(order);
    if (order) {
        res.send({
            content: order.content,
            rate: order.rate,
            status: 'success',
        });
    }
    else {
        res.send('error');
    }
});

app.get('/api/rate', function(req, res){
    let account = userList.find(function(e) {
        return e.account === req.query.account;
    });
    let order = account.order.find(function(e){
        console.log(e);
        return e.id === req.query.id;
    });
    console.log(order);
    if (order) {
        res.send({
            rate: order.rate,
            status: 'success',
        });
    }
    else {
        res.send('error');
    }
});

app.get('/api/updaterate', function(req, res){
    let account = userList.find(function(e) {
        return e.account === req.query.account;
    });
    let order = account.order.find(function(e){
        console.log(e);
        return e.id === req.query.id;
    });
    console.log(order);
    if (order) {
        order.rate = req.query.rate;
        res.send({
            status: 'success',
        });
        console.log(account);
    }
    else {
        res.send('error');
    }
});

app.get('/api/messenger', function(req, res){
    res.send({
        log: log
    });
});




io.on('connection', (socket) => {
    console.log(`Socket ID: ${socket.id} connected`);

    socket.on('SEND_MESSAGE', (data) => {
        log.push(data);
        io.emit('RECEIVE_MESSAGE', data);
        if (data.message === 'wtf'){
            io.emit('RECEIVE_MESSAGE', {
                from: 'bot',
                message: 'whats up bro',
            });
        }
    });
});



