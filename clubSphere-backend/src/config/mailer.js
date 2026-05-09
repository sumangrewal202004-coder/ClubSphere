// // const nodemailer = require('nodemailer');

// // const transporter = nodemailer.createTransport({
// //   service: 'gmail',
// //   auth: {
// //     user: process.env.EMAIL_USER,
// //     pass: process.env.EMAIL_PASS,
// //   },
// // });

// // // Verify connection on startup
// // transporter.verify((err, success) => {
// //   if (err) {
// //     console.error('❌ Mailer config error:', err.message);
// //     console.log('→ Check EMAIL_USER and EMAIL_PASS in your .env');
// //     console.log('→ Make sure EMAIL_PASS is a Gmail App Password, not your real password');
// //   } else {
// //     console.log('✅ Mailer ready');
// //   }
// // });

// // module.exports = transporter;

// const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//   host: 'smtp.gmail.com',  // use host instead of service
//   port: 465,
//   secure: true,
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
//   family: 4,  // force IPv4
// });

// transporter.verify((err, success) => {
//   if (err) {
//     console.error('❌ Mailer config error:', err.message);
//     console.log('→ Check EMAIL_USER and EMAIL_PASS in your .env');
//     console.log('→ Make sure EMAIL_PASS is a Gmail App Password, not your real password');
//   } else {
//     console.log('✅ Mailer ready');
//   }
// });

// module.exports = transporter;
// const { Resend } = require('resend');
// const resend = new Resend(process.env.RESEND_API_KEY);
// module.exports = resend;

// config/mailer.js
// Uses Brevo (HTTPS-based) — works on Render free tier unlike SMTP.
// Wrapped to match nodemailer's sendMail() so no other file needs to change.

const { BrevoClient, BrevoEnvironment } = require('@getbrevo/brevo');

const client = new BrevoClient({
  apiKey: process.env.BREVO_API_KEY,
  environment: BrevoEnvironment.Production,
});

const transporter = {
  sendMail: async ({ from, to, subject, html }) => {
    const result = await client.transactionalEmails.sendTransacEmail({
      sender: {
        email: process.env.EMAIL_FROM,
        name: 'ClubSphere',
      },
      to: [{ email: Array.isArray(to) ? to[0] : to }],
      subject,
      htmlContent: html,
    });
    return result;
  }
};

module.exports = transporter;