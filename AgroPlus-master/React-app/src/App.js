import './App.css';
import Home from "./Components3/Home.jsx";
import Header from "./Components3/Header.jsx";
import { useTranslation } from 'react-i18next';

function App() {
 
  return (
    <div className="App">
      <Header/>
      <Home />
      
    </div>
  );
}

export default App;
