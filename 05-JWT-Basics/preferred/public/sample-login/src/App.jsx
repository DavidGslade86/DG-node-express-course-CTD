import React from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import backgroundAuth from './assets/images/BW-8-BLUE-BUDDHA.jpg';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
  Avatar,
  Button,
  TextField,
  Paper,
  Box,
  Grid,
  Typography,
  InputAdornment,
  IconButton,
  Alert,
} from '@mui/material';

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#323232', //label color when focused
  },
  '& .MuiFilledInput-underline:after': {
    borderBottomColor: '#0a47b0', // Color for the underline focus
  },
  '& .MuiFilledInput-root': {
    backgroundColor: '#f7f5f5',
    '&:before': {
      // background color before focus
      borderColor: '#E0E3E7',
    },
    '&:hover:before': {
      //
      borderColor: '#B2BAC2', // color of border on hover
    },
    '&.Mui-focused:before': {
      borderColor: '#6F7E8C', // Dark grey border on focus
    },
    '&.Mui-focused': {
      // Adjusts the background color on focus
      backgroundColor: '#fbfbfb', // pure white
    },
  },
});

function App() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [loginMessage, setLoginMessage] = React.useState('');
  const [userMessage, setUserMessage] = React.useState('');
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [loginData, setLoginData] = React.useState({
    username: '',
    password: '',
  });

  const handleLoginDataChange = (field) => (e) => {
    setLoginData((prevData) => ({ ...prevData, [field]: e.target.value }));
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const apiCall = async (route, method = 'GET', body) => {
    try {
      let response;
  
      if (method === 'POST') {
        response = await axios.post(route, body);
      } else if (method === 'GET') {
        response = await axios.get(route);
      }
  
      return response.data;
    } catch (error) {
      const customErrorMessage = error
      .response?.data?.message;
      if (customErrorMessage) {
      setErrorMessage(customErrorMessage);
      } else {
      setErrorMessage('An error occurred, please try again later.');
      }
    return { error: true, message: customErrorMessage || 'An error occurred' }; // Return an error object
  }
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const bodyData = {
    username: loginData.username,
    password: loginData.password,
  };

  try {
    const apiRes = await apiCall('/api/v1/login', 'POST', bodyData);
    
    if (apiRes.error) {
      setErrorMessage(apiRes.message);
      return;
    }

    if (apiRes.success === true) {
      setLoginData({
        username: '',
        password: '',
      }); // Resetting the login data to its initial state.
      setErrorMessage('');
      setLoginMessage(`${apiRes.message}`);
    }
  } catch (error) {
    setErrorMessage(error.message); // Set error message to display for user
  }
};

  const handleGetUserMessage = async (event) => {
    event.preventDefault();

    try {
      const apiRes = await apiCall('/api/v1/hello');

      if (apiRes.error) {
        setErrorMessage(apiRes.message);
        return;
      }

      if (apiRes.success === true) {
        setErrorMessage('');
        setUserMessage(apiRes.message);
        setLoggedIn(true);
      }
    } catch (error) {
      setUserMessage(error.message);
    }
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '90vh',
        }}
      >
        <Grid container component="main" sx={{ height: '100%' }}>
          <Grid
            item
            sm={4}
            md={7}
            sx={{
              backgroundImage: `url(${backgroundAuth})`,
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) =>
                t.palette.mode === 'light'
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          ></Grid>
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            sx={{ backgroundColor: '#dff3fe' }}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, backgroundColor: '#0a47b0' }}>
                <LockOutlinedIcon sx={{ color: 'white' }} />
              </Avatar>
              <Typography component="h1" variant="h5" mb={3}>
                Sign in
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={(e) => handleSubmit(e)}
                sx={{ mt: 1 }}
              >
                <CssTextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  variant="filled"
                  autoFocus
                  onChange={handleLoginDataChange('username')}
                />
                <CssTextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  id="password"
                  variant="filled"
                  autoComplete="current-password"
                  type={showPassword ? 'text' : 'password'}
                  onChange={handleLoginDataChange('password')}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                {errorMessage && (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {errorMessage}
                  </Alert>
                )}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={[
                    {
                      '&:hover': { backgroundColor: '#3178f3' },
                    },
                    {
                      mt: 3,
                      mb: 2,
                      backgroundColor: '#0a47b0',
                    },
                  ]}
                >
                  Sign In
                </Button>
                {loginMessage && (
                  <Alert severity="success" sx={{ mb: 2 }}>
                    {loginMessage}
                  </Alert>
                )}
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleGetUserMessage}
                  sx={[
                    {
                      '&:hover': { backgroundColor: '#3178f3' },
                    },
                    {
                      mt: 3,
                      mb: 2,
                      backgroundColor: '#0a47b0',
                    },
                  ]}
                >
                  Show user message
                </Button>
                {loggedIn && (
                  <Typography component="h1" variant="h5" mb={3}>
                    {userMessage}
                  </Typography>
                )}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default App
