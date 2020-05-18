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