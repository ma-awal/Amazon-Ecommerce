import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeScreen from './component/HomeScreen/HomeScreen';
import { Link } from 'react-router-dom';
import ProductScreen from './component/ProductScreen/ProductScreen';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
function App() {
  return (
    <BrowserRouter>
      <div
        className="d-flex flex-column site-container
      "
      >
        <header className=" ">
          <Navbar bg="dark">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>Amazona</Navbar.Brand>
              </LinkContainer>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container>
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/product/:slug" element={<ProductScreen />} />
            </Routes>
          </Container>
        </main>
        <footer className="text-center">
          All right Reserved by the Developer
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
