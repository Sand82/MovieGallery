import * as style from '../Login/Login.Module.css'

const Login = () => {
  return (
    <div id="login" style={style}>
      <h1>
        <strong>Welcome.</strong> Please login.
      </h1>
      <form action="#" method="get">
        <fieldset>
          <p>
            <input
              type="text"
              required=""
              defaultValue="Username"
              placeholder="Username"
            />
          </p>
          <p>
            <input
              type="password"
              required=""
              defaultValue="Password"
              placeholder="Password"
            />
          </p>
          <p>
            <a href="#">Forgot Password?</a>
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
