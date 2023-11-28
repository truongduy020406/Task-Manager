const express = require('express');
const app = express();

const {mongoose} = require('./db/mongoose')

const bodyParser = require('body-parser')

//Load in the mongoose models
const {List , Task} = require('./db/models');

//load middleware
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
/* router handlers*/


/* list router*/
/* 
GET /lists
purpose : Get all lists
*/
app.get('/lists',(req,res)=>{
    // we want to tra ve 1 maang cua 
    List.find().then((Lists)=>{
        res.send(Lists)
    }).catch((e) => {
        res.send(e);
    })
})

/* 
Posst /lists
purpose : create 1 lists
*/
app.post('/lists', (req, res) => {
    // We want to create a new list and return the new list document back to the user (which includes the id)
    // The list information (fields) will be passed in via the JSON request body
    let title = req.body.title;
    let newList = new List({
        title
 
    });
    
    newList.save().then((listDoc) => {
        // The full list document is returned (including id)
        res.send(listDoc);
    })
    .catch((error) => {
        console.error("Error while saving list:", error);
        res.status(500).send("Internal Server Error");
    });
});



//update 1 
app.patch('/lists/:id', (req,res)=>{    
    List.findOneAndUpdate({ _id: req.params.id}, {
        $set: req.body
    }).then(() => {
        res.send({ 'message': 'updated successfully'});
    });

})


app.delete('/lists/:id', (req,res)=>{
    List.findByIdAndDelete({
        _id: req.params.id,
    }).then((removedListDoc) => {
        res.send(removedListDoc);
    })
})

app.get('/lists/:listId/tasks', (req,res) => {
    Task.find({
        _listId: req.params.listId
    }).then((tasks) =>{
        res.send(tasks)
    })
})

app.get('/lists/:listId/tasks/:taskId', (req,res) => {
    Task.findOne({
        _id: req.params.taskId,
        _listId: req.params.listId
    }).then((task)=>{
        res.send(task)
    })
})



app.post('/lists/:listId/tasks', (req,res) => {
    let newTask = new Task({
        title: req.body.title,
        _listId: req.params.listId
    });

    newTask.save().then((newTaskDoc)=>{
        res.send(newTaskDoc);
    })
})


app.patch('/lists/:listId/tasks/:taskId', (req,res) => {
    Task.findByIdAndUpdate(
    {
        _id :req.params.taskId,
        _listId: req.params.listId
    },{
        $set: req.body
    }).then(()=>{
        res.sendStatus(200);
    })
})

app.delete('/lists/:listId/tasks/:taskId', (req,res) => {
    Task.findOneAndDelete(
    {
        _id :req.params.taskId,
        _listId: req.params.listId
    }).then((removedTaskDoc)=>{
        res.send(removedTaskDoc);
    })
})



app.listen(3000 , () =>{
    console.log("server is listening on port 3000")
})