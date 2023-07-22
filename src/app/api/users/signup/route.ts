import { connect } from '@/config/db'
import { sendEmail } from '@/helpers/mailer'
import User from '@/models/user.model'
import bcrypt from 'bcryptjs'
import { NextRequest, NextResponse } from 'next/server'

connect()

export async function POST(request: NextRequest) {
  try {
    const req = await request.json()
    console.log(req) //! For debugging purposes only
    const { name, username, email, password } = req
    // Check if user already exists
    const user = await User.findOne({ email })
    if (user) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 },
      )
    }
    // Hashing the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create new user
    const newUser = new User({
      username,
      name,
      email,
      password: hashedPassword,
    })
    const savedUser = await newUser.save()

    await sendEmail({ email, emailType: 'VERIFY', userID: savedUser._id })

    return NextResponse.json(
      { message: 'User created successfully.', savedUser },
      { status: 201 },
    )
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
