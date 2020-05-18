//require third party modules
const mysql=require('mysql');
const express=require('express');
const app=express();
const bodyParser=require('body-parser');

//connect with database
const connection=mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password2615!',
    database: 'etalk'
});

app.use(bodyParser.json());
app.use(express.static('../client/build'));

const {
    signup,
    login
    } =require('./handlers/users');

const {
    getPosts,
    createPost,
    deletePost,
    handleLikes,
    likedBy
} =require('./handlers/posts');

app.get('/', (req, res)=>{
    res.sendFile('../client/build/index.html');
});

//server response to user entry
app.post('/signup', signup(connection));
app.post('/login', login(connection));

//server response to user posts
app.post('/getposts', getPosts(connection));
app.post('/createpost', createPost(connection));
app.post('/deletepost', deletePost(connection));

//handle likes
app.post('/handlelikes', handleLikes(connection));
app.post('/likedby', likedBy(connection));

app.listen(3000);