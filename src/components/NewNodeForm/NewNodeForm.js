import { FaRandom } from 'react-icons/fa';

import { useState } from "react"

import { randomName } from '../../helpers/helpers';
import { getPublicKey } from '../../helpers/helpers';
import { fetchKey } from "../../helpers/helpers"
import { validateKey } from '../../helpers/helpers';
import NodeControls from "../../helpers/NodeControls"

import { useDispatch, useSelector } from 'react-redux';
import { showModal } from "../../store/actions"

const NewNodeForm = () => {

    const [privKey, setPrivKey] = useState('')
    const [provider, setProvider] = useState('/var/run/docker.sock')
    const [isKeyValid, setIsKeyValid] = useState(false)
    const [publicKey, setPublicKey] = useState('enter private key or generate new')
    const [nodeName, setNodeName] = useState(randomName())
    const accessToken = useSelector(state => state.reducer.accessToken);

    const dispatch = useDispatch()
    const genPrivKey = async () => {

        let res = await fetchKey(accessToken)
        console.log(res)
        setPrivKey(res.privKey)
        setIsKeyValid(validateKey(res.privKey))
        setPublicKey(getPublicKey(res.privKey))
        setNodeName(randomName())
    }

    const handlePrivKeyChange = (e) => {
        let newPrivKey = e.target.value;
        setPrivKey(newPrivKey)
        if (newPrivKey === "") {
            setIsKeyValid(false)
            setPublicKey("enter private key or generate new")
            return;
        }
        setIsKeyValid(validateKey(newPrivKey))
        setPublicKey(getPublicKey(newPrivKey))
        setNodeName(randomName())
    }

    const handleProviderChange = (e) => {
        setProvider(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await NodeControls.newNode({ privateKey: privKey, name: nodeName, accessToken: accessToken })
        dispatch(showModal(''))

    }

    return (
        <div className="w-full h-full text-white bg-white rounded-lg shadow">
            <div className="text-2xl font-semibold text-gray-900">
                Node Creator
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
                <div>
                    <div className="overflow-hidden shadow sm:rounded-md">
                        <div className="px-4 py-5 bg-white sm:p-6">
                            <div className="grid grid-cols-1 gap-6">
                                <div className="flex col-span-12 items-center w-full">
                                    <div className="mr-4 w-full"> <label className="block text-sm font-medium text-gray-700">Node Private Key</label>
                                        <input type="text" value={privKey} onChange={handlePrivKeyChange} placeholder="0x..." name="first-name" id="first-name" className="block px-2 py-1 mt-1 w-full text-gray-700 rounded-md border border-gray-300 shadow-sm outline-none focus:border-blue-500 sm:text-sm" />
                                        <label className="text-xs text-gray-600">{publicKey}</label>
                                    </div>
                                    <div className="text-gray-500 cursor-pointer hover:text-gray-900"
                                        onClick={() => genPrivKey()}
                                    ><FaRandom /></div>
                                </div>
                                <div className="col-span-8">
                                    <label className="block text-sm font-medium text-gray-700">Docker provider</label>
                                    <input value={provider} onChange={handleProviderChange} className="block px-3 py-2 mt-1 w-full text-gray-800 bg-white rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">

                                    </input>
                                </div>
                                <div className="col-span-4 w-40">
                                    <label className="block text-sm font-medium text-gray-700">Node Name</label>
                                    <label className="text-xs text-gray-600">{nodeName}</label>
                                </div>
                            </div>
                        </div>
                        <div className="px-4 py-3 text-right bg-gray-50 sm:px-6">
                            <button className="px-4 py-2 font-bold text-gray-600 rounded bg-blue hover:bg-blue-dark" type="button"
                                onClick={() => dispatch(showModal(''))}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                className={`inline-flex justify-center px-4 py-2 text-sm font-medium text-white rounded-md border border-transparent shadow-sm  focus:outline-none focus:ring-2 focus:ring-offset-2  ${isKeyValid ? "bg-indigo-600 focus:ring-indigo-500 hover:bg-indigo-700" : "bg-gray-400"}`} disabled={!isKeyValid}>
                                create
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default NewNodeForm;