import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast';

const useServerConnection = () => {
    const [serverConnection,setServerConnection] = useState(false);
    const [maxTry,setMaxTry] = useState(false);
    const retryCount = useRef(0);
    const maxRetryCount = 4;

    const connectServer = ()=>{
        
        axios.get("https://reviewer-bqf8.onrender.com/connection")
        .then((res)=>{
            console.log(res);
            setServerConnection(true);
        })
        .catch((err)=>{
            console.error("connection error",err);
            console.log(retryCount)
            if(retryCount.current < maxRetryCount){
                const delay = Math.pow(2,retryCount.current)* 1000;
                retryCount.current += 1;
                console.log("i am here")
                setTimeout(()=>{
                    connectServer();
                },delay)
            } else {
                setMaxTry(true);
            toast.error("Max retry attempts reached. Please try again later");
            }
        })
    }

    useEffect(()=>{
        toast.loading("Connecting to Server. Please wait");
        connectServer();
    },[])
    
    return {serverConnection,maxTry};
}

export default useServerConnection;
