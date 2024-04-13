import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: 'ada.schoen@ethereal.email',
    pass: 'bQ5QN9V1u7492bjBVb',
  },
});

async function sendMail(email,subject,text) {
    await transporter.sendMail({
        from: 'umashankarp33@gmail.com',
        to: email,
        subject: subject,
        text:text
    })
}

export default sendMail;