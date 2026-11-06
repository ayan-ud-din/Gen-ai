 import React from 'react'
 import {Link, useNavigate} from 'react-router'
import '../Auth.css';
 
 const Login = () => {
   return (
           <>
        <div className='login'>

            <form className='login-form'
            >


                <div className="login-text">
                    <h2>Welcome back</h2>
                    <p> please log in to your account</p>
                </div>


                <div className="inputs">

                  
                    <input type="email" placeholder='Enter your email' required 
                

                    />

                 

                    <input type="password" placeholder='Enter your password' required
                       

                    />


                    <button>Login</button>

                    <p className='form-link-para' >Dont have an account ? <Link className='form-link-para-link' to="/register">Register</Link> </p>
                </div>


            </form>

            
</div>
        </>

   )
 }
 
 export default Login
 