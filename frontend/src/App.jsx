import './App.css';
import data from './data';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <a className="App-link" href="/">
          Amazona
        </a>
      </header>
      <main>
        <h2>Feature Products</h2>
        <div className="container">
          <div className="row">
            {data.products.map((product) => (
              <div className="col-12 col-md-4 col-lg-3 products">
                <div className="product border m-1 border">
                  <a href={`/product/${product.slug}`}>
                    <img src={product.image} className="img-fluid" alt="img" />
                  </a>
                  <div className="product-info p-2">
                    <p>
                      <a href={`/product/${product.slug}`}>{product.name}</a>
                    </p>
                    <p>
                      <strong>${product.price}</strong>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
