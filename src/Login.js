import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import './Login.css'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword }  from 'firebase/auth'
import { auth } from './Firebase'
import {useNavigate} from 'react-router-dom'

function Login() {

    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const singIn = (e) => {
         e.preventDefault()
         signInWithEmailAndPassword(auth, email, password)
         .then((auth) => {
           if (auth) {
            navigate('/')
           }
         })
         .catch((error) => alert(error.message))
    }

    const register = (e) => {
        e.preventDefault()

        createUserWithEmailAndPassword(auth,email, password)
        .then((auth) => {
            if (auth) {
                navigate('/')
            }
        })
        .catch((error) => alert(error.message))
       
   }

  return (
    <div className='login'>
       <Link to="/" ><img className='login_logo' src='https://assets.aboutamazon.com/dims4/default/c7f0d8d/2147483647/strip/true/crop/6110x2047+0+0/resize/645x216!/format/webp/quality/90/?url=https%3A%2F%2Famazon-blogs-brightspot.s3.amazonaws.com%2F2e%2Fd7%2Fac71f1f344c39f8949f48fc89e71%2Famazon-logo-squid-ink-smile-orange.png' /></Link>
       <div className='login_container'>
            <h1>Sign-in</h1>
            <form>
                <h5>E-mail</h5>
                <input 
                    type='text'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                /> 

                <h5>Password</h5>
                <input 
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button 
                    type='submit'
                    onClick={singIn}
                    className='login_singInButton'
                > 
                Sign In
                </button>
            </form>

            <p>
                By signing-in you agree to the AMAZON FAKE CLONE cnditions of Use Sale, Please see our Privacy Notice, our Cookies Notise our Interest-Based Ads Notice.
            </p>

            <button onClick={register} className='login_registerButton'>
                Create your Amazon Acconut
            </button>
       </div>
    </div>
  )
}

export default Login
