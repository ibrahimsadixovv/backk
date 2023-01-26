const express = require ("express")
const app = express()
const cors= require("cors")
const mongoose = require("mongoose")

app.use(cors())
app.use(express.json())

const cards = new mongoose.Schema({
    title:  String,
    imgUrl: String,
    category: String,
    price: String,
})
const Cards = mongoose.model("cards", cards)

app.get("/", (req, res) => {
    Cards.find({}, (err, docs) => {
        if(!err){
            res.send(docs)
        } else{
            res.json("Send")
        }
    })
})

app.get("/:id", (req, res) => {
    Cards.findOne({}, (err, docs) => {
        if(!err){
            res.send(docs)
        } else{
            res.json("Send")
        }
    })
})

app.post("/", (req, res) => {
    const newCards = new Cards({

        title: req.body.title,
        imgUrl: req.body.imgUrl,
        category: req.body.category,
        price: req.body.price,
    
    })
    newCards.save()
    res.json(newCards)
})

app.delete("/:id", (req, res) => {
    const id = req.params.id
    Cards.findByIdAndDelete(id, (err, doc) => {
        if(err){
            res.status(404).json({message: "Not Found"})
        } else{
            res.send(doc)
        }
    })
})






  

app.listen(5000)
mongoose.connect("mongodb+srv://ibrahimsadikhov:110203is.@cluster0.cpcsxzc.mongodb.net/?retryWrites=true&w=majority")

