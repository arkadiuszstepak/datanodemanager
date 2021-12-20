
import { useState,useEffect } from 'react'


import StatusIndicator from "./StatusIndicator";

import NodeControlButtons from "./NodeControlButtons"

import { getBalanceMatic, getBalanceTokens } from "../helpers/WalletControl"

import { useSelector } from 'react-redux'

var ethers = require('ethers');


const NodeInfo = ({ stats, Node }) => {

    const [showPrivKey, setShowPrivKey] = useState(false)
    const provider = useSelector(state => state.reducer.provider)
    const [dataBalance, setDataBalance] = useState(0)
    const [maticBalance, setMaticBalance] = useState(0)

    useEffect(async()=>{
        let balance1 = await getBalanceTokens(provider,Node.privateKey,Node.publicKey)
        let balance2 = await getBalanceMatic(provider,Node.publicKey)
       setDataBalance(balance1)
       setMaticBalance(balance2)
        
    },[provider])


    const updateBalance = async ()=>{
        // let balance1 = await getBalanceTokens(provider,Node.privateKey,'0x3828d57e47a363ae1e84c583be62b9fc16bc63ac')
        let balance1 = await getBalanceTokens(provider,Node.privateKey,Node.publicKey)
        let balance2 = await getBalanceMatic(provider,Node.publicKey)
        setDataBalance(balance1)
        setMaticBalance(balance2)
    }
 

    const PrivKeyButton = (showPrivKey) => {
        return (showPrivKey ? <span>{Node.privateKey}</span> : <span>click to show Private key</span>)
    }

    



    return (
        <div className="overflow-hidden bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                    {Node.name}
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    {Node.publicKey}
                </p>
            </div>
            <div className="border-t border-gray-200">
                <dl>
                    <div className="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                            Provider
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {Node.provider}
                        </dd>
                    </div>
                    <div className="px-4 py-5 bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                            Private Key
                        </dt>
                        <dd className="mt-1 text-sm text-gray-500 cursor-pointer sm:mt-0 sm:col-span-2"
                            onClick={() => setShowPrivKey(!showPrivKey)}
                        >
                            {PrivKeyButton(showPrivKey)}
                        </dd>
                    </div>
                    <div className="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                            Status
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <div className="flex justify-center items-center">
                                <StatusIndicator status={stats.status} />
                                <div> {stats.status}</div>
                            </div>
                        </dd>
                    </div>
                    <div className="px-4 py-5 bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                            Balance
                            <div className="text-xs text-purple-400 cursor-pointer"
                            onClick={()=>updateBalance()}
                            >
                                update
                            </div>
                        </dt>
                        <dd className="flex flex-col mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <div >{ethers.utils.formatEther(dataBalance,3)} DATA</div>
                            <div>{ethers.utils.formatEther( maticBalance,3)} MATIC</div>
                        </dd>
                    </div>

                    <div className="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                            Actions
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <div className="flex flex-col rounded-md divide-y divide-gray-200">

                                <div className="flex justify-evenly items-center text-sm">
                                    <NodeControlButtons dockerIds={[Node.dockerId]} status={stats.status}/>
                                </div>
                            </div>
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
    )
}

export default NodeInfo;