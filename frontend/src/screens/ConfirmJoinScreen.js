import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import CheckoutSteps from '../components/CheckoutSteps';
import { createOrder } from '../actions/orderActions';

const ConfirmJoinScreen = ({ history }) => {
  const dispatch = useDispatch();

  const join = useSelector(state => state.join);

  //    Calculate prices
  join.totalPrice = join.joinItems.reduce((acc, item) => acc + item.price, 0);

  const orderCreate = useSelector(state => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
    }
    // eslint-disable-next-line
  }, [history, success]);

  const joinHandler = () => {
    dispatch(
      createOrder({
        orderItems: join.joinItems,
        discordDetails: join.discordDetails,
        paymentMethod: join.paymentMethod,
        totalPrice: join.totalPrice,
      })
    );
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Discord Username</h2>
              <p>
                <strong>Username: </strong>
                {join.discordDetails.username}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {join.paymentMethod}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Your Plan</h2>
              {join.joinItems.length === 0 ? (
                <Message>You didn't pick a plan</Message>
              ) : (
                <ListGroup variant='flush'>
                  {join.joinItems.map((item, index) => (
                    <ListGroup key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>Payment Plan: ${item.price}/month</Col>
                      </Row>
                    </ListGroup>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${join.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant='danger'>{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={join.joinItems === 0}
                  onClick={joinHandler}
                >
                  Join Us!
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ConfirmJoinScreen;
