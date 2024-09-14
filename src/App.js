import './App.css';
import Header from './Header'
import Home from './Home'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Checkout from './Checkout'
import Login from './Login'
import React, { useEffect } from 'react';
import { useStateValue } from './StateProvider';
import { getAuth, onAuthStateChanged } from 'firebase/auth'; 
import Payment from './Payment';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Orders from './Orders'

const key = 'pk_test_51PyVKVD85sh1xAUWrGylKITwMsmMxBu6dNxoo793mOzAbz6tDdcufZ2ZYB2yKTk4ENPSCGaLYvo64hcvVumuXWzl00LYnDgBEu'
const promise = loadStripe(key);

function App() {
  const [{}, dispatch] = useStateValue();
  const auth = getAuth();
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        dispatch({
          type: 'SET_USER',
          user: authUser
        });
      } else {
        dispatch({
          type: 'SET_USER',
          user: null
        });
      }
    });

    // Clean up the subscription on unmount
    return () => unsubscribe();
  }, [auth, dispatch]); // Add dependencies to the dependency array
  return (
    <Router>
      <div className="App">
        <Routes>

             <Route path='/checkout' element={
                <>
                  <Header />
                  <Checkout />
                </>
             } />
             <Route path='/login' element={
                <Login />
             }
             />
            <Route path='/payment' element={
              <Elements stripe={promise}>
                <Payment />
              </Elements>
                
             }
             />
             <Route path='/orders' element={
                <>
                  <Header />
                  <Orders />
                </>
             }
             />
        
            <Route path='/' element={
              <>
                <Header />
                <Home />
                </>
              } 
             />
        </Routes>

    </div>
    </Router>
    
  );
}

export default App;
