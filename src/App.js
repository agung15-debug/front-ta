import './App.css';
import './index.css';
import { StrictMode, useState } from "react";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from './pages/LandingPage';
import Result from './pages/Result';

function App() {
  const [res, setRes] = useState({})
  return (
    <div className="App">
      <StrictMode>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage setRes={setRes}/>} />
            <Route path='/result' element={<Result res={res}/>}/>
          </Routes>
        </BrowserRouter>
      </StrictMode>
    </div>
  )
}

export default App;
