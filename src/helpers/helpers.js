import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setNodes } from '../store/actions'


var randomWords = require('random-words');
var ethers = require('ethers');


const colorCodes = [
    "[32mINFO[39m",
    "[33mWARN[39m",
    "[36m",
    "[39m",
]
export const clearTextFromColorCodes = (text) =>{
    colorCodes.map((code)=> text = text.replace(code, '') )
    return text
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

export const randomName = () =>{
    const words =  randomWords({exactly:3 })
    return words.map(capitalize).join(' ');
}


export const fetchKey = async(accessToken) =>{
 
    let response = await fetch("/randomkey", {
        method: "POST",
        body: JSON.stringify({accessToken:accessToken}),
        headers: {
            "Content-Type": "application/json",
        }
    })
        response = await response.json()
    return response
}

export const validateKey = (key) =>{
    try {
         const tmp = new ethers.Wallet(key).address
         return true
    }
    catch (e) {
        return false
    }
}


export const getPublicKey = (privateKey) => {
    try {
        return  new ethers.Wallet(privateKey).address
    }
    catch (e) {
        return 'Invalid private key.'
    }
}



export const useNodesList = () =>{
    const [isloading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const getNodesList = async(accessToken)=>{
        setIsLoading(true)
        try {
        
        const response = await fetch("/nodeslist", {
            method: "POST",
            body : JSON.stringify({accessToken:accessToken}),
            headers: {
                "Content-Type": "application/json",
            }
        })
    
        const NodesList = await response.json();
        dispatch(setNodes(NodesList))
        setIsLoading(false)
    }catch (err) {
    console.log('Error while fetching nodes list', err);
    setIsLoading(false)
    }

    }

    return [isloading,getNodesList]


}


export const hash = async(string) => {
    const utf8 = new TextEncoder().encode(string);
    const hashBuffer = await crypto.subtle.digest('SHA-256', utf8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((bytes) => bytes.toString(16).padStart(2, '0'))
      .join('');
    return hashHex;
  }
  
