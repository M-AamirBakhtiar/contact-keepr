import React, { useState, useContext, useEffect } from 'react';
import authContext from '../../context/auth/authContext';
import alertContext from '../../context/alert/alertContext';

const Register = (props) => {
  const { register, error, clearErrors, isAuthenticated } = useContext(
    authContext
  );

  const { setAlert } = useContext(alertContext);

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  useEffect(() => {
    // if the user is authenticated redirect to home page
    if (isAuthenticated) {
      props.history.push('/');
    }

    if (error === 'User already exists') {
      setAlert(error, 'danger');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const { name, email, password, passwordConfirm } = user;

  const handleChange = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name === '' || email === '' || password === '') {
      setAlert('Please enter all Fields', 'danger');
    } else if (password !== passwordConfirm) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({
        name,
        email,
        password,
        passwordConfirm,
      });
    }
  };

  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Register</span>
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            required
          />
        </div>
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
            minLength="6"
          />
        </div>
        <div className="form-group">
          <label htmlFor="passwordConfirm">Confirm Password</label>
          <input
            type="password"
            name="passwordConfirm"
            value={passwordConfirm}
            onChange={handleChange}
            required
          />
        </div>
        <input
          type="submit"
          value="Register"
          className="btn btn-primary btn-block"
        />
      </form>
    </div>
  );
};

export default Register;
