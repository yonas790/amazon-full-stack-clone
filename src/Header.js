import React from 'react'
import './Header.css'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { Link } from 'react-router-dom'
import { useStateValue } from './StateProvider';
import {getAuth, signOut} from 'firebase/auth'

function Header() {
    const [{basket, user}, dispatch] = useStateValue()

    const handleAuthentication = () => {
        const auth = getAuth();
        if (user) {
            signOut(auth)
        }
    }
  return (
    <div className='header'>
        <Link to='/' >
        <img className='header_logo' src='https://supersimple.dev/projects/amazon/images/amazon-logo-white.png' />
        </Link>
        <div className='header_search'>
            <input className='header_searchInput' type='text' />
            <SearchIcon className='header_searchIcon' />
        </div>
        <div className='header_nav'>
            <Link to={!user && '/login'} className='header_clearLink'>
            <div onClick={handleAuthentication} className='header_option'>
                <span className='header_optionLineOne'>Hello {!user ? 'Guest': user.email}</span>
                <span className='header_optionLineTwo'>{user ? 'Sign Out' : 'Sign In'}</span>
            </div>
            </Link>
            <Link to='/orders' className='header_clearLink'>
                <div className='header_option'>
                    <span className='header_optionLineOne'>Returns</span>
                    <span className='header_optionLineTwo'>& Orders</span>
                </div>
            </Link>
            <div className='header_option'>
                <span className='header_optionLineOne'>Your</span>
                <span className='header_optionLineTwo'>Prime</span>
            </div>
            <Link to='/checkout' className='header_clearLink'>
            <div className='header_optionBasket'>
                <ShoppingBasketIcon />
                <span className='header_optionLineTwo header_basketCount'>
                    {basket.length}
                </span>
            </div>
            </Link>
        </div>
      
    </div>
  )
}

export default Header
