import { useState } from 'react'
import {setWalletKey,showModal} from '../store/actions'
import { useDispatch } from 'react-redux';


const NodeWallet = ({ privatekey }) => {
    const [option,setOption] = useState('main')
    const dispatch = useDispatch()

    const handleWithdraw = () =>{
        dispatch(setWalletKey(privatekey))
        dispatch(showModal("WITHDRAW"))
        setOption()
    }

    return (
        <div  className="px-4 py-4 mx-auto w-full bg-white rounded-lg shadow">
            <div className="grid sm:grid-flow-row sm:gap-4 md:grid-flow-col sm:grid-cols-2">
                <div className="flex justify-around items-center px-4 py-4 font-mono bg-white border-r">
                
                    <div>
                    <p className="text-lg text-center text-gray-500">0.0002 DATA </p>
                    <p className="text-lg text-center text-gray-500">0.0000 MATIC </p>
                </div>

                <div className="flex flex-col justify-around items-center">

                    <div onClick={()=>handleWithdraw()} className="px-2 my-2 text-center text-gray-500 rounded-lg border cursor-pointer"> WITHDRAW</div>
                </div>
                      

                </div>

                <div className="flex flex-col px-4 py-2 bg-white cursor-not-allowed 00 sm:mt-0">
                    <div>
                        <div>
                            <div className="flex justify-evenly items-center text-xs text-gray-400">
                               <div>
                                    <span className="font-bold">staked : 0DATA</span>
                               </div>
                               <div>
                               <span className="font-bold">STAKING(unavailable in testnet)</span>
                               </div>
                            </div>
                        </div>
                        <div className="flex items-center text-sm">
                            <div className="flex items-center">
                                <div className="text-xs text-purple-300 underline cursor-pointer">max</div>
                                <input placeholder="max 10 000 DATA" disabled={true} className="p-2 m-2 w-full text-lg text-center text-gray-500 rounded-lg border cursor-not-allowed" />
                            </div>
                            <button className="p-2 m-2 text-lg text-center text-gray-500 rounded-lg border cursor-not-allowed" disabled={true}> STAKE</button>
                        </div>


                    </div>
                </div>

        </div>
            </div>
      
    )
}

export default NodeWallet