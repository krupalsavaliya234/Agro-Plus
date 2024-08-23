import './App.css';
import Home from "./Components3/Home.jsx";
import Header from "./Components3/Header.jsx";
import { useTranslation } from 'react-i18next';
import { SpeedInsights } from "@vercel/speed-insights/react"; 
function App() {
 
  return (
    <div className="App">
    <SpeedInsights>

      <Header/>
      <Home />
    </SpeedInsights>
      
    </div>
  );
}

export default App;
