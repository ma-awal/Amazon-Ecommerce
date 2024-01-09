import React, { useEffect, useReducer, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
// import data from '../../data';
import logger from 'use-reducer-logger';
import Product from '../Product/Product';
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
            <Row>
              {products.map((product) => (
                <Col sm={12} md={4} lg={3} className="mb-3">
                  <Product product={product} />
                </Col>
              ))}
            </Row>
          )}
        </div>
      </div>
    </>
  );
};

export default HomeScreen;
