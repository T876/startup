import React from 'react';

export function Login({ authState, setAuthState, setUsername}) {
  const [username, setUsernameLocal] = React.useState(undefined);
  const [password, setPassword] = React.useState(undefined);
  const [authError, setAuthError] = React.useState(undefined);

  function authenticateUser() {
    console.log(username)
    console.log(password)
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