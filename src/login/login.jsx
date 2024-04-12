import React from 'react';
import { useNavigate } from 'react-router-dom';

export function Login({ authState, setAuthState, setUsername}) {
  const [username, setUsernameLocal] = React.useState(undefined);
  const [password, setPassword] = React.useState(undefined);
  const [authError, setAuthError] = React.useState(undefined);
  const navigate = useNavigate();

  async function authenticateUser() {
    const response = await fetch(`/app/login/${username}/${password}`);
    let user = await response.json();
    if (user.isAuthenticated) {
        // TODO: Replace this with a auth cookie, authenticate using the cookie on all pages that the user shouldn't access w/o logging in
        setUsername(user.username);
        setAuthState(true);
        navigate('/library');
    } else {
        setAuthError("Incorrect username and password");
    }   
  }

  return (
    <main className='container-fluid text-center'>
      <h1>Welcome to MyRPGVisual!</h1>
      <h5>Sign In:</h5>
      <div id="create-account-form">
        <div className="mb-3">
          <label for="signinUsername" className="form-label">Username</label>
          <input 
            required 
            type="email" 
            className="form-control" 
            id="signinUsername" 
            onChange={(v) => setUsernameLocal(v.target.value)}
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label for="signinPassword" className="form-label">Password</label>
          <input 
            required 
            type="password" 
            className="form-control" 
            id="signinPassword"
            onChange={(v) => setPassword(v.target.value)}
          />
        </div>
        <button onClick={() => authenticateUser()} className="btn btn-primary centered" id="login-button">Submit</button>
        <button type="button" className="btn btn-secondary">Create Account</button>
        { authError && 
          <div id="authError">
            <p>{authError}</p>
          </div>
        }
      </div>
    </main>
  );
}