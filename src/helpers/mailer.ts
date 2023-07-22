import User from '@/models/user.model'
import brcypt from 'bcryptjs'
import nodemailer from 'nodemailer'

export const sendEmail = async ({ email, emailType, userID }: any) => {
  try {
    const hashedToken = await brcypt.hash(userID.toString(), 10)

    if (emailType === 'VERIFY') {
      console.log(userID)
      const x = await User.findByIdAndUpdate(userID, {
        verifyToken: hashedToken,
        verifyTokenExpires: Date.now() + 3600000,
      })
      console.log('X: ', x)
    } else if (emailType === 'RESET') {
      await User.findByIdAndUpdate(userID, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiress: Date.now() + 3600000,
      })
    }

    const transport = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: '337b8f879930d3',
        pass: '13b463de4b75bc',
        // TODO : Add these to env variables
      },
    })

    const mailOptions = {
      from: 'vsompura3@gmail.com',
      to: email,
      subject:
        emailType === 'VERIFY' ? 'Verify your account' : 'Reset password',
      html: `
        <h1>Verify your account</h1>
        <p>Click <a href="${
          process.env.DOMAIN
        }/verifyemail?token=${hashedToken}">here</a> to ${
          emailType === 'VERIFY' ? 'Verify your account' : 'Reset password'
        }.
          copy and paste the link below in your browser
          <br />
          ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
        </p>
      `,
    }

    const mailRes = await transport.sendMail(mailOptions)
    return mailRes
  } catch (error: any) {
    throw new Error(error.message)
  }
}
