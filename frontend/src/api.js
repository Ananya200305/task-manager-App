import { API_URL } from "./utils"

export const createTask = async (taskObj) => {
    const url = `${API_URL}/tasks`
    const options = {
        method : 'POST',
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(taskObj)
    }
    try {
        const res = await fetch(url, options)
        const data = await res.json()
        return data
    } catch (error) {
        return error
    }
}

export const getAllTask = async () => {
    const url = `${API_URL}/tasks`
    const options = {
        method : 'GET',
        headers : {
            "Content-Type" : "application/json"
        }
    }
    try {
        const res = await fetch(url, options)
        const data = await res.json()
        return data
    } catch (error) {
        return error
    }
}

export const DeleteTaskById = async (id) => {
    const url = `${API_URL}/tasks/${id}`
    const options = {
        method : 'DELETE',
        headers : {
            "Content-Type" : "application/json"
        }
    }
    try {
        const res = await fetch(url, options)
        const data = await res.json()
        return data
    } catch (error) {
        return error
    }
}

export const updateTaskById = async (id, taskObj) => {
    const url = `${API_URL}/tasks/${id}`
    const options = {
        method : 'PUT',
        headers : {
            "Content-Type" : "application/json"
        }, body: JSON.stringify(taskObj)
    }
    try {
        const res = await fetch(url, options)
        const data = await res.json()
        return data
    } catch (error) {
        return error
    }
}