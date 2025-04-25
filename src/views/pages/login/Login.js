import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login, checkAuthentication } from '../../../actions/authActions'
import { useNavigate } from 'react-router-dom'
import logo from '../../../assets/images/logo.png'
import { toast } from 'react-toastify'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isAuthenticated } = useSelector((state) => state.auth)

  const handleLogin = async (e) => {
    e.preventDefault()
    await dispatch(login(username, password))
    dispatch(checkAuthentication())
    if (isAuthenticated) {
      navigate('/')
    } else {
      toast.error('Invalid username or password')
    }
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card-group">
              <div className="card p-4">
                <div className="card-body">
                  <form onSubmit={handleLogin}>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="bi bi-person"></i>
                        </span>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Username"
                        autoComplete="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                    <div className="input-group mb-4">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="bi bi-lock"></i>
                        </span>
                      </div>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <button type="submit" className="btn btn-primary px-4">
                          Login
                        </button>
                      </div>
                      <div className="col-6 text-right">
                        <button type="button" className="btn btn-link px-0">
                          Forgot password?
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div
                className="card text-white bg-primary py-5 d-none d-md-flex align-items-center justify-content-center"
                style={{ width: '44%' }}
              >
                <img src={logo} alt="Logo" className="w-50" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
