//require third party modules
const mysql=require('mysql');
const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const multer=require('multer');
const fs=require('fs');
const path=require('path');

//connect with database
const connection=mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password2615!',
    database: 'etalk'
});

//set up image storage
const storage=multer.diskStorage({
    destination: './images',
    filename: (req, file, cb) => {
        cb(null, 'IMAGE-' + Date.now()+ path.extname(file.originalname));
    }
});

const upload=multer({
    storage: storage,
    limits: {fileSize: 1000000}
}).single('image');

//set up body parser and static files
app.use(bodyParser.json());
app.use(express.static('../client/build'));

const {
    signup,
    login,
    handleProfilePic,
    handleBio
} =require('./handlers/users');

const {
    getPosts,
    getUserPosts,
    createPost,
    deletePost,
    handleLikes,
    likedBy,
    handleComments
} =require('./handlers/posts');

app.get('/', (req, res)=>{
    res.sendFile('../client/build/index.html');
});

//server response to user entry
app.post('/signup', signup(connection));
app.post('/login', login(connection));

//server response to user posts
app.post('/getposts', getPosts(connection));
app.post('/userposts', getUserPosts(connection));
app.post('/createpost', createPost(connection));
app.post('/deletepost', deletePost(connection));

//handle likes
app.post('/handlelikes', handleLikes(connection));
app.post('/likedby', likedBy(connection));

//handle comments
app.post('/comments', handleComments(connection));

//handle user profile pics
app.post('/profilepic', handleProfilePic(connection, fs, path, upload));

//handle user bio
app.post('/bio', handleBio(connection));

app.listen(3000);