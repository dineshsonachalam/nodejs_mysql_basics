

var express = require('express');
var bodyparser = require('body-parser');
var connection = require('./connection');
var routes = require('./routes');

var app = express();
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

connection.init();
routes.configure(app);


var myLogger = function (req, res, next) {
  console.log('LOGGED')
  next()
}

app.use(myLogger)

app.get('/', function (req, res) {
  res.send('Dianesis Corporation!');

})
// now to implement for elo algo page
/*
var elo = function (req, res, next) {
  console.log('ELO - ALGORITHM');

  this.get = function(res) {

    connection.acquire(function(err, con) {

     con.query('select * from battles', function(err, result) {
       if(!err)
       {
         console.log("I'm awesome");
        // var x = con.query('SELECT * FROM `battles` WHERE battle_number=1');
         console.log("X:"+result[0].name);
       }

        con.release();

        res.send(result);

      });


    });

  };

  next()
}

app.use(elo)

app.get('/elo', function (req, res) {

  var simpleObject = {};
     for (var prop in res ){
         if (!res.hasOwnProperty(prop)){
             continue;
         }
         if (typeof(res[prop]) == 'object'){
             continue;
         }
         if (typeof(res[prop]) == 'function'){
             continue;
         }
         simpleObject[prop] = res[prop];
     }
     return JSON.stringify(simpleObject); // returns cleaned up JSON



//  res.send(JSON.stringify(simpleObject));

})


*/

var server = app.listen(8000, function() {
  console.log('Server listening on port ' + server.address().port);
});
