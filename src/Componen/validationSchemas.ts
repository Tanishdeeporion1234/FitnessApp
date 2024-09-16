import * as Yup from 'yup';

export const profileSchema = Yup.object({
  name: Yup.string().required('Enter your name').min(3, 'Name must be at least 3 characters'),
  number: Yup.string()
    .required('Enter your mobile number')
    .matches(/^[0-9]+$/, 'Must be only numbers')
    .min(10, 'Must be exactly 10 digits')
    .max(10, 'Must be exactly 10 digits'),
  position: Yup.string().required('Select your position'),
  gender: Yup.string().required('Select your gender'),
  address: Yup.string().required('Enter your address'),
  agree: Yup.boolean().oneOf([true], 'You must agree to the terms').required('Required'),
});