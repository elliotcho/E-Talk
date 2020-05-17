//require modules
const mysql=require('mysql');
const express=require('express');
const app=express();
const bodyParser=require('body-parser');

//create sql connection
const connection=mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password2615!',
    database: 'etalk'
});

app.use(bodyParser.json());
app.use(express.static('../client/build'));

app.get('/', (req, res)=>{
    res.sendFile('../client/build/index.html');
});

//handle registration
app.post('/signup', (req, res)=>{
    const newUser={
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    }

    let flag=1;

    connection.query('SELECT * FROM users WHERE email = ?', req.body.email, (err, rows)=>{
        if(err){
            console.log(err);
        }

        if(rows.length>0){
            flag=0;
            res.json({msg: 'email taken'});
        }

        if(flag===1 && req.body.password === req.body.confirmPassword){
            connection.query('INSERT INTO users SET ?', newUser, (err)=>{
                if(err){
                    console.log(err);
                }
        
                newUser.msg='success';
            
                res.json(newUser);
            });
        }
        
        else if(flag===1){
            res.json({msg: 'pwd mismatch'});
        }
    }); 
});

//handle login
app.post('/login', (req, res)=>{
    connection.query('SELECT * FROM users WHERE email = ?', req.body.email, (err, rows)=>{
        if(err){
            console.log(err);
        }

        const user= rows.length == 0? null: rows[0];

        if(user.email===req.body.email && user.password==req.body.password){
            res.json({
                msg: 'success',
                email: user.email,
                password: user.password,
                firstName: user.firstName,
                lastName: user.lastName
            });
        }

        else{
            res.json({msg: 'failure'});
        }
    });
});

//handle user creating a post
app.post('/createpost', (req, res)=>{
    const newPost={
        email: req.body.email,
        firstName: req.body.firstName,
        lastName:req.body.lastName,
        date: new Date().toISOString().slice(0, 19).replace('T', ' '),
        content: req.body.content
    }

    connection.query('INSERT INTO posts SET ?', newPost, (err)=>{
        if(err){
            console.log(err);
        }

        res.send('post added');
    });
});

//get posts
app.post('/getposts', (req, res)=>{
    connection.query('SELECT * FROM posts ORDER BY date DESC', (err, rows)=>{
        if(err){
            console.log(err);
        }

        rows.forEach(row=>{
            row.date=row.date.toLocaleString();
        });

        res.json(rows);
    });
});

//delete post
app.post('/deletepost', (req, res)=>{
    connection.query('DELETE FROM posts WHERE id =?', req.body.id, (err)=>{
        if(err){
            console.log(err);
        }

        res.json({msg: "Post deleted"});
    });
});

//handle likes
app.post('/handlelikes', (req, res)=>{
    if(req.body.action==='total'){
        connection.query('SELECT * FROM likes WHERE postId =?', req.body.postId, (err, rows)=>{
            if(err){
                console.log(err);
            }

            const total=rows.length;

            connection.query('SELECT * FROM likes WHERE postId = ? AND email = ?', [req.body.postId, req.body.userEmail] , (err, rows)=>{
                if(err){
                    console.log(err);
                }
                
                res.json({
                    total: total,
                    userLiked: rows.length!==0
                });
            });
        });
    }

    else if(req.body.action==='like'){
        connection.query('SELECT * FROM users WHERE email =?' ,req.body.userEmail, (err, rows)=>{
            if(err){
                console.log(err);
            }

            const newLike={
                postId: req.body.postId,
                email: req.body.userEmail,
                firstName: rows[0].firstName,
                lastName: rows[0].lastName
            }
    
            connection.query('INSERT INTO likes SET ?', newLike, (err)=>{
                if(err){
                    console.log(err);
                }
    
                res.json({msg: 'post liked'});
            });
        });
    }

    else if(req.body.action==='unlike'){
        connection.query('DELETE FROM likes WHERE postId = ? AND email = ?', [req.body.postId, req.body.userEmail], (err)=>{
            if(err){
                console.log(err);
            }
    
            res.json({msg: "post unliked"});
        });
    }
});

app.listen(3000);





