import NodeControls from "../helpers/NodeControls"
import { FaPause, FaTrash, FaPlay } from 'react-icons/fa';
import Button from "./Button"

import { useSelector } from "react-redux";


const NodeControlButtons = ({ dockerIds, status }) => {
    const [isExecutingStart, runStart] = NodeControls.useExec()
    const [isExecutingStop, runStop] = NodeControls.useExec()
    const accessToken = useSelector(state => state.reducer.accessToken);


    const handleStart = () =>{
        dockerIds.map(id => runStart(NodeControls.start, {id,accessToken}))
    }
    const handleStop = () =>{
        dockerIds.map(id => runStop(NodeControls.stop, {id,accessToken}))
    }

    return (<div className="flex">
        <Button 
            onClick={handleStop} 
            isExecuting={isExecutingStop}
            disabled={status==='exited'}
        > <FaPause />
        </Button>
        <Button
            onClick={handleStart}
            isExecuting={isExecutingStart}
            disabled={status==='running'}
        >  <FaPlay />
        </Button>
    </div>

    )
}

NodeControlButtons.defaultProps={
    status : 'AlwaysActive'
}


export default NodeControlButtons;