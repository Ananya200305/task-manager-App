const { createTask, fetchAllTask, updateTaskbyID, deleteTaskbyID } = require("../controllers/taskController")

const router = require("express").Router()


// to get all the task
router.get('/', fetchAllTask)

// to create a task 
router.post('/', createTask)

// to update a task 
router.put('/:id', updateTaskbyID)

// to create a task 
router.delete('/:id', deleteTaskbyID)

module.exports = router