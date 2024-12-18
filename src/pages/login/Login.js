import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  InputAdornment,
  Box,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import loginValidationSchema from './loginValidationSchema';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Api_Status } from '../../components/common/utils';
import { loginUser } from '../../slices/loginSlice';
import Cookies from 'universal-cookie';


const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, status } = useSelector((state) => state.login);  

  const [isOTP, setIsOTP] = React.useState(false);

  useEffect(() => { 
    if (status === Api_Status.Succeeded) {
      console.log('User:', user);
      const User = {
        email: user.officeEmailId,
      }
      const cookies = new Cookies(null, { path: '/' });
      cookies.set('user', User);

    }
  }, [status, user]);

  const initialState = {
    email: '',
    password: '', 
    otp: '',
  }


  const formik = useFormik({
    initialValues: initialState,
    validationSchema: loginValidationSchema,
    onSubmit: (values) => {
      if (isOTP) {
        console.log('OTP: ', values.otp);
        navigate('/dashboard');
      }
      console.log('Email: ', values.email);
      console.log('Password', values.password);
      dispatch(loginUser(values));  
      setIsOTP(!isOTP); 
    },  

  }); 


  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor: 'background.paper',
      }}
    >
      <Grid container justifyContent="center">
        <Grid item size={{ md: 8 }}>
          <Grid container spacing={2}>
            <Grid item size={{ xs: 12, md: 6 }}>
              <Card
                sx={{
                  backgroundColor: 'primary.main',
                  color: 'white',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                }}
              >
                <CardContent sx={{ textAlign: 'center' }}>
                  <Box>
                    <Typography variant="h4" gutterBottom>
                      Welcome to DataBrain
                    </Typography>
                    <Typography variant="body2" mt={2}>
                      Etiam porta non velit quis pharetra. Phasellus in egestas arcu. Pellentesque sit amet dolor auctor dolor lobortis congue.
                      Ut scelerisque cursus quam, vitae elementum ligula. Cras ac nibh nibh. Fusce laoreet ipsum sed dui tempor pharetra at
                      ullamcorper dui.Morbi eget nisi est. Aliquam efficitur velit nec blandit lacinia. Nunc dapibus pretium neque, vel
                      tincidunt ex eleifend vitae. Praesent tincidunt eu quam nec auctor. Proin velit mi, consectetur sed nunc ac, lacinia
                      lacinia arcu.
                    </Typography>
                  </Box>
                  {/* <Button
                    component={Link}
                    // to="/register"
                    variant="contained"
                    color="secondary"
                  >
                    Register Now!
                  </Button> */}
                </CardContent>
              </Card>
            </Grid>
            <Grid item size={{ xs: 12, md: 6 }}>
              <Card>
                <CardContent>
                  <Typography variant="h4" gutterBottom>
                    Login
                  </Typography>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    Sign in to your account
                  </Typography>
                  <Box component="form" onSubmit={formik.handleSubmit} noValidate>
                    {
                      isOTP ? (
                        <TextField
                          fullWidth
                          id="otp"
                          name='otp'
                          margin="normal"
                          placeholder="OTP"
                          autoComplete="one-time-code"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <LockIcon />
                              </InputAdornment>
                            ),
                          }}
                          value={formik.values.otp}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={formik.touched.otp && Boolean(formik.errors.otp)}
                          helperText={formik.touched.otp && formik.errors.otp || ' '}
                        />
                      ) : (
                        <>
                          <TextField
                            fullWidth
                            id='email'
                            name='email'  
                            margin="normal"
                            placeholder="Email"
                            autoComplete='email'
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <PersonIcon />
                                </InputAdornment>
                              ),
                            }}
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email || ' '}
                          />
                          <TextField
                            fullWidth
                            id='password'
                            name='password'
                            margin="normal"
                            type="password"
                            placeholder="Password"
                            autoComplete='current-password'
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <LockIcon />
                                </InputAdornment>
                              ),
                            }}
                            value={formik.values.password}  
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password || ' '}
                          />

                        </>
                      )
                    }

                    <Grid container spacing={2} alignItems="center">
                      <Grid item size={{ xs: 6 }}>
                        <Button
                        type='submit'
                          variant="contained"
                          color="primary"
                          fullWidth
                          
                        >
                          {isOTP ? 'Submit OTP' : 'Login'}  
                        </Button>
                      </Grid>
                      <Grid item size={{ xs: 6 }} textAlign="right">
                        {
                          isOTP && (
                            <Button
                              type='button'
                              variant="contained"
                              color="primary"
                            >
                              Generate OTP
                            </Button>
                          ) 
                        }
                        {/* <Button type='button' variant={isOTP ? "contained" : "text"} color="primary">
                          {isOTP ? 'Generate OTP' : 'Forgot Password?'}
                        </Button> */}
                      </Grid>
                    </Grid>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;
