import dotenv from 'dotenv';
dotenv.config(); 

const config = {
  email: {
    service: process.env.EMAIL_SERVICE || 'Gmail',
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
};

export default config;
