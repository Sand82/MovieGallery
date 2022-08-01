import { useState } from 'react';
import * as style from '../Login/Login.Module.css'

const Login = () => {
  const [login, setLogin] = useState({
    username: '',
    password: '',
  });

  const changeHandler = (e) => {    
    setLogin(state => ({
      ...state,
      [e.target.name]: e.target.value
    }))
    console.log(login);
  } 

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const response = await fetch('https://localhost:7222/api/users/login', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(login)
    }); 

    const result = await response.json();
    console.log(result);
    
    if (response.ok) {
      
      console.log(result);
    }else {
      console.log(result);
    }   
  }

  return (
    <div id="login" style={style}>
      <h1>
        <strong>Welcome.</strong> Please login.
      </h1>
      <form onSubmit={onSubmitHandler}>
        <fieldset>
          <p>
            <label htmlFor="username">User name:</label>
            <input type="text" name="username" value={login.username} onChange={changeHandler} placeholder="Username" />            
          </p>
          <p className="alert alert-danger">User name is not valid.</p>
          <p>
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" value={login.password} onChange={changeHandler} placeholder="Password"  />
          </p>    
          <p className="alert alert-danger">Password is not valid.</p>      
          <p>
            <input type="submit" defaultValue="Login" />
          </p>
        </fieldset>
      </form>
      <p>
        <span className="btn-round">or</span>
      </p>
      <p>
        <a className="facebook-before">
          <span className="fontawesome-facebook" />
        </a>
        <button className="facebook">Login Using Facbook</button>
      </p>
      <p>
        <a className="twitter-before">
          <span className="fontawesome-twitter" />
        </a>
        <button className="twitter">Login Using Twitter</button>
      </p>
    </div>
  );
};

export default Login;
