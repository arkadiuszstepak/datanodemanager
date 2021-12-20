import { selectNode } from "./actions";

const initialState = {
   view: '',
   nodes: [],
   selectNode: 0,
   modalComponent : 'LOGIN',
   accessToken :  '',
   isPasswordDefault : false,
   provider : {},
   walletKey : ""
};

const reducer = (state = initialState, action) => {
   switch (action.type) {
      case 'VIEW_SET':
         return Object.assign({}, state, {
            view: action.payload.view
         })
      case 'PROVIDER_SET':
            return Object.assign({}, state, {
               provider: action.payload.provider
            })
      case 'NODES_SET':
         return Object.assign({}, state, {
            nodes: action.payload.nodes
         })
      case 'WALLETKEY_SET':
            return Object.assign({}, state, {
               walletKey: action.payload.privateKey
            })

      case 'TOKEN_SET':
         return Object.assign({}, state, {
            view: 'NODE_LIST',
            modalComponent : '',
            accessToken: action.payload.token,
            isPasswordDefault : action.payload.isDefault
         })
      case 'NODE_SELECT':
         if (state.nodes.find(el => el.dockerId === action.payload.id))
            return Object.assign({}, state, {
               view: 'NODE_DETAILS',
               selectedNode: action.payload.id
            })
      case 'MODAL_SHOW':
         return Object.assign({}, state, {
            modalComponent: action.payload.component
         })

      default:
         return state;
   }


}
export default reducer;





