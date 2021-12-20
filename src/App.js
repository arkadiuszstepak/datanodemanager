
import './App.css';

import NodesList from './components/NodesList';
import NodeDetails from './components/NodeDetails';
import Login from "./components/Login/Login";



import { useSelector } from 'react-redux'

import Modal from './components/Modal';
import NewNodeForm from './components/NewNodeForm/NewNodeForm';
import DefaultPasswordNotification from './components/DefaultPasswordNotification';
import NewPassword from './components/Login/NewPassword';
import Withdraw from "./components/Withdraw"

function App() {

  const view = useSelector(state => state.reducer.view);
  const isPasswordDefault = useSelector(state => state.reducer.isPasswordDefault);
  const modalComponent = useSelector(state => state.reducer.modalComponent);

  const View = () => {
    if (view === 'NODE_LIST') return <NodesList />
    else if (view === 'NODE_DETAILS') return <NodeDetails />
    else return null
  }

  const ModalShow = () => {
    return (
      <Modal>
        {modalComponent === 'NEW_NODE' && <NewNodeForm />}
        {modalComponent === 'LOGIN' && <Login />}
        {modalComponent === 'NEW_PASSWORD' && <NewPassword />}
        {modalComponent === 'WITHDRAW' && <div><Withdraw/></div>}
        {modalComponent === '' && <div></div>}
      </Modal>
    )
  }
  return (
    <div className="App">
       {modalComponent === '' ? null : ModalShow()}
      <div className="m-auto w-3/4 h-screen">
        {View()}
        {isPasswordDefault &&<DefaultPasswordNotification/>}
      </div>
    </div>
  );
}

export default App;
