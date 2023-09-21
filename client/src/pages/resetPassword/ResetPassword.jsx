import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { makeRequest } from "../../axios";

const ResetPassword = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [input, setInput] = useState({
    password: '',
  });
  const location = useLocation();
  const search = location.search;
  const token = new URLSearchParams(search).get("token");
  const email = new URLSearchParams(search).get("email");

  const handleChange = (e) => {
    setInput({ password: e.target.value })
    e.preventDefault();

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('reset password');

    console.log('input: ', input);
    mutation.mutate(input.password);

    navigate('/login')
    setInput(null)
  }

  const mutation = useMutation((updatedPassword) => {
    return makeRequest.post('/auth/reset-password', { password: updatedPassword, token, email });
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries(['passwords']);
    }
  })
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