import React from 'react';
import data from '../../data';
import { Link } from 'react-router-dom';
const HomeScreen = () => {
  return (
    <>
      <h2 className="text-center">Feature Products</h2>
      <div className="container">
        <div className="row">
          {data.products.map((product) => (
            <div className="col-12 col-md-4 col-lg-3 products">
              <div className="product border m-1 border">
                <Link to={`/product/${product.slug}`}>
                  <img src={product.image} className="img-fluid" alt="img" />
                </Link>
                <div className="product-info p-2">
                  <p>
                    <Link to={`/product/${product.slug}`}>{product.name}</Link>
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
    </>
  );
};

export default HomeScreen;
