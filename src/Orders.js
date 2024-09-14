import React, { useEffect, useState } from 'react'
import './Orders.css'
import { useStateValue } from './StateProvider'
import Order from "./Order"
import { db } from './Firebase'
import { collection, doc, query, orderBy, onSnapshot } from 'firebase/firestore'


function Orders() {

  const [{basket, user}, dispatch] = useStateValue()
  const [orders, setOrders] = useState([])




  useEffect(() => {
    
    if (user?.uid) {
      const ordersRef = collection(doc(db, 'users', user.uid), 'orders');
      const ordersQuery = query(ordersRef, orderBy('created', 'desc'));
  
      onSnapshot(ordersQuery, (snapshot) => {
        const orders = snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data()
        }));
        
        setOrders(orders);
      });
    } else {
      setOrders([]);
    }
  
   

  }, [user]);

  return (
    <div className='orders'>
      <h1>Your Orders</h1>
      <div className='orders_order'>
          {console.log(orders)}
        {orders?.map((order)=> (
            <Order order={order}/>
          
        ))}
      </div>
    </div>
  )
}

export default Orders