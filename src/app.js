const express = require("express");
const app = express();
const Restaurant = require("../models/index")
const db = require("../db/connection");

app.use(express.json());
app.use(express.urlencoded());
//TODO: Create your GET Request Route Below: 

app.get("/restaurants", async (req,res) => {
    const rest = await Restaurant.findAll({});
    res.json(rest);
})

app.get("/restaurants/:id", async (req,res) => {
    const oneRest = await Restaurant.findByPk(req.params.id);
    res.json(oneRest);
});

app.post("/restaurants", async (req,res) => {
    try {
        const {name, location, cuisine, } = req.body;

        // creating new restaurant instance 
        const newRestaurant = new Restaurant ({
            name,
            location,
            cuisine,
        });

        // save restaurant to the database 
        await newRestaurant.save();

        //sucess response
        res.status(201).json({ message: "Restaurant created successfylly" , restaurant: newRestaurant})
    } catch (error) {
        // error response
        res.status(500).json({ error: "Internal server error" });
    }
});

app.put("/restaurants/:id", async (req,res) => {
    const updateRest = await Restaurant.update(req.body, {where: {id: req.params.id}}
        res.json(updatedRest));
});

app.delete("/restaurants/:id", async (req,res) => {
    const deletedRest = await Restaurant.destory({where: { id:req.params.id}});
    res.json(deletedRest);
});

module.exports = app;