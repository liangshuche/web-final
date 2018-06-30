const express = require('express');
//const socket = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://admin:a12345@ds217921.mlab.com:17921/web-final');
//mongoose.connect('mongodb://localhost/web_test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(callback) {
    console.log('connection open')
});



const userList = [
	{ account: 'admin', password: '123' , age: '20', cart: [], order: []},
	{ acocunt: 'tony' , password: '123', age: '21', cart: [], order: []}
];
const rice = {
	name: 'rice',
	price: 100,
}

const meat = {
	name: 'meat',
	price: 10,
}

const coke = {
	name: 'coke',
	price: 1000,
}

const shop1 = {
	name:'活大自助餐',
	rate: 0.5,
	img: 'https://uploadfile.huiyi8.com/2015/1201/20151201054035448.jpg',
	food: [rice, meat],
}

const shop2 = {
	name: '胖老爹',
	rate: 5,
	img: 'https://picdn.gomaji.com/products/918/182918/182918_1_1_r.jpg',
	food: [meat, coke],
}

const shoplist = [shop1, shop2];



app.get('/', function(req, res){
    res.send(shoplist);
})

app.post('/login', function(req, res){
	let user = userList.find(function(e) {
		return e.account === req.body.account;
	  });
	if (user && user.password === req.body.password) {
		console.log(user.account + ' log in')
		res.send({ valid: true });
	}
	else {
		res.send({ valid: false});
	}
})

app.get('/shop', function(req, res){
	let shop = shoplist.find(function(e) {
		return e.name === req.query.shopname
	})
	if (shop) {
		res.send(shop.food);
	}
	else {
		res.send('error');
	}
})

app.post('/addtocart', function(req, res){
	let account = userList.find(function(e) {
		return e.name === req.body.account
	})
	if (account) {
		account.cart.push({
			food: req.body.food,
			price: req.body.price,
			quantity: req.body.quantity,
		})
	}
	else {
		res.send('error')
	}
	console.log(account);
})

app.get('/cart', function(req, res){
	let account = userList.find(function(e) {
		return e.account === req.query.account
	})
	console.log(account)
	if (account) {
		res.send(account.cart)
	}
	else {
		res.send('error')
	}
})

app.get('/checkout', function(req, res){
	let account = userList.find(function(e) {
		return e.account === req.query.account
	})
	console.log(account)
	if (account) {
		let thisorder = Object.assign({}, account.cart);
		account.order.push(thisorder);
		account.cart = [];
		res.send( {success: true} );
	}
	else {
		res.send('error')
	}
})

app.get('/account', function(req, res){
	let account = userList.find(function(e) {
		return e.account === req.query.account
	})
	console.log(account)
	if (account) {
		res.send(account.order)
	}
	else {
		res.send('error')
	}
})
/*
app.get('/todos', function(req, res){
  Posts.find(function(err, posts) {
    if(err) return console.error(err);
    console.log("existing posts are: ", posts);
    // render index page, passing posts as local variable
    res.render('index', {
      posts: posts
    })
  })
});

app.post('/todos', function(req, res) {
  var post = new Posts({
    user: req.body.user,
    title: req.body.title,
    content: req.body.content,
    time: req.body.time
  })
  console.log("created post: ", post);
  // save post in db!
  post.save(function(err, todo) {
    if(err) return console.error(err);
    console.log('save successful')
    return post;
  })
  // return json of post
  res.json(post);
})
*/
//

const server = app.listen(5000, () => {
  	console.log('server is running on port 5000');
});

//const io = socket(server);


/*
const userList = [
	  { username: 'admin', password: '123' , age: '20'},
	  { username: 'tony' , password: '123', age: '21'}
];


io.on('connection', (socket) => {
  	console.log(`Socket ID: ${socket.id} connected`);
  

  	socket.on('LOGIN', (data) => {
		let user = userList.find(function(e) {
	  		return e.username === data.username;
		});
		if ( user && user.password === data.password){
	  		io.emit('RECEIVE_LOGIN', data.username);
		} else {
	  		io.emit('LOGIN_ERROR');
		}
  	});

  	socket.on('REGISTER', (data) => {
		let user = userList.find(function(e) {
	  		return e.username === data.username;
		});
		if( user ) {
	  		io.emit('ACCOUNT_EXIST');
	 		console.log('account exist error');
		} else {
	  		io.emit('RECEIVE_REGISTER');
	  		console.log('registration success');
	  		userList.push(data);      
		}
  	});

  	socket.on('LOGOUT', () => {
		io.emit('RECEIVE_LOGOUT');
  	});

  	socket.on('NEW_POST', (data) => {
		const newPosts = new Posts({
	  		user: data.user,
	  		title: data.title,
			  content: data.content,
			  time: data.time,  
		});

		newPosts.save().then(() => {
			io.emit('RECEIVE_NEW_POST');
		}).catch((err) => {console.log(err)});
  	});

  	socket.on('GET_POST', () => {
		var query = Posts.find().sort({ time: -1});
		var post_list = [];

		var promise = query.exec();

		promise.then(function (posts){
			posts.forEach(function(post){
				post_list.push({
					_id: post._id,
					user: post.user,
					title: post.title,
					content: post.content,
					time: post.time,
				})
			});
			io.emit('RECEIVE_POST', (post_list));		
		}).catch((err) => {console.log(err)});
	});

	socket.on('GET_POST_BY_ID', (id) => {
		
		var query = Posts.findOne({_id: id});
		var thePost = null;

		var promise = query.exec();

		promise.then(function (post){
			thePost = {
				_id: post._id,
		   		user: post.user,
		   		title: post.title,
				content: post.content,
				time: post.time,
			};
			io.emit('RECEIVE_POST_BY_ID', (thePost))
		}).catch((err) => {console.log(err)});
	});
});
*/


