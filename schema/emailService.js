import nodemailer from 'nodemailer';

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',  // you can use other services like SMTP
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password',  // Consider using environment variables for sensitive info
  },
});

export const sendConfirmationEmail = (email, fullName) => {
  const mailOptions = {
    from: 'your-email@gmail.com',
    to: email,
    subject: 'Reservation Confirmation',
    text: `Dear ${fullName},\n\nYour reservation has been successfully confirmed.\n\nThank you for booking with us!`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error occurred while sending email:', error);
    } else {
      console.log('Email sent successfully:', info.response);
    }
  });
};
