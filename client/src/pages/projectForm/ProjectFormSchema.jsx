import * as yup from 'yup';

const requiredMessage = (field) => `${field} is required`;
const minMessage = (min) => `Must have at least ${min} characters`;
const maxMessage = (max) => `Cannot have more than ${max} characters`;

export const ProjectSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, minMessage(3))
    .max(45, maxMessage(45))
    .required(requiredMessage('Name')),
  status: yup
    .mixed()
    .oneOf([
      'Thrown',
      'Trimmed',
      'Bisqued',
      'Glazed',
      'Completed',
      'Sold/Gifted',
    ])
    .required(requiredMessage('Status')),
  clayType: yup
    .mixed()
    .oneOf(['red', 'white', 'klamathYellow', 'porcelain', 'other'])
    .required(requiredMessage('clayType')),
  weight: yup
    .number()
    .min(0, minMessage(3))
    .max(255, maxMessage(255))
    .required(requiredMessage('Weight (lbs)')),
  size: yup
    .string()
    .min(1, minMessage(1))
    .max(45, maxMessage(45))
    .required(requiredMessage('Size')),
  handbuilt: yup.bool(),
  location: yup
    .mixed()
    .oneOf(['Home', 'Studio'])
    .required(requiredMessage('Location')),
  firing: yup.string().min(1, minMessage(1)).max(45, maxMessage(45)),
  glazing: yup.string().min(1, minMessage(1)).max(45, maxMessage(45)),
  notes: yup.string().min(1, minMessage(1)).max(500, maxMessage(500)),
});

export const options = {
  status: [
    { label: 'Thrown', value: 'Thrown' },
    { label: 'Trimmed', value: 'Trimmed' },
    { label: 'Bisqued', value: 'Bisqued' },
    { label: 'Glazed', value: 'Glazed' },
    { label: 'Completed', value: 'Completed' },
    { label: 'Sold / Gifted', value: 'Sold/Gifted' },
  ],
  clayType: [
    { label: 'Red', value: 'red' },
    { label: 'White', value: 'white' },
    { label: 'Klamath Yellow', value: 'klamathYellow' },
    { label: 'Porcelain', value: 'porcelain' },
    { label: 'Other', value: 'other' },
  ],
  location: [
    { label: 'Home', value: 'Home' },
    { label: 'Studio', value: 'Studio' },
  ],
};
