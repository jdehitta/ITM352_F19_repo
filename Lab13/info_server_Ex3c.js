var express = require('express');
var myParser = require("body-parser");
var fs = require('fs');
var data = require('./public/product_data.js');
var products = data.products;


var app = express();
app.all('*', function (request, response, next) {
    console.log(request.method + ' to ' + request.path);
   next();
});

app.use(myParser.urlencoded({ extended: true }));
app.post("/process_form", function (request, response) {
   let POST = request.body;
   let model = products[0]['model'];
   let model_price = products[0]['price'];
   if (typeof POST['quantity_textbox'] != 'undefined') {
      displayPurchase(POST, response)
   }
});

//document not defined it says
document.write(`<h3>${products[0]["model"]} at \$${products[0]["price"]}</h3>`);

app.use(express.static('./public'));
app.listen(8080, () => console.log(`listening on port 8080`));

function isNonNegInt(q, returnErrors = false) {
   errors = []; // assume no errors at first
   if (Number(q) != q) errors.push('Not a number!'); // Check if string is a number value
   if (q < 0) errors.push('Negative value!'); // Check if it is non-negative
   if (parseInt(q) != q) errors.push('Not an integer!'); // Check that it is an integer
   return returnErrors ? errors : (errors.length == 0);
}

function displayPurchase(POST, response) {
   q = POST['quantity_textbox'];
   if (typeof POST['quantity_textbox'] != 'undefined') {
      let q = POST['quantity_textbox'];
      if (isNonNegInt(q)) {
          var contents = fs.readFileSync('./views/display_quantity_template.view', 'utf8');
          response.send(eval('`' + contents + '`')); // render template string
      } else {
          response.send(`${q} is not a quantity!`);
      }
  }
}