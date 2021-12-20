import NodeControls from "../helpers/NodeControls"
import { FaPause,FaTrash, FaPlay } from 'react-icons/fa';
import Button from "./Button"
import {setView} from '../store/actions'

import { useSelector,useDispatch } from "react-redux";


const NodeControlButtons = ({ dockerIds, status }) => {
    const [isExecutingStart, runStart] = NodeControls.useExec()
    const [isExecutingStop, runStop] = NodeControls.useExec()
    const [isExecutingRemove, runRemove] = NodeControls.useExec()
    const accessToken = useSelector(state => state.reducer.accessToken);

    const dispatch = useDispatch()


    const handleStart = () =>{
        dockerIds.map(id => runStart(NodeControls.start, {id:id,accessToken:accessToken}))
    }
    const handleStop = () =>{
        dockerIds.map(id => runStop(NodeControls.stop, {id:id,accessToken:accessToken}))
    }

    const handleRemove = () =>{
        dockerIds.map(id => runRemove(NodeControls.remove, {id,accessToken:accessToken}))
        dispatch(setView('NODE_LIST'))
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
        <Button
            onClick={handleRemove}
            isExecuting={isExecutingRemove}
        >  <FaTrash />
        </Button>
    </div>

    )
}

NodeControlButtons.defaultProps={
    status : 'AlwaysActive'
}


export default NodeControlButtons;