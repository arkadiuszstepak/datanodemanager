import NodeControls from "../../helpers/NodeControls"
import { hash } from '../../helpers/helpers'
import { useState } from 'react'
import { useDispatch,useSelector } from "react-redux"
import { setAccessToken,showModal } from '../../store/actions'

const NewPassword = () =>{

    const [password,setPassword] = useState('')
    const [passwordRepeat,setPasswordRepeat] = useState('')
    const accessToken = useSelector(store=>store.reducer.accessToken)
    const dispatch = useDispatch()

    const handleChangePassword = async() =>{
  
        if(password === passwordRepeat){
          
            const passwordHash = await hash(password);
            const msg = await NodeControls.changePassword({passwordHash:passwordHash,accessToken})
            if(msg.status ==='OK'){
              dispatch(setAccessToken(msg.accessToken,false))
            }
        }   
    }

    return(
        <div className="flex flex-col px-8 pt-6 pb-8 m-auto mb-4 w-80 bg-white rounded shadow-md">
        <div className="flex justify-between items-center mb-6">

          <div>Change password</div>
  
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-bold text-left text-grey-darker" htmlFor="password">
            Password
          </label>
          <input className="px-3 py-2 mb-3 w-full rounded border shadow appearance-none outline-none focus:border-blue-500 border-red text-grey-darker" id="password" type="password" 
          value={password} onChange={(e) =>setPassword(e.target.value)}
          />
          <p className="text-xs italic text-left text-red">Default password: 123456</p>
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-bold text-left text-grey-darker" htmlFor="password">
            Repeat password
          </label>
          <input className="px-3 py-2 mb-3 w-full rounded border shadow appearance-none outline-none focus:border-blue-500 border-red text-grey-darker" id="password" type="password" 
          value={passwordRepeat} onChange={(e) =>setPasswordRepeat(e.target.value)}
          />
        </div>
        <div className="flex justify-end items-center">
        <button className="px-4 py-2 font-bold text-gray-600 rounded bg-blue hover:bg-blue-dark" type="button"
           onClick={()=>dispatch(showModal(''))}
           >
             Cancel
           </button>
          <button className="px-4 py-2 font-bold text-gray-600 rounded bg-blue hover:bg-blue-dark" type="button"
            onClick={handleChangePassword}
          >
            Change
          </button>
  
        </div>
        </div>

    )

}

export default NewPassword;