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
//app.use(express.static(path.join(__dirname, '../../build')));
if (process.env.NODE_ENV === 'production'){
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
    connection.db.collection('shops', function(err, collection) {
     	collection.find({}).toArray(function(err, data) {
     		console.log(data);
     	});
    });
});

var Schema = mongoose.Schema;

const UserSchema = new Schema({
    account: String,
    password: String,
    age: String,
    cart: [],
    order: [],
    manage: String
});

var FoodSchema = new Schema({
    name: String,
    price: String,
    shoplist: [],
    img: String,
});

var ShopSchema = new Schema({
    name: String,
    rate: String,
    img: String,
    foods: []
});

var OrderSchema = new Schema({
    updated: {type: Date, default: Date.now},
    rate: String,
    deliver: String,
    content: [],
    shop: []
});

var User  = mongoose.model('Users' , UserSchema);
var Food  = mongoose.model('Foods' , FoodSchema);
var Shop  = mongoose.model('Shops' , ShopSchema);
var Order = mongoose.model('Orders', OrderSchema);
/*
var u = new User({
    account: 'admin',
    password: '123',
    age: '21',
    cart: [],
    order:[],
    manage:''
});

 u.save().then(() => {
     var query = Order.find();

     var promise = query.exec();

    promise.then(function (posts){
        posts.forEach(function(post){
            console.log(posts)
        });		
    }).catch((err) => {console.log(err);});
}).catch((err) => {console.log(err);});
*/

/*
User.findOneAndUpdate({_id: "5b3adb402b00883c4a581412"}, {$set:{cart:[("5b38952e2fad6c08b827103f")]}}, {new: true}, function(err, doc){
    if(err)
        console.log("wrong!!!");

    console.log(doc.account);
})
*/

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
    connection.db.collection('users', function(err, collection) {
        collection.find({account: req.body.account}).toArray(function(err, data) {
            data = data[0];
            if(data.password == req.body.password) {
                console.log(data.account + 'log in');
                res.send({
                    valid: true,
                    manage: data.manage,
                });
            }
            else {
                res.send({valid: false});
            }
        })
    })
    /*
    let user = userList.find(function(e) {
        return e.account === req.body.account;
    });
    if (user && user.password === req.body.password) {
        console.log(user.account + ' log in');
        res.send({ 
            valid: true,
            manage: user.manage,
        });
    }
    else {
        res.send({ valid: false});
    }
    */
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

app.get('/api/manage', function(req, res){
    const shopname = req.query.shop;
    
})

var options = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
};

io.on('connection', (socket) => {
    console.log(`Socket ID: ${socket.id} connected`);
    
    let time = new Date();       
    socket.on('SEND_MESSAGE', (data) => {

        var promises = [];

        data.time=time.toLocaleString('en', options)
        
        var message_bot = "";
        log.push(data);
        console.log(data);

        io.emit('RECEIVE_MESSAGE', data);

        console.log(data.message);
        
        if(data.message.includes('hi')){
            message_bot = '找餐廳？ EEat!';
            Promise.all(promises).then(
            io.emit('RECEIVE_MESSAGE', {
              time: time.toLocaleString('en', options),
              from: 'Bot',
              message: message_bot,
            })
        );

        }
        else if (data.message.includes('account')) {
            console.log(data.message);
        }

    else {
        
        switch (data.message){
            case '1':

	        	var query = Shop.find();
	        	var promise = (
                    query.exec().then(function (shops){
			        shops.forEach(function(shop){
                        console.log(shop.name)
                        message_bot += String(shop.name);
                        message_bot += '\n';
			            })
		            })
                    .then(() => {
                        io.emit('RECEIVE_MESSAGE', {
                        time: time.toLocaleString('en', options),
                        from: 'Bot',
                        message: message_bot,
                        });
                    } 
                    ).catch((err) => {console.log(err)})
                );
                promises.push(promise);
 

                break;
            case '2':
                message_bot = '請問要找什麼食物？ \n2A:速食 \n2B:飲料 \n2C: 其他';
                break;
            case '2A':
                message_bot = '速食餐廳有： \n吉野家\n麥當勞\n胖老爹\npizza hut';
                break;
            case '2B':
                message_bot = '飲料店有： \n星巴克';
                break;
            case '2C':
                message_bot = '剩鼎泰豐，你吃不起';
                break;
            case '3':
                message_bot = '請問要找哪筆訂單？ 請輸入你的帳號來查詢(格式：account:[your account name])';
                break;
            case '4':
                message_bot = '請問你有選擇障礙ㄇ 我來幫你選餐廳...';
                ran = Math.floor(Math.random() * 6);
                shops_ = ['鼎泰豐', 'pizza_hut', 'Starbucks', '麥當勞', '胖老爹', '吉野家'];
                choice = shops_[ran];
                message_bot += '\n你吃';
                message_bot += choice;
                message_bot += '好了';
                break;
            default:
                message_bot = 'Welcome to EEat\n options: \n1:EE找餐廳 \n2:EE找美食 \n3:EE找訂單 \n4:EE吃什麼\n';            
        }
        Promise.all(promises).then(
            io.emit('RECEIVE_MESSAGE', {
              time: time.toLocaleString('en', options),
              from: 'Bot',
              message: message_bot,
            })
        );
    }// else    
    });
});


