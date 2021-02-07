import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from 'react-bootstrap';
import Message from '../components/Message';
import { join, joinCancel } from '../actions/joinActions';

const JoinScreen = ({ match, history }) => {
  const productId = match.params.id;

  const dispatch = useDispatch();

  const toJoin = useSelector(state => state.join);
  const { joinItems } = toJoin;

  useEffect(() => {
    if (productId) {
      dispatch(join(productId));
    }
  }, [dispatch, productId]);

  const cancelHandler = id => {
    dispatch(joinCancel(id));
    history.push('/');
  };

  const checkoutHandler = () => {
    history.push('/login?redirect=discord-details');
  };

  return (
    <Row>
      <Col md={8}>
        <h1>Your Plan</h1>
        <ListGroup variant='flush'>
          {joinItems.map(item => (
            <ListGroup.Item key={item.product}>
              <Row>
                <Col md={4}>
                  <Image src={item.image} alt={item.name} fluid rounded />
                </Col>
                <Col md={2}>
                  <Link to={`/product/${item.product}`}>{item.name}</Link>
                </Col>
                <Col md={1}>${item.price}</Col>
                <Col md={1}>
                  <Button
                    type='button'
                    variant='light'
                    onClick={() => cancelHandler(item.product)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h1>TOTAL:</h1>
              <h2>
                $
                {joinItems
                  .reduce((acc, item) => acc + item.price, 0)
                  .toFixed(2)}
              </h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block'
                onClick={checkoutHandler}
              >
                Proceed to Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default JoinScreen;
