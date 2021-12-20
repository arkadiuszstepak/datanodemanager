import { MdWarning } from "react-icons/md";
import { useDispatch } from "react-redux"
import { showModal } from '../store/actions'


const DefaultPasswordNotification = () =>{
    const dispatch = useDispatch()
    return(
    <div className="fixed bottom-0 left-0 m-4 cursor-pointer"
    onClick={()=>dispatch(showModal('NEW_PASSWORD'))}
    >
  <div className="m-auto">
    <div className="p-3 bg-white rounded-lg border border-gray-300 shadow-lg">
      <div className="flex flex-row">
        <div className="px-2 text-lg text-red-500">
        <MdWarning/>
        </div>
        <div className="mr-6 ml-2 text-xs">
          <span >For security reason change your default password!</span>
          <span className="block text-xs text-gray-500">click here to change</span>
        </div>
      </div>
    </div>
  </div>
</div>
    )
}

export default DefaultPasswordNotification;