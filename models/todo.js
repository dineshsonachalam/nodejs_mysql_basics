//var connection = require('../connection');
global.SynJS = global.SynJS || require('synjs');
var mysql      = require('mysql');
var connection = mysql.createConnection({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'todo'
});
var myFunction1=function( mysql, connection ) {



    connection.connect(function(err) {
        SynJS.resume(_synjsContext); //This function is used in callback in order to continue next statement after SynJS.wait()
    });
    SynJS.wait(); //used to pass the execution of flow



    var result;
    var query_length;
    connection.query('select * from no', function(err, res) {
        result = res;
        console.log(res);
        query_length = res;
        //req.send(res);
        SynJS.resume(_synjsContext); // used in callback in order to continue execution from next statements





    });
    SynJS.wait();

/*
    for(var key4 in query_length)
  {
      //get from values
      var number_value=query_length[key4].number;
      var post = {

         num : number_value
     };
     connection.query('INSERT INTO tester SET ?', post, function(err, res3) {


       console.log("Value inserted = "+number_value);
       // Neat!
         SynJS.resume(_synjsContext); // used in callback in order to continue execution from next statements
     });
    SynJS.wait();

  }
  console.log("\n");

*/



    for(var key in result)
    {
        var no = result[key].number;
        console.log(no);
        var result2=null;
        connection.query('select * from alphabets', function(err, res2) {
            result2 = res2;
            SynJS.resume(_synjsContext);

        });
        SynJS.wait();


        for(var key in result2)
        {
            var alph = result2[key].alphabets;
            console.log(no+"."+alph);

            //Inserting values into the tester table


            var post = {

               num : no,
               alpha: alph
           };

           connection.query('INSERT INTO tester SET ?', post, function(err, res3)
           {

             console.log("Value inserted ="+no);
             // Neat!
        //    SynJS.resume(_synjsContext); // used in callback in order to continue execution from next statements
           });
        //  SynJS.wait();
        }
        console.log('\n');

      }

};

SynJS.run(myFunction1,null, mysql, connection, function (ret) { //function calling done here
    console.log('done');

});
//   module.exports = new Todo();
