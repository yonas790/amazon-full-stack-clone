import './App.css';
import Header from './Header'
import Home from './Home'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Checkout from './Checkout'
import Login from './Login'
import React, { useEffect } from 'react';
import { useStateValue } from './StateProvider';
import { getAuth, onAuthStateChanged } from 'firebase/auth'; 

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
            <Route path='/' element={
              <>
                <Header />
                <Home />
                </>
              } 
             />
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
        </Routes>

    </div>
    </Router>
    
  );
}

export default App;
