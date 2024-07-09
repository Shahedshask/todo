const mongoose=require("mongoose")
const bodyParser=require("body-parser")
const express=require("express")
const channelModel=require("./model/channel");
const app=express();
const port=5600

const dburl="mongodb+srv://munna:Shahid@munna.t13n7nm.mongodb.net/?retryWrites=true&w=majority&appName=munna"

app.set("view engine","ejs")
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json())
app.use(bodyParser.json())




mongoose
.connect(dburl)
.then(()=>{
    console.log("Connected sucessfully")
})
.catch(()=>{
    console.log("Error occured while connecting")
})


app.listen(port,()=>{
    console.log(`listening at a port ${port}`);
})

app.get('/',(req,res)=>{
    channelModel.find()
    .then(result=>{
        res.render("index",data=result)
    })
    
})


app.post('/',(req,res)=>{
    var ChannelModel=new channelModel()
    ChannelModel.todo=req.body.Todo;
    ChannelModel.save();
    res.redirect('/')
})

app.get('/delete/:id',(req,res)=>{
    channelModel.findByIdAndDelete(req.params.id)
    .then(()=>{
        res.redirect('/')
    })
    .catch((err)=>{
        res.send(err)
    })
})

app.get('/update/:id',(req,res)=>{
    channelModel.findById(req.params.id)
    .then(result=>
    {
        res.render("update",data=result)
    }) 
    .catch(err=>{
        res.send(err)
    })
})

app.post('/update/todo/:id',(req,res)=>{
    const a=req.body.todo
    channelModel.findByIdAndUpdate(req.params.id,{todo:a})
    .then(()=>{
        res.redirect('/')
    })
    .catch((err)=>{
        res.send(err)
    })
})