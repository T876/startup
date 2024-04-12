import React from 'react';

export function Login() {
  return (
    <main className='container-fluid text-center'>
      <h1>Welcome to MyRPGVisual!</h1>
      <h5>Sign In:</h5>
      <div id="create-account-form">
          <div className="mb-3">
            <label for="signinUsername" className="form-label">Username</label>
            <input required type="email" className="form-control" id="signinUsername" aria-describedby="emailHelp"></input>
          </div>
          <div className="mb-3">
            <label for="signinPassword" className="form-label">Password</label>
            <input required type="password" className="form-control" id="signinPassword"></input>
          </div>
          <button onclick="authenticateUser()" className="btn btn-primary centered" id="login-button">Submit</button>
          <a href="./HTML/create-account.html">
              <button type="button" className="btn btn-secondary">Create Account</button>
          </a>
          <div id="authError">
          </div>
      </div>
    </main>
  );
}