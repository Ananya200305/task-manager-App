const taskModel = require("../models/taskModel")

const createTask = async (req, res) => {
    const data = req.body
    try{
        const model = new taskModel(data)
        await model.save();
        res.status(201).json({message: "Task created successfully", success : true})
    }catch(err){
        res.status(500).json({message: "Failed to create task", success : false})
    }
}

const fetchAllTask = async (req, res) => {
    try{
        const data = await taskModel.find({});
        res.status(201).json({message: "All task", success : true, data})
    }catch(err){
        res.status(500).json({message: "Failed to fetch task", success : false})
    }
}

const updateTaskbyID = async (req, res) => {
    const id = req.params.id
    const body = req.body
    const obj = {$set : {...body}}
    try{
        const data = await taskModel.findByIdAndUpdate(id, obj)
        res.status(200).json({message: "Task Updated", success : true, data})
    }catch(err){
        res.status(500).json({message: "Failed to update task", success : false})
    }
}

const deleteTaskbyID = async (req, res) => {
    const id = req.params.id
    try{
        const data = await taskModel.findByIdAndDelete(id)
        res.status(200).json({message: "Task Deleted", success : true, data})
    }catch(err){
        res.status(500).json({message: "Failed to delete task", success : false})
    }
}

module.exports = {createTask, fetchAllTask, updateTaskbyID, deleteTaskbyID}