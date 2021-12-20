import { useDispatch } from 'react-redux';
import { setWalletProvider } from "../store/actions";
import { useEffect, useState } from 'react'

import { useProvider } from "../helpers/WalletControl"


const providersList = [
    'https://polygon-rpc.com/',
    'metamask'
]

const ProviderSelect = () => {
    const [selected, setSelected] = useState(providersList[0])
    const [provider, getProvider] = useProvider(selected)
    const dispatch = useDispatch()

    useEffect(() => {
        getProvider(selected)
    }, [])

    useEffect(() => {
        dispatch(setWalletProvider(provider))
    }, [provider])

    const handleSelect = (providerSelect) => {
        setSelected(providerSelect)
        getProvider(providerSelect)
        dispatch(setWalletProvider(provider))
    }

    return (
        <div className="flex justify-center text-xs">
            <div className="text-gray-900 bg-white rounded-lg border-gray-200">
                {
                    providersList.map((prov,id) =>
                        <div 
                        className={`${selected === prov?'border-purple-400':'border-grey-400'}
                         justify-center p-1 bg-white rounded-lg border cursor-pointer `}
                            onClick={() => handleSelect(prov)}
                            key={id}
                        >
                            <div className="mr-1">{prov}</div>
                        </div>
                    )
                }
            </div>
        </div>


    )




}


export default ProviderSelect;