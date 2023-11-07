let {people} = require("../data");

const getPeople = (req, res) => {
    res.status(200).json(people);
}

const searchById =(req, res) => {
    const {id} = req.params;
    const {name} =req.body;

    const person = people.find((person) => person.id === Number(id));

    if(!person){
        return res
            .status(404)
            .json({success: false, msg:`could not find person with id ${id}`})
    }

    return res.status(200).send(person);
}

const editEntryById =(req, res) => {
    const {id} = req.params;
    const {name} =req.body;

    const person = people.find((person) => person.id === Number(id));

    if(!person){
        return res
            .status(404)
            .json({success: false, msg:`could not find person with id ${id}`})
    }

    const newPeopleList = people.map((person)=>{
        if(person.id === Number(id)){
            person.name = name;
        }
        return person
    })
    res.status(200).json({success: true, data: newPeopleList})
}
const deleteEntryById =(req, res) => {
    const {id} = req.params;

    const person = people.find((person) => person.id === Number(id));

    if(!person){
        return res
            .status(404)
            .json({success: false, msg:`could not find person with id ${id}`})
    }

    const newPeopleList = people.filter((person) => person.id !== Number(id));

    people = newPeopleList

    res.status(200).json({success: true, data: people})
}

const addPerson = (req, res) => {
    const name = req.body.name
    if(name){
        people.push({
            id : people.length + 1, 
            name: name
        });
        return res.status(201).json({ success: true, name: req.body.name });
    }

    res.status(400).json({ success: false, message: "Please provide a name" });
}

module.exports = {searchById, getPeople, addPerson, editEntryById, deleteEntryById};