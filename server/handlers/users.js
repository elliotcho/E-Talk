//handle login
exports.login= (connection) => (req, res)=>{
    connection.query('SELECT * FROM users WHERE email = ?', req.body.email, (err, rows)=>{
        if(err){
            console.log(err);
        }

        const user= rows.length === 0? {}: rows[0];

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
};

//handle signup
exports.signup = (connection) => (req, res)=>{
    const newUser={
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    }

    connection.query('SELECT * FROM users WHERE email = ?', req.body.email, (err, rows)=>{
        if(err){
            console.log(err);
        }

        //check if email exists
        if(rows.length>0){
            res.json({msg: 'email taken'});
        }

        //check if passwords match
        else if(req.body.password === req.body.confirmPassword){
            connection.query('INSERT INTO users SET ?', newUser, (err)=>{
                if(err){
                    console.log(err);
                }
        
                newUser.msg='success';
            
                res.json(newUser);
            });
        }
        
        else{
            res.json({msg: 'pwd mismatch'});
        }
    }); 
};

exports.handleProfilePic = (connection, fs, path, upload)=> (req, res) => {
    if(req.body.action==='load'){
        connection.query('SELECT * FROM users WHERE email = ?', req.body.email, (err, rows)=>{
            if(err){
                console.log(err);
            }

            if(rows[0].profilePic===null){
                res.sendFile(path.join(__dirname, '../', `/images/default.jpg`));
            }

            else{
                res.sendFile(path.join(__dirname, '../', `images/${rows[0].profilePic}`));
            }
        });
    }

    else{
        upload(req, res, (err)=>{
            if(err){
                console.log(err);
            }

            connection.query('SELECT * FROM users WHERE email =?', req.body.email, (err, rows)=>{
                if(err){
                    console.log(err);
                }

                if(rows[0].profilePic!==null){
                    fs.unlink(path.join(__dirname, '../', `images/${rows[0].profilePic}`), (err)=>{
                        if(err){
                            console.log(err);
                        }
                    });
                }

                connection.query('UPDATE users SET profilePic= ? WHERE email =?', [req.file.filename, req.body.email], (err)=>{
                    if(err){
                        console.log(err);
                    }
        
                    res.json({msg: 'success'});
                });
            });
        });
    }
}

