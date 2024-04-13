import React from 'react';
import { useNavigate } from 'react-router-dom';

export function CreateAccount({setAuthState, setUsername}) {
  const [username, setUsernameLocal] = React.useState(undefined);
  const [password, setPassword] = React.useState(undefined);
  const [email, setEmail] = React.useState(undefined);
  const [authError, setAuthError] = React.useState(undefined);

  const navigate = useNavigate();

  async function createAccount() {
    let disposable = await validateEmail(email);
    if (disposable) {
        console.log('nice try');
        return;
    }
    
    const response = await fetch(`/app/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password,
            email: email
        }),
    })
    
    if (response.ok) {
      setUsername(username);
      setAuthState(true);
      navigate('/library');
    } else {
        const body = await response.json();
        setAuthError(body.error);
    }
  }

  async function validateEmail(email) {
    const response = await fetch(`https://www.disify.com/api/email/${email}`);
    let isValid = await response.json();
    return isValid.disposable;
  }


  return (
    <main className='container-fluid text-center'>
      <h4>Sign Up</h4>
      <div className="mb-3">
          <label for="signupUsername" className="form-label">Username</label>
          <input 
            type="text" 
            className="form-control" 
            id="signupUsername" 
            aria-describedby="emailHelp" 
            onChange={(v) => setUsernameLocal(v.target.value)}
          />
      </div>
      <div className="mb-3">
        <label for="signupEmail" className="form-label">Email</label>
        <input 
          type="email" 
          className="form-control" 
          id="signupEmail" 
          aria-describedby="emailHelp"
          onChange={(v) => setEmail(v.target.value)}
        />
        </div>
      <div className="mb-3">
        <label for="signupPassword" className="form-label">Password</label>
        <input 
          type="password" 
          className="form-control" 
          id="signupPassword"
          onChange={(v) => setPassword(v.target.value)} 
        />

      { authError && 
          <div id="authError">
            <p>{authError}</p>
          </div>
        }
      </div>
      <button onClick={() => createAccount()} type="submit" class="btn btn-primary">Submit</button>
    </main>
  );
}