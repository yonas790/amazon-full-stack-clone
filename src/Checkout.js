import React from 'react'
import './Checkout.css'
import Subtotal from './Subtotal'
import CheckoutProduct from './CheckoutProduct'
import { useStateValue } from './StateProvider'
function Checkout() {

  const [{basket, dispatch}] = useStateValue()

  return (
    <div className='checkout'>
      <div className='checkout-left'>
        <img className='ad_checkout' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCbBKUmUMxEeSgf0wrx52kRj6r-Kfl3Y0Egw&s' />
        <h3>Hello</h3>
        <h2 className='checkout_title'>Your shopping Basket</h2>
        {basket.map((item) => (
            <CheckoutProduct 
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
          />
        ))}
      </div>
      <div className='check_right'>
        <Subtotal />
      </div>

    </div>
  )
}

export default Checkout
