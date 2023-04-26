import {useContext, useRef} from 'react'
import classes from './ProfileForm.module.css';
import AuthContext from '../../Store/auth-context';

const ProfileForm = () => {
  const passRef = useRef();
  const authCtx = useContext(AuthContext)

  const submitHandler = (e) =>{
    e.preventDefault();
    const updatedPassword = passRef.current.value
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyB6twBfYeAK7PmDAUWyQUGA-ph0S-Qjnq4',
    {
      method:'Post',
      body:JSON.stringify({
        idToken:authCtx.token,
        password:updatedPassword,
        returnSecureToken:true
      }),
      headers:{
        'Content-Type' : 'application/json'
      }
    }).then(res=>{
      if(res.ok){
        res.json().then((data)=>{
          console.log(data)
        })
      }
    })
    passRef.current.value=''
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password' ref={passRef}>New Password</label>
        <input type='password' id='new-password' />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
