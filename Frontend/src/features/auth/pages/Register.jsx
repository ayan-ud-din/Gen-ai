import React from 'react'
import {Link,useNavigate} from 'react-router'

const Register = () => {
  return (
   <>
     <div className='login'>

            <form className='login-form'
            >


                <div className="login-text">
                    <h2>Welcome </h2>
                    <p>Sign Up to create your account</p>
                </div>


                <div className="inputs">

                    <input type="text" placeholder='Enter your Username' required 
                

                    />
                    <input type="email" placeholder='Enter your email' required 
                

                    />

                 

                    <input type="password" placeholder='Enter your password' required
                       

                    />


                    <button>Register</button>

                    <p className='form-link-para' >Already have an account ? <Link className='form-link-para-link' to="/login">Login</Link> </p>
                </div>


            </form>

            
</div>
   </>
  )
}

export default Register
