import React from 'react'
import './CheckoutProduct.css'
import { useStateValue } from './StateProvider'   

function CheckoutProduct({id, image, title, price, rating, hideButton}) {

    const [{basket}, dispatch] = useStateValue();
    const removeFromBasket = () => {
        dispatch({
            type: 'REMOVE_FROM_BASKET',
            id,
        })
    }

     return (
    <div className='CheckoutProduct'>
        <img className='checkoutProduct_image' src={image} />
        <div className='chekoutProduct_info'>
            <p className='chekoutProduct_title'>{title}</p>
            <p className='chekoutProduct_price'>
                <small>$</small>
                <strong>{price}</strong>
            </p>
            <p className='chekoutProduct_rating'>
                {Array(rating).fill().map(() => {
                return <p>⭐</p>
                })}
            </p>
            {!hideButton && (
                <button onClick={removeFromBasket}>Remove from Basket</button> 
            )}{' '}
        </div>
    </div>
  )
}

export default CheckoutProduct
