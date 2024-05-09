import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import { AuthContext } from '../../context/authContext';
import ForgotPasswordModal from '../../components/login/ForgotPasswordModal';

const Login = () => {
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
  });

  const [err, setErr] = useState(null);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    // prevent page from restarting
    e.preventDefault();

    try {
      await login(inputs);
      navigate('/');
    } catch (err) {
      setErr(err.response.data);
    }
  };
  return (
    <>
      <h1>Pottery Log</h1>
      <Typography variant='subtitle1'>
        A tracker for all your pottery creation needs! Get started now!
      </Typography>
      <Typography variant='body2'>Don't have an account?</Typography>
      <Link to='/register'>
        <Typography variant='body2' display='block' gutterBottom>
          Register
        </Typography>
      </Link>
      <h1>Login</h1>
      <form>
        <input
          type='text'
          placeholder='Username'
          name='username'
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='Password'
          name='password'
          onChange={handleChange}
        />
        <div>
          <Link
            class='toggle-button'
            id='centered-toggle-button'
            onClick={(e) => {
              e.preventDefault();
              setOpen(true);
            }}
          >
            I forgot my password.
          </Link>
        </div>
        {err && <div>{err}</div>}
        <button onClick={handleLogin}>
          <Typography variant='button' display='block' gutterBottom>
            Login
          </Typography>
        </button>
      </form>

      <ForgotPasswordModal open={open} setOpen={setOpen} />
    </>
  );
};

export default Login;
