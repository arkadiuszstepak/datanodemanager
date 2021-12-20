
const Modal = (props) => {
    return (
        <div style={{backgroundColor:'rgba(20, 20, 20,   .7)'}} className="flex fixed justify-items-center w-full h-screen bg-black">
            <div className="m-auto w-1/2">
                {props.children}
            </div>
        </div>
    )
}

export default Modal;