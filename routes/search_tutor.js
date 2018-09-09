module.exports = function (app, mysql, con, jwt, bcrypt) {

    app.post('/search_tutor', function (req, res) {
        
        var sql = "select * from tutor";

        con.query(sql, function (err, result) {
            if (err) throw err;
            else if (result.length == 0) {
                res.send({
                    msg: 'No tutors',
                    has: true
                });
            }
            else {
                res.send({
                    result: result,
                })
            }
        });

    });

}