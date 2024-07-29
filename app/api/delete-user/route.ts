
import { getFileExtensionFromBase64 } from '@/lib/helpers'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const supabase = supabaseAdmin
  const { id } = await req.json()

  try {
    const { error: deleteUserError } = await supabase
      .auth
      .admin
      .deleteUser(id)
    if (deleteUserError)
      return NextResponse
        .json({ error: deleteUserError.message }, { status: 500 })

    const { error: deleteRowError } = await supabase
      .from('users')
      .delete()
      .eq('user_id', id)

    if (deleteRowError)
      return NextResponse
        .json({ error: deleteRowError.message }, { status: 500 })

    return NextResponse
      .json({ message: 'Deleted successfully.' }, { status: 200 })
  } catch (error) {
    return NextResponse
      .json({ error: (error as any).message }, { status: 500 })
  }
}