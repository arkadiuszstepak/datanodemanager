import { useEffect,useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { showModal } from "../store/actions";
import { getPublicKey } from "../helpers/helpers";
import { getBalanceTokens, getBalanceMatic,sendTokens } from "../helpers/WalletControl";
var ethers = require('ethers');

const Withdraw = () =>{
    const dispatch = useDispatch()

    const [recipientAddress, setRecipientAddress] = useState('')
    const [amount, setAmount] = useState(0)

    const [publicKey, setPublicKey] = useState(false)
    const provider = useSelector(state => state.reducer.provider)
    const privateKey = useSelector(state => state.reducer.walletKey)
    const [dataBalance, setDataBalance] = useState(0)
    const [maticBalance, setMaticBalance] = useState(0)

    useEffect(async()=>{
        const  pk = getPublicKey(privateKey)
        setPublicKey(pk)
        let balance1 = await getBalanceTokens(provider,privateKey,pk)
        let balance2 = await getBalanceMatic(provider,pk)
       setDataBalance(balance1)
       setMaticBalance(balance2)
        
    },[provider])


    const handleSendTokens = () =>{
        sendTokens(privateKey,recipientAddress,)
    }



    return(
        <div  className="flex flex-col px-8 pt-6 pb-8 m-auto mb-4 w-80 bg-white rounded shadow-md">
        <div className="flex flex-col justify-between items-center mb-6">

          <div>Withdraw from </div>
          <div className="text-xs text-gray-600">{publicKey} </div>
  
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-bold text-left text-grey-darker" >
            Amount
          </label>
          <input className="px-3 py-2 mb-3 w-full rounded border shadow appearance-none outline-none focus:border-blue-500 border-red text-grey-darker" 
          onChange={(e)=>setAmount(e.target.value)} value={amount} 
       
          />
          <p className="text-xs italic text-left text-red">DATA in wallet: {ethers.utils.formatEther(dataBalance,3)}</p>
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-bold text-left text-grey-darker" >
            Recipient address
          </label>
          <input className="px-3 py-2 mb-3 w-full text-sm rounded border shadow appearance-none outline-none focus:border-blue-500 border-red text-grey-darker"  
  onChange={(e)=>setRecipientAddress(e.target.value)} value={recipientAddress} 
          />
        </div>
        <div className="flex justify-end items-center">
        <button className="px-4 py-2 font-bold text-gray-600 rounded bg-blue hover:bg-blue-dark" type="button"
           onClick={()=>dispatch(showModal(''))}
           >
             Cancel
           </button>
          <button className="px-4 py-2 font-bold text-gray-600 rounded border bg-blue hover:bg-blue-dark" type="button"
           onClick={()=>handleSendTokens}
          >
            Send
          </button>
  
        </div>
        </div>
    )
}

export default Withdraw;