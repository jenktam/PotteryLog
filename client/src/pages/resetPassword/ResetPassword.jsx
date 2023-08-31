import React, { useState } from 'react';

const ResetPassword = () => {
  const [input, setInput] = useState({
    password: '',
  })
  const handleChange = (e) => {
    e.preventDefault();

  };

  const handleSubmit = (e) => {
    e.preventDefault();

  }
  return (
    <>
      <div>
        Reset Password page!
      </div>
      {/* dont need below if already passed correct token in query params */}
      {/* <input placeholder="Enter Code" value={code} /> */}
      <input type="password" name="password" placeholder="New Password" onChange={handleChange}/>
      <button onClick={handleSubmit}>Submit</button>
    </>
  )
}
export default ResetPassword;