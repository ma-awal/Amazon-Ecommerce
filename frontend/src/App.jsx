import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeScreen from './component/HomeScreen/HomeScreen';
import { Link } from 'react-router-dom';
import ProductScreen from './component/ProductScreen/ProductScreen';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <header className="App-header">
          <Link className="App-link" to="/">
            Amazona
          </Link>
        </header>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/product/:slug" element={<ProductScreen />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
