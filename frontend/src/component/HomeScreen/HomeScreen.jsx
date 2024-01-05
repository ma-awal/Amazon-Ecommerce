import React, { useEffect, useReducer, useState } from 'react';
// import data from '../../data';
import logger from 'use-reducer-logger';
import { Link } from 'react-router-dom';
import axios from 'axios';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return {
        ...state,
        loading: true,
      };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_FAILED':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

const HomeScreen = () => {
  // const [products, setProducts] = useState([]);
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: false,
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios('/api/products');
        dispatch({
          type: 'FETCH_SUCCESS',
          payload: result.data,
          loading: false,
        });
      } catch (error) {
        dispatch({
          type: 'FETCH_FAILDED',
          payload: error.message,
          loading: false,
        });
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <h2 className="text-center">Feature Products</h2>
      <div className="container">
        <div className="row">
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>{error}</div>
          ) : (
            products.map((product) => (
              <div className="col-12 col-md-4 col-lg-3 products">
                <div className="product border m-1 border">
                  <Link to={`/product/${product.slug}`}>
                    <img src={product.image} className="img-fluid" alt="img" />
                  </Link>
                  <div className="product-info p-2">
                    <p>
                      <Link to={`/product/${product.slug}`}>
                        {product.name}
                      </Link>
                    </p>
                    <p>
                      <strong>${product.price}</strong>
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default HomeScreen;
