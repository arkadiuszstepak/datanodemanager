import { NODES_SET } from './storeConstant'
import { NODE_SELECT } from './storeConstant'
import { VIEW_SET } from './storeConstant'
import { MODAL_SHOW } from './storeConstant'
import { TOKEN_SET } from './storeConstant'
import { PROVIDER_SET } from './storeConstant'
import { WALLETKEY_SET } from './storeConstant'


export const setNodes = (nodes) => {

    return {
        type: NODES_SET,
        payload: {
            nodes
        }
    }
}


export const selectNode = (id) => {

    return {
        type: NODE_SELECT,
        payload: {
            id
        }
    }
}



export const setView= (view) => {

    return {
        type: VIEW_SET,
        payload: {
            view
        }
    }
}


export const showModal=(component) => {

    return {
        type: MODAL_SHOW,
        payload: {
            component
        }
    }
}


export const setAccessToken = (token,isDefault) =>{
    return {
        type : TOKEN_SET,
        payload: {
            token,
            isDefault
        }
    }
}


export const setWalletProvider= (provider) =>{
    return {
        type : PROVIDER_SET,
        payload: {
            provider
        }
    }
}


export const setWalletKey=(privateKey) =>{
    return {
        type : WALLETKEY_SET,
        payload: {
            privateKey
        }
    }
}






