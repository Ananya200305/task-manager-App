import React, { useEffect, useState } from 'react'
import { createTask, DeleteTaskById, getAllTask, updateTaskById } from './api'
import { ToastContainer } from 'react-toastify'
import { notify } from './utils'
import { FaPencilAlt } from "react-icons/fa";

function TaskManager() {
    const [input, setInput] = useState('')
    const [tasks, setTasks] = useState([])
    const [copyTask, setCopyTasks] = useState([])
    const [updateTask, setUpdateTask] = useState(null)

    const colors = [
  { from: "from-pink-100", to: "to-pink-50", border: "border-pink-200", text: "text-pink-600 hover:text-pink-700" },
  { from: "from-teal-100", to: "to-teal-50", border: "border-teal-200", text: "text-teal-600 hover:text-teal-700" },
  { from: "from-purple-100", to: "to-purple-50", border: "border-purple-200", text: "text-purple-600 hover:text-purple-700" },
  { from: "from-yellow-100", to: "to-yellow-50", border: "border-yellow-200", text: "text-yellow-600 hover:text-yellow-700" },
  { from: "from-indigo-100", to: "to-indigo-50", border: "border-indigo-200", text: "text-indigo-600 hover:text-indigo-700" },
];

    const handleTask = () => {
        if(updateTask && input){
            // update api call
            const obj = {
                _id: updateTask._id,
                taskName: input, 
                isDone: updateTask.isDone
            }
            handleUpdateItem(obj)
            console.log("update")
            setInput("")
            setUpdateTask(null)
        }else if(updateTask == null && input){
            // create api call
            console.log("create")
            handleAddTask()
        }
    }

    useEffect(() => {
        if(updateTask){
            setInput(updateTask.taskName)
        }
    }, [updateTask])

    const handleAddTask = async () => {
        const obj = {
            taskName : input,
            isDone : false
        }
        try {
            const {success, message} = await createTask(obj);
            if(success){
                //show success 
                notify(message, "success")
            }else{
                notify(message, "error")
            }
            fetchAllTask()
            setInput('')
        } catch (error) {
            console.log(error)
            notify("Failed to create Task", "error")
        }
    }

    const fetchAllTask = async () => {
        try {
            const {success, message, data} = await getAllTask();
            setTasks(data)
            setCopyTasks(data)
        } catch (error) {
            console.log(error)
            notify("Failed to fetch Task", "error")
        }
    }

    useEffect(() => {
        fetchAllTask()
    }, [])

    const handleDeleteTask = async (id) => {
        try {
            const {success, message} = await DeleteTaskById(id)
            if(success){
                notify(message, "success")
            }else{
                notify(message, "error")
            }
            fetchAllTask()
        } catch (error) {
            console.log(error)
            notify("Failed to Delete Task", "error")
        }
    }

    const handleCheck = async (items) => {
        const {_id, isDone, taskName} = items
        const obj = {
            taskName,
            isDone : !isDone
        }

        try {
            const {success, message}= await updateTaskById(_id, obj)
            if(success){
                notify(message, "success")
            }else{
                notify(message, "error")
            }
            fetchAllTask()
        } catch (error) {
            console.log(error)
            notify("Failed to update state", error)
        }
    }

    const handleUpdateItem = async (items) => {
        const {_id, isDone, taskName} = items
        const obj = {
            taskName,
            isDone : isDone
        }

        try {
            const {success, message}= await updateTaskById(_id, obj)
            if(success){
                notify(message, "success")
            }else{
                notify(message, "error")
            }
            fetchAllTask()
        } catch (error) {
            console.log(error)
            notify("Failed to update state", error)
        }
    }

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase()
        const oldTask = [...copyTask]
        const results = oldTask.filter((item) => item.taskName.toLowerCase().includes(term))
        setTasks(results)
    }




  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-teal-50 text-gray-800 p-6">
      <div className="w-full max-w-md">
        <h1 className="text-5xl font-semibold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-pink-500">
          Task Manager
        </h1>

        {/* Input and Search box */}
        <div className="space-y-4">
          {/* Add Task */}
          <div className="flex items-center bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden transition hover:shadow-md">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Add a new task..."
              className="flex-grow px-4 py-2 bg-transparent focus:outline-none placeholder-gray-400 text-sm"
            />
            <button className="px-4 py-2 bg-gradient-to-r from-teal-400 to-emerald-400 hover:opacity-90 transition text-white text-sm font-medium" onClick={handleTask}>
              Add
            </button>
          </div>

          {/* Search Task */}
          <div className="flex items-center bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden transition hover:shadow-md">
            <input
              type="text"
              placeholder="Search tasks..."
              onChange={handleSearch}
              className="flex-grow px-4 py-2 bg-transparent focus:outline-none placeholder-gray-400 text-sm"
            />
          </div>
        </div>

        {/* List of items */}
        <div className="mt-8 space-y-3">
          {/* Example Task */}
          {tasks.map((items, index) => {
            const color = colors[index % colors.length];
            return (
      <div
        key={items._id}
        className={`flex items-center justify-between bg-gradient-to-r ${color.from} ${color.to} ${color.border} rounded-xl px-4 py-3 shadow-sm hover:shadow-md transition cursor-pointer`}
      >
        <input type="checkbox" checked={items.isDone} onChange={() => handleCheck(items)}/>
        <span className={`text-sm ${items.isDone ? "line-through text-gray-500" : ""}`}>{items.taskName}</span>
        <button className="flex items-center px-3 py-2 rounded-lg" onClick={() => setUpdateTask(items)}>
  <FaPencilAlt className={` ml-32 ${color.text}`} />
</button>
        <button className={`text-xs ${color.text}`} onClick={() => handleDeleteTask(items._id)}>Delete</button>
      </div>
    );
          })}
        </div>

        {/* Toastify placeholder */}
        <ToastContainer
  position="top-right"
  autoClose={3000}
  hideProgressBar={false}
  closeOnClick
  pauseOnHover
  draggable
  theme="light"
  toastClassName={() =>
    "relative flex items-center justify-between p-4 mb-2 rounded-xl shadow-md bg-white border border-gray-200 text-gray-800 text-sm hover:shadow-lg transition"
  }
  bodyClassName={() =>
    "flex items-center gap-2 text-sm font-medium"
  }
  progressClassName="bg-gradient-to-r from-teal-400 to-emerald-400"
/>
      </div>
    </div>
  )
}

export default TaskManager
