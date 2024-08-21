import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '../../axios';

const ForgotPasswordModal = ({ open, setOpen }) => {
  const queryClient = useQueryClient();
  const [email, setEmail] = useState('');

  const mutation = useMutation(
    (email) => {
      return makeRequest.post('/auth/forgot-password', email);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['passwords']);
      },
    }
  );

  const onClose = (e) => {
    setOpen(false);
  };

  const handleSendConfirmationCode = (e) => {
    e.preventDefault();
    mutation.mutate({ email });

    setEmail(''); // Reset email after email sent so doesn't show up in UI afterward
  };

  const handleChange = (e) => {
    setEmail((prev) => e.target.value);
  };

  if (!open) return null;

  return (
    <div class='modal' id='modal'>
      <h2>Reset Password</h2>
      <input
        type='text'
        name='email'
        placeholder='Email'
        value={email}
        onChange={handleChange}
      />
      <button onClick={handleSendConfirmationCode}>
        Send confirmation code
      </button>
      {mutation.isError && <div>{mutation.error.response.data}</div>}
      {mutation.isSuccess && <div>{mutation.data.data.message}</div>}
      <div class='actions'>
        <button class='toggle-button' onClick={onClose}>
          close
        </button>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
