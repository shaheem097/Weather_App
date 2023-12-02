import {BrowserRouter,Routes,Route} from "react-router-dom";
import Dashboard from "./Component/Dashboard";

function App() {

  return (
    <div className="app">
       <BrowserRouter>
    
    <Routes>
     
      <Route path="/" element={ <Dashboard /> } />


    </Routes>
  
  </BrowserRouter>
    </div>
  )
}

export default App
