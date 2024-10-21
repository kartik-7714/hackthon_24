import React from 'react';

const SubmitButton = ({ isLoading, text, loadingText }) => (
  <button type="submit" disabled={isLoading}>
    {isLoading ? loadingText : text}
  </button>
);

export default SubmitButton;
