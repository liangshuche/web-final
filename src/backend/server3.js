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
});

var Schema = mongoose.Schema;

const UserSchema = new Schema({
    account: String,
    password: String,
    age: String,
    cart: [],
    order: [],
    manage: String,
});

var FoodSchema = new Schema({
    name: String,
    price: String,
    shoplist: [String],
    img: String,
});

var ShopSchema = new Schema({
    name: String,
    rate: String,
    img: String,
    foods: [String]
});

var OrderSchema = new Schema({
    deliver: String,
    content: [],
    shop: String,
});

var MessageSchema = new Schema({
    from: String,
    time: String,
    message: String,
})

var User  = mongoose.model('Users' , UserSchema);
var Food  = mongoose.model('Foods' , FoodSchema);
var Shop  = mongoose.model('Shops' , ShopSchema);
var Order = mongoose.model('Orders', OrderSchema);
var Message = mongoose.model('Messages', MessageSchema);
/*
var u = new Order({
    rate: 5,
    deliver: 'delivered',
    content: [],
    shop:[],
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
const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
    console.log('server is running on port ' + port);
});


const io = socket(server);

var log = [];


app.get('/api/home', function(req, res){
    var query = Shop.find({});
    query.exec().then(function(shops){
        res.send(shops);
    });
});

app.post('/api/login', function(req, res){
    var query = User.findOne({account: req.body.account});
    query.exec().then(function(account){
        if(account.password === req.body.password){
            console.log(account.account + ' log in');
            res.send({
                valid: true,
                manage: account.manage,
            });
        } else {
            res.send({ valid: false });
        }
    }).catch(function(){
        res.send({ valid: false });
    });
});

app.post('/api/register', function(req, res){
    var query = User.find({account: req.body.account});
    query.exec().then(function (accounts){
        if (accounts.length){
            res.send({valid: false});
        }
        else {
            var newAccount = new User({
                account: req.body.account,
                password: req.body.password,
                age: req.body.age,
                cart: [],
                order: [],
                manage: '',
            });
            newAccount.save().then(() => {
                res.send({valid: true});
            }).catch((err) => {console.log(err)});
        }
    });
});

app.get('/api/shop', function(req, res){
    let food_list = [];
    let shop_img = '';
    let shop_rate= '';
    var promises = [];
    var query = Shop.findOne({ name: req.query.shopname });
    query.exec().then(function(shop){
        console.log(shop)
        shop_img = shop.img;
        shop_rate = shop.rate;
        for(let i=0;i<shop.foods.length;++i){
            var query_food = Food.findOne({ name: shop.foods[i]});
            var promise = (query_food.exec().then(function(food){
                food_list.push({
                    name: food.name,
                    price: food.price,
                });
            }));
            promises.push(promise);
        }
    }).then(function(){
        Promise.all(promises).then(function (){
    
            console.log(food_list);
            res.send({
                food: food_list,
                img: shop_img,
                rate: shop_rate,
            });
        });
    });
});

app.post('/api/addtocart', function(req, res){
    var query = User.findOneAndUpdate({account: req.body.account},{$set: {cart: req.body.cart}}, {new: true});
    query.exec().then(function(account){
        res.send( {success: true });
    }).catch(function(err){
        res.send( {success: false });
    });

});

app.get('/api/cart', function(req, res){
    var query = User.findOne({ account: req.query.account });
    query.exec().then(function(account){
        console.log(account);
        res.send(account.cart);
    }).catch(function(err){
        res.send('error');
    });

});

app.get('/api/checkout', function(req, res){
    let thisorder = '';
    var query = User.findOne({ account: req.query.account });
    query.exec().then(function(account){
        thisorder = {
            id: (account.order.length+1).toString(),
            content: account.cart,
            rate: 0,
            deliver: req.query.deliver,
        };
    }).then(function(){
        var query_2 = User.findOneAndUpdate({account: req.query.account},{$set: {cart: []}, $push: {order: thisorder}}, {new: true});
        query_2.exec().then(function(){
            res.send( {success: true });
        }).catch(function(err){
            res.send( {success: false });
        });
    });
    
});

app.get('/api/clearcart', function(req, res){
    var query = User.findOneAndUpdate({account: req.query.account},{$set: {cart: []}}, {new: true});
    query.exec().then(function(account){
        res.send( {success: true });
    }).catch(function(err){
        res.send( {success: false });
    });
});

app.get('/api/account', function(req, res){
    var query = User.findOne({ account: req.query.account });
    query.exec().then(function(account){
        res.send( account.order.reverse() );
    }).catch(function(err){
        console.log(err);
    });
});

app.get('/api/order', function(req, res){
    var query = User.findOne({ account: req.query.account });
    query.exec().then(function(account){
        let order = account.order.find(function(e){
            return e.id === req.query.id;
        });
        if (order){
            res.send({
                content: order.content,
                rate: order.rate,
                success: true,
                dest: order.deliver,
            });
        } else {
            res.send( {success: false});
        }
    });
});

app.get('/api/rate', function(req, res){
    var query = User.findOne({ account: req.query.account });
    query.exec().then(function(account){
        let order = account.order.find(function(e){
            return e.id === req.query.id;
        });
        if (order){
            res.send({
                rate: order.rate,
                success: true,
            });
        } else {
            res.send( {success: false});
        }
    });
});

app.get('/api/updaterate', function(req, res){
    var query = User.findOne({ account: req.query.account });
    query.exec().then(function(account){
        let orders = account.order;
        let order = orders.find(function(e){
            return e.id === req.query.id;
        });
        order.rate = req.query.rate;
        var query_account = User.findOneAndUpdate({ account: req.query.account }, {$set: {order: orders}}, {new: true});   
        query_account.exec().then(function(){
            res.send( {success: true} );
        }).catch(function(){
            res.send( {success: false} );
        });
    });
});

var logs = [];

app.get('/api/messenger', function(req, res){
    /*
    var query = Message.find({}).sort({time: 1});
    var log = []
    query.exec().then(function(messages){
        messages.forEach(function(message){
            log.push(message);
        })
    }).then(function(){
        console.log('logs',logs);
        res.send({ log: logs });
    });
    */
    console.log('logs', logs);
    res.send({log: logs});
    
});

app.get('/api/manage', function(req, res){
    const shopname = req.query.shop;
    
});

var options = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
};


io.on('connection', (socket) => {
    console.log(`Socket ID: ${socket.id} connected`);
    
    socket.on('SEND_MESSAGE', (data) => {
        let time = new Date();       
        var promises = [];
        var dataMessage = new Message({
            from: data.from,
            time: time.toLocaleString('en', options),
            message: data.message,
        });
        dataMessage.save().then(() => {
            io.emit('RECEIVE_MESSAGE', dataMessage);
            logs.push(data.message);
        }); 
        var message_bot = "";

        console.log(data.message);
        
        if(data.message.includes('hi')){
            message_bot = 'hihi';
            var newMessage = new Message({
                from: 'Bot',
                time: time.toLocaleString('en', options),
                message: message_bot,
            })
            Promise.all(promises).then(
                newMessage.save().then(() => {
                    io.emit('RECEIVE_MESSAGE', newMessage);
                    logs.push(message_bot)
                })
            );

        }
        else if (data.message.includes('account')) {
            console.log(data.message);
        }

    else {
        
        switch (data.message){
            case '1':
                message_bot = "";

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
        var newMessage = new Message({
            from: 'Bot',
            time: time.toLocaleString('en', options),
            message: message_bot,
        })
        Promise.all(promises).then(
            newMessage.save().then(() => {
                io.emit('RECEIVE_MESSAGE', newMessage);
                logs.push(message_bot);
            })
        );

    }// else    
    });

});



