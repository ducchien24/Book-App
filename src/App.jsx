import "./App.css";

import {Header,Footer} from './component/layout/index'
import {Outlet} from 'react-router-dom'
function App() {
 
  return (
    <>
      <Header />
      <Outlet/>
      <Footer/>
    </> 
  );
}

export default App;
