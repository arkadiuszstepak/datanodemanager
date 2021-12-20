import { useState } from 'react'

const useNodesList = () => {
    const [data, setData] = useState([]);

    const getNodesList = async () => {
        try {

            const response = await fetch("/nodeslist", {
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
    const response = await fetch(`/stop`, {
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
    const response = await fetch(`/start`, {
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
    const response = await fetch(`/remove`, {
        method: "POST",
        body: JSON.stringify({ id: args.id,accessToken: args.accessToken  }),
        headers: {
            "Content-Type": "application/json",
        }
    })
    return response
}

const stats = async (args) => {
    const response = await fetch(`/stats`, {
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
    const response = await fetch(`/login`, {
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
    const response = await fetch(`/changePassword`, {
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
    const response = await fetch(`/newNode`, {
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