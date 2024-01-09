import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from '../Rating/Rating';
const Product = (props) => {
  const { product } = props;
  return (
    <>
      <Card className="">
        <Link to={`/product/${product.slug}`}>
          <img
            src={product.image}
            className="img-fluid card-img-top"
            alt="img"
          />
        </Link>
        <Card.Body>
          <Card.Title>
            <Link to={`/product/${product.slug}`}>{product.name}</Link>
          </Card.Title>
          <Rating rating={product.rating} reviews={product.reviews} />
          <Card.Text>
            <strong>${product.price}</strong>
          </Card.Text>
          <Button className="bg-warning text-white border-0">
            Add To Cart
          </Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default Product;
