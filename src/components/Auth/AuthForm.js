import { useState, useRef, useContext } from 'react';

import classes from './AuthForm.module.css';
import AuthContext from '../../Store/auth-context';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const AuthForm = () => {
  const emailRef=useRef();
  const passwordRef=useRef();
  const [isLogin, setIsLogin] = useState(true);
  const [isSent,setIsSent]=useState(false);
  const authCtx = useContext(AuthContext)
  const history = useHistory();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const submitHandler=(e)=>{
    e.preventDefault();
    const email=emailRef.current.value;
    const password=passwordRef.current.value;
    console.log(email,password)
    if(isLogin){
      fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB6twBfYeAK7PmDAUWyQUGA-ph0S-Qjnq4',
      {
        method:'POST',
        body:JSON.stringify({
          email:email,
          password:password,
          returnSecureToken:true
        }),
        headers:{
          'Content-type' : 'application/json'
        }
      }
      ).then(res=>{
        if(res.ok){
          res.json().then((data)=>{
            authCtx.logIn(data.idToken);
            history.replace('/')
          })
        }else{
          res.json().then((data)=>{
            console.log(data)
          })
        }
      })
    }else{
      setIsSent(true)
      fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB6twBfYeAK7PmDAUWyQUGA-ph0S-Qjnq4',
      {
        method:'POST',
        body:JSON.stringify({email:email,
        password:password,
        returnSecureToken:true
        }),
        headers:{
          'Content-Type' : 'application/json'
        }
      }
      ).then(res =>{
        if(res.ok){

        }else{
          res.json().then((data)=>{
            console.log(data)
          })
        }
      })
      setIsSent(false)
    }
    emailRef.current.value='';
    passwordRef.current.value='';
  }
  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' ref={emailRef}  required />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            ref={passwordRef}
            type='password'
            id='password'
            required
          />
        </div>
        <div className={classes.actions}>
        <button type='submit'>{isLogin ? 'Login' : 'Create Account'}</button>
        {isSent ? 'Sending Request...' : ''}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
