//get posts
exports.getPosts=(connection) => (req, res)=>{
    connection.query('SELECT * FROM posts ORDER BY date DESC', (err, rows)=>{
        if(err){
            console.log(err);
        }

        rows.forEach(row=>{
            row.date=row.date.toLocaleString();
        });

        res.json(rows);
    });
};

//create a post
exports.createPost = (connection) => (req, res)=>{
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
};

//delete post
exports.deletePost = (connection) => (req, res)=>{
    connection.query('DELETE FROM posts WHERE id =?', req.body.id, (err)=>{
        if(err){
            console.log(err);
        }

        res.json({msg: "Post deleted"});
    });
};

//handle likes
exports.handleLikes = (connection) => (req, res)=>{
    
    //loading the total number of likes for a post, and checking if a user liked a post or not
    if(req.body.action==='total'){
        connection.query('SELECT * FROM likes WHERE postId =?', req.body.postId, (err, rows)=>{
            if(err){
                console.log(err);
            }

            const total=rows.length;

            connection.query('SELECT * FROM likes WHERE postId = ? AND email = ?', [req.body.postId, req.body.userEmail] , (err)=>{
                if(err){
                    console.log(err);
                }
                
                res.json({
                    total: total,
                    userLiked: total!==0
                });
            });
        });
    }

    //liking a post
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

    //unliking a post
    else if(req.body.action==='unlike'){
        connection.query('DELETE FROM likes WHERE postId = ? AND email = ?', [req.body.postId, req.body.userEmail], (err)=>{
            if(err){
                console.log(err);
            }
    
            res.json({msg: "post unliked"});
        });
    }
};

//get a list of people who liked a post
exports.likedBy= (connection)=> (req, res)=>{
    connection.query('SELECT * FROM likes WHERE postId = ?', req.body.postId, (err, rows)=>{
        if(err){
            console.log(err);
        }
        
        res.json(rows);
    });
};