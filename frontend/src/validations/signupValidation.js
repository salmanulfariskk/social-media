import * as yup from 'yup';

const passwordRule = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&])[a-zA-Z\d@#$%^&]{8,}$/;

export const userSchema = yup.object().shape({
    name: yup
        .string()
        .min(2, 'Name must be at least 2 characters')
        .max(20)
        .matches(/^[a-zA-Z]+(\s[a-zA-Z]+)?$/, 'Only alphabets and one space are allowed')
        .required('Required'),

    email: yup
        .string()
        .email('Please enter a valid email')
        .required('Required'),

    password: yup
        .string()
        .matches(
            passwordRule,
            'Password must contain at least 8 characters, one capital letter, one small letter, one number, and one special character (@#$%^&)'
        )
        .required('Required'),

    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Password must match')
        .required('Required'),
});
