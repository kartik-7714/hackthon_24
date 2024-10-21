import React, { useState } from 'react';
import { registerUser } from '../api/authApi';
import FormInput from './FormInput';
import SubmitButton from './SubmitButton';
import MessageDisplay from './MessageDisplay';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }
    setIsLoading(true);
    try {
      await registerUser({ username: formData.username, password: formData.password });
      setMessage('Signup successful! Please login.');
      setFormData({ username: '', password: '', confirmPassword: '' });
    } catch (error) {
      setMessage(error.response?.data?.message || 'Signup failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <h1>Signup</h1>
      <form onSubmit={handleSignup}>
        <FormInput
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <FormInput
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <FormInput
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <SubmitButton isLoading={isLoading} text="Signup" loadingText="Signing up..." />
      </form>
      <MessageDisplay message={message} />
    </div>
  );
};

export default SignupForm;
