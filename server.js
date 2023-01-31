let express = require("express");
let mongodb = require("mongodb");
let app = express();

app.use(express.static("public"))
const MongoClient = mongodb.MongoClient;

let dbString = "mongodb+srv://josephraja:9345405211@cluster0.tejeago.mongodb.net/js-app?retryWrites=true&w=majority";
// let dbString = 'mongodb://josephraja:<password>@ac-dxlrkyp-shard-00-00.tejeago.mongodb.net:27017,ac-dxlrkyp-shard-00-01.tejeago.mongodb.net:27017,ac-dxlrkyp-shard-00-02.tejeago.mongodb.net:27017/?ssl=true&replicaSet=atlas-i8a8u0-shard-0&authSource=admin&retryWrites=true&w=majority';

let dbname = "js-app";
MongoClient.connect(dbString, {useNewUrlParser: true, useUnifiedTopology: true },
  function (err,client) {
    if (err) {
      throw err;
    }

    db = client.db(dbname);
    app.listen(3000);
  }
);
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

// how to create password in locking system in our app 

 function passProcted(req,res,next) {
  res.set('www-Authenticate', 'Basic realm = "simple App"')
  if (req.headers.authorization == 'Basic cmFqYToxMjM=') {
    next()
  }else{
    res.status(401).send('please give me id password')
  }
 }

app.use(passProcted)

app.get("/",function (req, res) {
  db.collection('items').find().toArray(function (err,items) {
    // console.log(items);
    res.send(
      `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Simple To-Do App list</title>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
    </head>
    <body>
      <div class="container">
        <h1 class="display-6 text-center py-1">To do App list</h1>
        <div class="jumbotron p-3 shadow-sm">
          <form action="/create-item" method="POST">
            <div class="d-flex align-items-center">
              <input name="item" autofocus autocomplete="off" class="form-control mr-3" type="text" style="flex: 1;">
              <button class="btn btn-primary">Add New Items</button>
            </div>
          </form>
        </div>
        <ul class="list-group pb-5">
        ${items.map(function(item){
         return `<li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
            <span class="item-text">${item.text}</span>
            <div>
              <button data-id=${item._id} class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
              <button  data-id=${item._id} class="delete-me btn btn-danger btn-sm">Delete</button>
            </div>
          </li>`
        }).join('')}
        </ul>
      </div>

      <script src="https://unpkg.com/axios@1.1.2/dist/axios.min.js"></script>
      <script src="/browser.js"></script>
    </body>
    </html>
    ` )
 })
});
app.post("/create-item", function (req, res) {
  console.log(req.body.item);

// db.collection('items').insertOne ({text:req.body.item},function(){
db.collection('items').insertOne({text:req.body.item},function() {
  res.redirect("/")
 });
  // console.log("hai");
});
app.post ("/update-item",function(req,res){
  db.collection('items').findOneAndUpdate({_id: new mongodb.ObjectId(req.body.id)},{$set:{text:req.body.text}},function(){
res.send("date is updated")
  })
})
app.post ("/delete-item",function(req,res){
  db.collection('items').deleteOne({_id: new mongodb.ObjectId(req.body.id)},function(){
res.send("date is deleted")
  })
})
