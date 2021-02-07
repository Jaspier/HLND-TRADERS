import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import JoinScreen from './screens/JoinScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import DiscordDetailsScreen from './screens/DiscordDetailsScreen';
import PaymentScreen from './screens/PaymentScreen';
import ConfirmJoinScreen from './screens/ConfirmJoinScreen';
import OrderScreen from './screens/OrderScreen';

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/order/:id' component={OrderScreen} />
          <Route path='/discord-details' component={DiscordDetailsScreen} />
          <Route path='/payment' component={PaymentScreen} />
          <Route path='/confirm-join' component={ConfirmJoinScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/join/:id?' component={JoinScreen} />
          <Route path='/' component={HomeScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
