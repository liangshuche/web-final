const express = require('express');
const socket = require('socket.io');
const mongoose = require('mongoose');
const app = express();

// require bady-parser for parsing from data
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: false
}))

mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://admin:a12345@ds159100.mlab.com:59100/web-blog');
mongoose.connect('mongodb://localhost/web_test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(callback) {
    console.log('connection open')
});

const postsSchema = mongoose.Schema({
	  user: String,
  	title: String,
	  content: String,
	  time: String,
});

const Posts = mongoose.model('Posts', postsSchema);
// test object
var TestPost = new Posts({
    user: "Kamehameha",
    title: "Havana",
    content: "Do it now Gohan!"
    time: '1997/08/31'
})

console.log(TestPost);

app.get('/', function(req, res){
    res.redirect('/todos')
})

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

//

const server = app.listen(5000, () => {
  	console.log('server is running on port 5000');
});
/*
const io = socket(server);

*/
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


