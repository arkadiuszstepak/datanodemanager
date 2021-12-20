import HashLoader from "react-spinners/HashLoader";

const Button = (props) => {

    const handleClick= (e) =>{
        e.preventDefault()
        props.onClick()
    }
    
    if (props.isExecuting) {
        return(
        <div className="flex justify-center items-center p-2 m-1 text-gray-400 border border-gray-200 cursor-pointer hover:text-gray-800">
            <HashLoader color="#ababab" size={15} loading={props.isExecuting} />
        </div>)
    }
    else {
        return(
        <button onClick={handleClick} disabled={props.disabled} className="flex justify-center items-center p-2 m-1 text-gray-400 border border-gray-200 cursor-pointer disabled:text-gray-200 disabled:cursor-not-allowed hover:text-gray-800">
            <div>
                {props.children}
            </div>
        </button>)

    }

}

Button.defaultProps = {
    isExecuting: false,
    disabled : false
}

export default Button;