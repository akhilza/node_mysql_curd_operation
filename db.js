const mysql = require("mysql2")

const db = mysql.createConnection({
    host: 'localhost',        
    user: 'root',            
    password: 'akhil@23',
    database: 'curdoperation'
  })

  db.connect((err)=>{
    if(err){
        console.error('Error connecting to MySQL:', err.message);
    } else {
        console.log('Connected to MySQL database');
    }
  })

  module.exports = db;