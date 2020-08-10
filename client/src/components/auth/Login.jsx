import React, { useState, useContext, useEffect } from 'react';

import authContext from '../../context/auth/authContext';
import alertContext from '../../context/alert/alertContext';

const Login = (props) => {
  const { login, error, clearErrors, isAuthenticated } = useContext(
    authContext
  );

  const { setAlert } = useContext(alertContext);

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    // if the user is authenticated redirect to home page
    if (isAuthenticated) {
      props.history.push('/');
    }

    if (error === 'Invalid Email or Password.') {
      setAlert(error, 'danger');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const { email, password } = user;

  const handleChange = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      setAlert('Please fill all Fields', 'danger');
    } else {
      login({
        email,
        password,
      });
    }
  };

  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Login</span>
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            required
          />
        </div>
        <input
          type="submit"
          value="Login"
          className="btn btn-primary btn-block"
        />
      </form>
    </div>
  );
};

export default Login;
