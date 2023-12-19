import './App.css';
import './index.css';
import { StrictMode, useState } from "react";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from './pages/LandingPage';
import Result from './pages/Result';

function App() {
  const [response, setResponse] = useState({});;
  return (
    <div className="App">
      <StrictMode>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage setResponse={setResponse}/>} />
            <Route path="/results" element={<Result response={response}/>} />
          </Routes>
        </BrowserRouter>
      </StrictMode>
    </div>
  )
}

export default App;
