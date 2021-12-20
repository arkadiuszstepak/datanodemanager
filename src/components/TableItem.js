import StatusIndicator from "./StatusIndicator";
import CheckBox from './CheckBox';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { selectNode } from "../store/actions"

const TableItem = ({  node, onSelect }) => {
    const [selected, setSelected] = useState(false)
    const dispatch = useDispatch();

    const classSelected = (selected ? "bg-gray-50" : "bg-white")

    const handleClick = async(node) =>{
        dispatch(selectNode(node["dockerId"]));   
    }

    const handleChange = () =>{
        onSelect(!selected,node.dockerId)
        setSelected(!selected)  
    }

    return (
        <tr className={`h-12 text-sm ${classSelected}`}>
            <td><CheckBox onChange={handleChange} /></td>
            <td className="text-purple-600 hover:cursor-pointer"
                onClick={() => handleClick(node)}
            ><div className="flex flex-col items-center">
                    <div>{node.name} </div>
                    <div className="text-xs text-gray-600">{node.publicKey}</div>
                </div></td>
            <td className="flex justify-center items-center m-auto h-12 font-mon center">
                <StatusIndicator status={node.status} />
                <div>{node.status}</div>
            </td>
            <td className="font-mono">{node.provider}</td>
        </tr>)
}

export default TableItem;