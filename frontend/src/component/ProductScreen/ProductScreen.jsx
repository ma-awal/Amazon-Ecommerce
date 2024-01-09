import React from 'react';
import axios from 'axios';
import { useReducer } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Row,
  Col,
  Button,
  ListGroup,
  ListGroupItem,
  Container,
  Card,
  Badge,
} from 'react-bootstrap';
import Rating from '../Rating/Rating';
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return {
        ...state,
        loading: true,
      };
    case 'FETCH_SUCCESS':
      return { ...state, product: action.payload, loading: false };
    case 'FETCH_FAILED':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};
const ProductScreen = () => {
  const params = useParams();
  const { slug } = params;
  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    product: [],
    loading: false,
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`/api/products/slug/${slug}`);
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
  }, [slug]);

  return loading ? (
    <div>Loading..</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <Container className="mt-3">
      <Row>
        <Col md={6}>
          <img src={product.image} className="img-fluid" alt="image" />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h1>{product.name}</h1>
            </ListGroupItem>
            <ListGroupItem>
              <Rating rating={product.rating} reviews={product.numReviews} />
            </ListGroupItem>
            <ListGroupItem>Price : $ {product.price}</ListGroupItem>
            <ListGroupItem className="text-capitalize">
              {product.description}
            </ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroupItem>
                  <Row>
                    <Col>Price</Col>
                    <Col>${product.price}</Col>
                  </Row>
                </ListGroupItem>
                <ListGroupItem>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock > 0 ? (
                        <Badge bg="success">In Stock</Badge>
                      ) : (
                        <Badge bg="danger">Unavailable</Badge>
                      )}
                    </Col>
                  </Row>
                </ListGroupItem>
                {product.countInStock > 0 && (
                  <div>
                    <Button bg="primary" className="w-100">
                      Add to Cart
                    </Button>
                  </div>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductScreen;
