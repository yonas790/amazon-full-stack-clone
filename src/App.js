import './App.css';
import Header from './Header'
import Home from './Home'
import {BrowserRouter as Router, Routes, Switch, Route} from 'react-router-dom'
import Checkout from './Checkout'
import Login from './Login'

function App() {
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
