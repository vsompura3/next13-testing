import { connect } from '@/config/db'
import User from '@/models/user.model'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'

connect()

export async function POST(request: NextRequest) {
  try {
    const req = await request.json()
    console.log(req) //! For debugging purposes only
    const { email, password } = req

    // Check if user already exists
    const user = await User.findOne({ email })
    if (!user) {
      return NextResponse.json(
        { error: 'User does not exist' },
        { status: 400 },
      )
    }
    // Check if the password is valid
    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
      return NextResponse.json({ error: 'Incorrect password' }, { status: 400 })
    }
    // Create token data
    const tokenData = {
      id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
    }
    // Create token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: '1d',
    })
    const res = NextResponse.json({
      message: 'Logged in successfully.',
      success: true,
      token,
    })
    res.cookies.set('token', token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24,
    })
    return res
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
