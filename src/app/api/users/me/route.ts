import { connect } from '@/config/db'
import { getDataFromToken } from '@/helpers/getDataFromToken'
import User from '@/models/user.model'
import { NextRequest, NextResponse } from 'next/server'

connect()

export async function GET(request: NextRequest) {
  try {
    const userID = await getDataFromToken(request)
    const user = await User.findById({ _id: userID }).select(
      '-password -isVerified -isAdmin',
    )
    return NextResponse.json(user, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
