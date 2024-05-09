import * as yup from 'yup';

const requiredMessage = (field) => `${field} is required`;
const minMessage = (min) => `Must have at least ${min} characters`;
const maxMessage = (max) => `Cannot have more than ${max} characters`;

export const RegisterSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, minMessage(3))
    .max(255, maxMessage(255))
    .required(requiredMessage('Username')),
  email: yup
    .string()
    .min(3, minMessage(3))
    .max(255, maxMessage(255))
    .required(requiredMessage('Email')),
  password: yup
    .string()
    .min(3, minMessage(3))
    .max(255, maxMessage(255))
    .required(requiredMessage('Password')),
  firstName: yup
    .string()
    .min(0, minMessage(3))
    .max(255, maxMessage(255))
    .required(requiredMessage('First Name')),
});
