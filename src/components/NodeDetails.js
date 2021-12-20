import { useState, useEffect, useCallback } from "react"

import { FaArrowLeft } from "react-icons/fa";
import NodeLogs from "./NodeLogs";
import NodeInfo from "./NodeInfo";
import UsageStats from "./UsageStats";
import NodeControls from "../helpers/NodeControls"
import { useSelector,useDispatch } from 'react-redux'
import NodeWallet from "./NodeWallet";
import ProviderSelect from "./ProviderSelect";

import { setView } from '../store/actions'

const NodeDetails = () => {
    const [stats, setStats] = useState({})
    const [logs, setLogs] = useState([])

    const dispatch = useDispatch()
    const accessToken = useSelector(state => state.reducer.accessToken);
    const Node = useSelector(state => {
        const Nodes = state.reducer.nodes;
        const selectedNodeID = state.reducer.selectedNode;
      
        return Nodes.find(el => el.dockerId === selectedNodeID)
    });

    useEffect(() => {
        let eventSource = new EventSource(`/logs?id=${Node.dockerId}`)
        eventSource.onmessage = e => setLogs(data => [...data, e.data])
    }, [stats.status])

        useEffect(() => {
            const  timer = setInterval(()=> NodeControls.stats({id:Node.dockerId,accessToken:accessToken}).then((stats) => setStats(stats))
            ,1000)
            return () => {
                clearInterval(timer);
              };
           
        },[]);
     

           
    return (
        <div className="flex flex-col">
            <div className="text-gray-500 cursor-pointer hover:text-gray-700"
            onClick={() =>
                 dispatch(setView('NODE_LIST'))
                
                }
            ><FaArrowLeft/></div>
            <div className="flex h-1/2 sm:flex-col md:flex-col lg:flex-row xl:flex-row">
                <div className="m-4 w-full"><NodeInfo Node={Node} stats={stats} /></div>
                <div className="m-4 w-full h-full"><NodeLogs logs={logs} /></div>
                <div className="flex fixed top-0 right-0 flex-col items-center m-6 rounded-full">
                    <div className="px-2 text-xs italic text-gray-600">Provider</div>
<ProviderSelect/>
                </div>
            </div>
            <div className="w-full h-full">
                <UsageStats stats={stats} />
            </div>
            <div className="mt-4 w-full h-full">
                <NodeWallet privatekey={Node.privateKey} />
            </div>
        </div>
    )
}

export default NodeDetails;