const nodemailer = require('nodemailer');
const  authEmail = process.env.AUTH_EMAIL  || 'palkesh97.pk@gmail.com'
const  authPass = process.env.AUTH_PASS  || 'bekf icou yhos xuvw'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: authEmail,
    pass: authPass
  },
});


export const sendWelcomeEmail= async (user) => {
    try {
      const info = await transporter.sendMail({
        from: authEmail || 'palkesh.khatri01@gmail.com',
        to: user.email,
        subject: 'Welcome to Our initCoder',
        text: `Hello ${user.name}
        Welcome to InitCoder  we are excited to have you on board and we had love to say thank you on behalf of our whole company for chosing us.`,
      });
  
      console.log('Email sent: ', info);
    } catch (error) {
      console.error('Error sending email: ', error);
    }
  }
  