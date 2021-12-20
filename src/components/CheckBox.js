import { useState } from "react";
import "./CheckBox.css"
const CheckBox = (props) => {
    const [checked, setChecked] = useState(false)
    const handleClick = () => {
        setChecked(!checked)
        props.onChange(!checked)
    }
    const onChange = (val) => props.onChange(val)
    return (
        <div className="w-5 h-5 border cursor-pointer"
            onClick={handleClick}
        >
            <input type="checkbox" onChange={onChange} checked={checked} />
            <span></span>
        </div>
    )
}

export default CheckBox;



