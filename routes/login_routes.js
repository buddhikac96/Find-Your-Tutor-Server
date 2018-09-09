module.exports = function (app, mysql, con, jwt, bcrypt) {

    app.post('/login', function (req, res) {
        var email = req.body.username;
        var pword = req.body.password;
        var role = req.body.role;

        if (role === 'tutor') {
            var sql = "select * from tutor where email='" + email + "'";
            var sql2 = "select pword from tutor where email = '" + email + "'";
        }
        if (role === 'student') {
            var sql = "select * from student where email='" + email + "'";
            var sql2 = "select pword from student where email = '" + email + "'";
        }
        con.query(sql, function (err, result) {
            if (err) throw err;
            else if (result.length == 0) {
                res.send({
                    msg: 'Email does not exist',
                    has: true
                });
            }
            else {
                con.query(sql2, function (err, result) {
                    if (err) throw err;
                    else {
                        console.log(result);
                        var pass = result[0].pword;
                        bcrypt.compare(pword, pass, function (err, response) {
                            if (err) throw err;
                            else {
                                if (response) {
                                    const user = {
                                        email: email,
                                        role: role
                                    };
                                    const token = jwt.sign({ user }, 'secret_key');
                                    res.send({
                                        token:token
                                    });
                                }
                                else {
                                    res.send({
                                       token:null                    
                                    })
                                }
                            }
                        });
                    }
                });
            }
        });
    });

    app.post('/adminLogin', (req, res)=>{
        if(req.body.username == "buddhika" && req.body.password == "11111111"){
            let user = {
                username: "admin-buddhika",
                admin: true
            }
            const token = jwt.sign({ user }, 'secret_key');
            res.send({
                token: token
            })
        }else{
            res.send({
                token:null
            })
        }
    })

}