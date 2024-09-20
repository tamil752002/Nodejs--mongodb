const Person = require('../model/personModel');

const createPerson = async (req, res) => {
    
    try {
        
        const { FName, LName, age } = req.body; 
        const newPerson = new Person({ FName, LName, age });
        await newPerson.save();
        res.status(201).json({
            message: "New Person Created Successfully"
        });
        
    } 
    catch (error) {
        
        res.status(500).json({ message: error.message });
        
    }
};

const getPerson = async (req, res) => {
    
    try {
        const Perso = await Person.find({ age: { $gt: 12 } })
        res.json(Perso);         
    } 
    catch (error) {
        
        res.status(500).json({ message: error.message });
        
    }
};

module.exports = {createPerson,getPerson}