import React from 'react';

function LoginForm({ toggleForm }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add login logic here
  };

  return (
    <div className="form login">
      <span className="title">Login</span>
      <form onSubmit={handleSubmit}>
        <div className="input-field">
          <input type="text" placeholder="Enter username or Gmail" required />
          <i className="uil uil-user icon"></i>
        </div>
        <div className="input-field">
          <input type="password" className="password" placeholder="Enter your password" required />
          <i className="uil uil-lock icon"></i>
          <i className="uil uil-eye-slash showHidePw"></i>
        </div>
        {/* Add other form elements here */}
        <div className="input-field button">
          <input type="submit" value="Login" />
        </div>
      </form>
      <div className="login-signup">
        <span className="text">Not a member?
          <a href="#" className="text signup-link" onClick={toggleForm}>Signup Now</a>
        </span>
      </div>
    </div>
  );
}

export default LoginForm;
