const nodemailer = require('nodemailer')
const { USER_ROLES } = require('./enums')
const { SMTP_USER, SMTP_PASS, SMTP_PORT, SMTP_HOST, DEVELOPER_EMAIL } = process.env

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS
  }
})

async function sendEmailToTheDeveloper (data) {
  await transporter.sendMail({
    from: '"SchedulerApp 👻" <scheduler@example.com>', // sender address
    to: DEVELOPER_EMAIL, // list of receivers
    subject: 'Issue! ✔', // Subject line
    text: data.message, // plain text body
    html: `<pre>${JSON.stringify(data)}</pre>` // html body
  })
}

function isAdmin (req) {
  return req.verified.type === USER_ROLES.admin
}

module.exports = {
  sendEmailToTheDeveloper,
  isAdmin
}
