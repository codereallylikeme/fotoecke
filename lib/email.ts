import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 587,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function sendBookingEmail(booking: {
  email: string
  name: string
  date: string // already ISO string from serializeDoc
  eventType: string
}) {
  const { email, name, date, eventType } = booking

  const mailOptions = {
    from: `"PhotoBooth" <${process.env.SMTP_USER}>`,
    to: email,
    subject: 'Booking Confirmation 🎉',
    html: `
      <h1>Thank you for your booking, ${name}!</h1>
      <p>We have reserved your <strong>${eventType}</strong> for the date: 
      <strong>${new Date(date).toLocaleDateString()}</strong>.</p>
      <p>We’ll be in touch soon with more details!</p>
    `,
  }

  await transporter.sendMail(mailOptions)
}



  
