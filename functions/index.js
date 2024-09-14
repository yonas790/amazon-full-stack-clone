const functions = require('firebase-functions')
const express = require('express')
const cors = require('cors')
const stripe = require('stripe')('sk_test_51PyVKVD85sh1xAUWjmsTO6DvJKZceVKwSO89ayCE0dlX1e1NJKqXTMqVZPgPE6LL6tN6aawUSSW5dFrfHHQ6aHRW00EQIbgpOh')

const app = express();

app.use(cors());
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello')
})
app.post('/payments/create', async (req, res) => {
    const total = req.query.total;

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: 'usd'
    })

    res.status(201).send({
        clientSecret: paymentIntent.client_secret
    })
 
})

exports.api = functions.https.onRequest(app)

//http://127.0.0.1:5001/project-e07d6/us-central1/api  --base url