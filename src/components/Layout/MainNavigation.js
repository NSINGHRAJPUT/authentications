import { Link } from 'react-router-dom';

import classes from './MainNavigation.module.css';
import { useContext } from 'react';
import AuthContext from '../../Store/auth-context';

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);
  const isLogged = authCtx.isLogged;

  const logoutHandler = (e) =>{
    e.preventDefault();
    authCtx.logOut();
  }

  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
         {!isLogged && <li>
            <Link to='/auth'>Login</Link>
          </li>}
          {isLogged && <li>
            <Link to='/profile'>Profile</Link>
          </li>}
          {isLogged &&<li>
            <Link to='/auth'><button onClick={logoutHandler}>Logout</button></Link>
          </li>}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
