import { ReactComponent as StreamrLogo } from "../../streamr.svg"
import  NodeControls  from '../../helpers/NodeControls'
import { useState } from 'react'
import { setAccessToken } from '../../store/actions'
import { useDispatch } from 'react-redux';
import { hash } from '../../helpers/helpers'

const Login = () => {

  const [logMsg,setLogMsg] = useState('')
  const [password,setPassword] = useState('')

  const dispatch = useDispatch()

  const handlePasswordChange = (e) =>{
    setPassword(e.target.value)
  }

  const handleLogin = async() =>{
 
    const passwordHash = await hash(password)
    const msg = await NodeControls.login(passwordHash)
    if(msg.status ==='OK'){
      dispatch(setAccessToken(msg.accessToken,password === '123456'))
    }
    else setLogMsg(msg.status)
  }



  return (
    <div className="flex flex-col px-8 pt-6 pb-8 m-auto mb-4 w-80 bg-white rounded shadow-md">
      <div className="flex justify-between items-center mb-6">
        <div><StreamrLogo /></div>
        <div>DATA NODE MANAGER</div>

      </div>
      <div className="mb-6">
        <label className="block mb-2 text-sm font-bold text-left text-grey-darker" htmlFor="password">
          Password
        </label>
        <input className="px-3 py-2 mb-3 w-full rounded border shadow appearance-none outline-none focus:border-blue-500 border-red text-grey-darker" id="password" type="password" 
        value={password} onChange={handlePasswordChange}
        />
        <p className="text-xs italic text-left text-red">Default password: 123456</p>
      </div>
      <div className="flex justify-end items-center">
        {logMsg}
        <button className="px-4 py-2 font-bold text-gray-600 rounded bg-blue hover:bg-blue-dark" type="button"
          onClick={handleLogin}
        >
          Sign In
        </button>

      </div>
    </div>
  )
}

export default Login;