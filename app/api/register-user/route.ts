import { supabaseAdmin } from '@/lib/supabase/admin'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const supabase = supabaseAdmin
  const { phone, email, password, name, role } = await req.json()

  try {
    const { data, error } = await supabase.auth.admin.createUser({
      phone,
      email,
      password,
      phone_confirm: true,
      email_confirm: true,
      user_metadata: {
        display_name: name,
        role
      }
    })
    if (error)
      return NextResponse
        .json({
          error: error.message
        }, { status: 500 })

    return NextResponse
      .json({
        user_id: data.user.id,
      })
  } catch (error) {
    return NextResponse
      .json({ error: (error as any).message }, { status: 500 })
  }
}