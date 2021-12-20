import { useState } from 'react'

const useNodesList = () => {
    const [data, setData] = useState([]);

    const getNodesList = async () => {
        try {

            const response = await fetch("http://127.0.0.1:8888/nodeslist", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            })

            const NodesList = await response.json();
            setData(NodesList)
        } catch (err) {
            console.log('Error while fetching nodes list', err);
        }
    }

    return [data, getNodesList]
}

const useExec = () => {
    const [isExecuting, setIsExecuting] = useState(false)

    const run = async (func, args) => {
        setIsExecuting(true)
        await func(args)
        setIsExecuting(false)
    }
    return [isExecuting, run]
}



const stop = async (args) => {
    const response = await fetch(`http://127.0.0.1:8888/stop`, {
        method: "POST",
        body: JSON.stringify({ id: args.id,accessToken: args.accessToken }),
        headers: {
            "Content-Type": "application/json",
        }
    })

    const res = await response.json();
    return res
}

const start = async (args) => {
    console.log('starting')
    const response = await fetch(`http://127.0.0.1:8888/start`, {
        method: "POST",
        body: JSON.stringify({ id: args.id ,accessToken: args.accessToken }),
        headers: {
            "Content-Type": "application/json",
        }
    })
    const res = await response.json();
    return res
}

const remove = async (args) => {
    const response = await fetch(`http://127.0.0.1:8888/remove`, {
        method: "POST",
        body: JSON.stringify({ id: args.id,accessToken: args.accessToken  }),
        headers: {
            "Content-Type": "application/json",
        }
    })
    return response
}

const stats = async (args) => {
    const response = await fetch(`http://127.0.0.1:8888/stats`, {
        method: "POST",
        body: JSON.stringify({ id: args.id,accessToken: args.accessToken  }),
        headers: {
            "Content-Type": "application/json",
        }
    })
    const stats = await response.json();
    return stats
}

const login = async (password) => {
    const response = await fetch(`http://127.0.0.1:8888/login`, {
        method: "POST",
        body: JSON.stringify({ password: password }),
        headers: {
            "Content-Type": "application/json",
        }
    })
    const res = await response.json();
    return res
}

const changePassword = async (args) => {
    const response = await fetch(`http://127.0.0.1:8888/changePassword`, {
        method: "POST",
        body: JSON.stringify({ password: args.passwordHash,accessToken: args.accessToken  }),
        headers: {
            "Content-Type": "application/json",
        }
    })
    const res = await response.json();
    return res
}


const newNode = async (args) => {
    const response = await fetch(`http://127.0.0.1:8888/newNode`, {
        method: "POST",
        body: JSON.stringify({ name: args.name,privateKey:args.privateKey,accessToken:args.accessToken }),
        headers: {
            "Content-Type": "application/json",
        }
    })
    const res = await response.json();
    return res
}





export default { start, stop, remove, stats, useExec,login,changePassword ,newNode}