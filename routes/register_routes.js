module.exports = function(app, sql, con, bcrypt){
    var saltRounds = 10;

    app.post('/register', function(req, res){
        var role = req.body.role;
        var fname = req.body.fname;
        var lname = req.body.lname;
        var email = req.body.email;
        var pword = req.body.password;

        bcrypt.hash(pword, saltRounds, function(err, hash){
            if(role === 'tutor'){
                var sql = "insert into Tutor(FirstName, LastName, email, pword) values('"+fname+"', '"+lname+"', '"+email+"', '"+hash+"')";
             
            } 
            else if(role === 'student'){    
                var sql = "insert into Student(Name, email, pword) values('"+fname+" "+lname+"', '"+email+"', '"+hash+"')";
            }
    
            var sql2 = "select * from tutor, student where tutor.email='"+email+"' or student.email='"+email+"'";
            con.query(sql2, function(err, result){
                console.log(result.length);
                if(err) throw err;
                else if(result.length > 0){
                    res.send({
                        success: false,
                        msg: "Exists"
                    });
                }
                else{
                    con.query(sql, function(err, result){
                        if(err){
                            res.send({
                                success: false,
                                msg: "Failed"
                            });
                        }
                        else{
                            res.send({
                                success: true,
                                msg: "Success"
                            });
                        }
                    });
                    
    
                }
            });
        });
    });
}




