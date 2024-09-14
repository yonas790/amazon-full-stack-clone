import React, {useEffect, useState} from 'react'
import './Payment.css'
import {Link}from "react-router-dom"
import { useStateValue } from './StateProvider'
import CheckoutProduct from './CheckoutProduct'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { NumericFormat } from 'react-number-format'; 
import axios from './axios'
import { useNavigate } from 'react-router-dom'
import {db} from './Firebase'
import { doc, collection, setDoc } from 'firebase/firestore';



function Payment() {
    const [{basket, user}, dispatch] = useStateValue()
    const getBasketTotal = (basket) => {
        return basket?.reduce((amount, item) => item.price + amount, 0);
    };

    const stripe = useStripe()
    const elements = useElements()

    const [error, setError] = useState(null)
    const [disabled, setDisabled] = useState(true)

    const [processing, setProcessing] = useState('')
    const [succeeded, setSucceeded] =useState(false)

    const [clientSecret, setClientSecret] = useState(true)

    useEffect(() => {
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`
            })
            setClientSecret(response.data.clientSecret)
        }
        if (basket.length > 0) {

            getClientSecret();
        }
        

    }, [basket])
    

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        setProcessing(true)
        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        })
        .then(async ({paymentIntent}) =>  {
           
            const userRef = doc(db, 'users', user?.uid);
            const ordersRef = collection(userRef, 'orders');
            const orderRef = doc(ordersRef, paymentIntent.id);

            await setDoc(orderRef, {
                basket: basket,
                amount: paymentIntent.amount,
                created: paymentIntent.created
            });
           
            setSucceeded(true)
            setError(null)
            setProcessing(false)

            dispatch({
                type: 'EMPTY_BASKET'
            })

            navigate('/orders', { replace: true });
        })

    }


    const handleChange = e => {

        setDisabled(e.empty)
        setError(e.error ? e.error.message: '')
    }

  return (
    <div className='payment'>
        <div className="payment_container">
            <h1>Checkout(<Link to="/checkout">{basket?.length} items</Link>)</h1>
            <div className='payment_section'>
                <div className='payment_title'>
                    <h3>Delivery Address</h3>
                </div>
                <div className='payment_address'>
                    <p>{user?.email}</p>
                    <p>123 University Road</p>
                    <p>Bahir Dar, Ethiopia</p>
                </div>
            </div>
            <div className='payment_section'>
                <div className='payment_tilte'>
                    <h3>Review items and delivery</h3>
                </div>
                <div className='payment_items'>
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
            </div>
            <div className='payment_section'>
                <div className='payment_title'>
                    <h3>Payment Method</h3>
                </div>
                <div className='payment_details'>
                    <form onSubmit={handleSubmit} > 
                        <CardElement onChange={handleChange}/>

                        <div className='payment_priceContainer'>
                            <NumericFormat 
                                renderText={(value) => <h3>Order Total: {value}</h3>}
                                decimalScale={2}
                                value={getBasketTotal(basket)}
                                displayType={'text'}
                                thousandSeparator={true}
                                prefix={'$'}
                            />

                            <button disabled={processing || disabled || succeeded} >
                                <span>{processing ?       <p>Processing</p>: "Buy Now"}</span>
                            </button>
                            {error && <div> {error} </div>}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Payment