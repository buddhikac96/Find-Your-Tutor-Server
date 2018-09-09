const express = require('express');
const bodyParser = require('body-parser');
const register = require('./routes/register_routes');
const login = require('./routes/login_routes');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

const port = 3000;

const mysql = require('mysql');
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Tutor_app'

});

con.connect(function (err) {
    if (err) throw err;
    else {
        console.log('Database Connected');
        require('./routes/register_routes.js')(app, mysql, con, bcrypt);
        require('./routes/login_routes.js')(app, mysql, con, jwt, bcrypt);
        app.listen(port, () => {
            console.log('Server running');
        });
    }

});
