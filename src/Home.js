import React from 'react'
import './Home.css'
import Product from './Product'

function Home() {
  return (
    <div className='home'>
      <div className='home_container'>
        <img className='home_image' src='https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg' alt='' /> 
        <div className='home_row'>
            <Product 
                id='12321341' 
                title='Gaming Chairs For Adults With Headrest Pillow - Blue'
                price = {653.34}
                rating = {4}
                image = 'https://m.media-amazon.com/images/I/61uQiM41J8L._AC_SX425_.jpg'
                />
            <Product 
                id='12321234' 
                title='Snpurdiri 60% Wired Gaming Keyboard, RGB Backlit Mini Keyboard'
                price = {16.99}
                rating = {5}
                image = 'https://m.media-amazon.com/images/I/61UGJ7z-sUL._AC_UY218_.jpg'
                />
        </div>
        <div className='home_row'>
            <Product 
                id='12321763' 
                title='Corsair HS65 SURROUND Gaming Headset'
                price = {43.86}
                rating = {5}
                image = 'https://m.media-amazon.com/images/I/81qvlpWgapL._AC_UY218_.jpg'
                />
                <Product 
                id='12321734' 
                title='PlayStation®5 Digital Edition (Slim) – (Renewed Premium)'
                price = {999.99}
                rating = {4}
                image = 'https://m.media-amazon.com/images/I/51fM0CKG+HL._AC_UY218_.jpg'
            />
            <Product 
                id='12321653' 
                title='Lenovo IdeaPad 1 Laptop, 15.6” FHD Display, AMD Ryzen 5'
                price = {300.00}
                rating = {5}
                image = 'https://m.media-amazon.com/images/I/51h3oOo7XnL._AC_UY218_.jpg'
                />
        </div>
        <div className='home_row'>
            <Product
             id='12321986' 
             title='LG 49" UltraGear DQHD (5120x1440) Curved Gaming Monitor'
             price = {600.77}
             rating = {5}
             image = 'https://m.media-amazon.com/images/I/61dmFw-toML._AC_UY218_.jpg'
             />
        </div>
      </div>
    </div>
  )
}

export default Home
