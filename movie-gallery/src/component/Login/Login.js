import { useState } from 'react';
import * as style from '../Login/Login.Module.css'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const loginSubmitHandler = (e) => {
    e.preventDefault();
  }

  const usernameChangeHandler = () => {
    setUsername(username);
  };

  const passwordChangeHandler = () => {
    setPassword(password);
  };

  return (
    <div id="login" style={style}>
      <h1>
        <strong>Welcome.</strong> Please login.
      </h1>
      <form onSubmit={loginSubmitHandler}>
        <fieldset>
          <p>
            <label htmlFor="Username">User name:</label>
            <input type="text" name="username" value={username} onBlur={usernameChangeHandler} placeholder="Username" />
          </p>
          <p>
            <label htmlFor="Password">Password:</label>
            <input type="password" name="password" value={password} onBlur={passwordChangeHandler} placeholder="Password"  />
          </p>          
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
