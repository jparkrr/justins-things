var express = require('express');
var app = express();

app.use('/things', express.static(__dirname + '/dist'));

var port = process.env.PORT || 3333;
app.listen(port);

console.log('Express listening on ' + port);
