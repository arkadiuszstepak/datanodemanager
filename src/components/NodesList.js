import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';


import TableItem from './TableItem';
import CheckBox from './CheckBox';

import { useNodesList } from '../helpers/helpers'
import { setNodes } from '../store/actions'
import { showModal } from '../store/actions'
import NodeControlButtons from './NodeControlButtons'





const NodesList = () => {

    const [nodes, getNodesList] = useNodesList(["sd"])
    const [selectedNodes, setSelectedNodes] = useState([])
    const dispatch = useDispatch();
    const Nodes = useSelector(state => state.reducer.nodes);
    const accessToken = useSelector(state => state.reducer.accessToken);

    useEffect(() => {
   
          setInterval(() => {
            getNodesList(accessToken)
            console.log('fire')
        }, 1000);


    },[]);

    useEffect(() => {
        dispatch(setNodes(nodes));
    }, [nodes]);


    return (
        <div className="flex flex-col">


            <div className="flex justify-between items-center px-10 mb-2 h-20 bg-white border-b rounded-lg-b">
                <div>
                    {selectedNodes.length > 0 && <NodeControlButtons dockerIds={selectedNodes} />}
                </div>

                <div className="flex items-center p-2 mb-2 h-10 text-sm font-semibold leading-6 text-blue-600 rounded-lg border border-blue-600 cursor-pointer"
                    onClick={() => dispatch(showModal("NEW_NODE"))}
                >
                    New node
                </div>
            </div>
            <div className="p-4 bg-white rounded-lg shadow">


                <table className="w-full table-auto">
                    <thead >
                        <tr className="pb-2 font-medium leading-6 text-gray-900">
                            <th></th>
                            <th>
                                Node Name
                            </th>
                            <th>Status</th>
                            <th>Host</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Nodes.map((node, id) =>
                            <TableItem
                                key={id}
                                onSelect={(value, dockerId) => {
                                    // if checked add to list otherwise remove from list
                                    if (value) setSelectedNodes(state => [...state, dockerId])
                                    else setSelectedNodes(state => state.filter(el => el !== dockerId))
                                }}
                                node={node}
                                id={id}
                            />)}
                    </tbody>
                </table>
                {selectedNodes}
            </div>
        </div>
    )
}


export default NodesList;