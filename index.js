var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    PORT = process.env.PORT || 3000;

var todoRoutes = require('./routes/todos.js');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.sendFile('index.html')
});

app.use('/api/todos', todoRoutes);

app.listen(PORT, function() {
  console.log("Server started at localhost:3000");
});
