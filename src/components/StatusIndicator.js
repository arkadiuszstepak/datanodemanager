const StatusIndicator = ({status}) =>{
    const color = () =>{
        if(status ==='running') return "bg-green-500"
        else if(status === 'exited') return "bg-yellow-500"
        else return "bg-red-500"
    }
    return(<div className={`mx-2 w-2 h-2 rounded-full ${color()}`}></div>)
}

export default StatusIndicator;