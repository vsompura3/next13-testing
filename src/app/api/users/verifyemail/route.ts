import { connect } from '@/config/db'
import User from '@/models/user.model'
import { NextRequest, NextResponse } from 'next/server'

connect()

export async function POST(request: NextRequest) {
  try {
    const req = await request.json()
    const { token } = req
    console.log(token)
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpires: { $gt: Date.now() },
    })

    console.log(user)
    if (!user) {
      return NextResponse.json(
        { message: 'Token is invalid or has expired' },
        { status: 400 },
      )
    }
    user.isVerified = true
    user.verifyToken = undefined
    user.verifyTokenExpires = undefined
    await user.save()
    return NextResponse.json(
      { message: 'Account verified successfully', success: true },
      { status: 200 },
    )
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
