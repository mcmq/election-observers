
import { dataURLtoFile, getFileExtensionFromBase64 } from '@/lib/helpers'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const supabase = supabaseAdmin
  const { id, name, image, pob, dob, email, phone, role, password } = await req.json()

  try {
    const { data: signUpData, error: singUpError } = await supabase.auth.admin.createUser({
      email, password,
      email_confirm: true,
      user_metadata: {
        name,
        role
      }
    })
    if (singUpError)
      return NextResponse
        .json({ error: singUpError.message }, { status: 500 })

    if (signUpData.user) {
      let uploadUrl

      if (image) {
        const extension = getFileExtensionFromBase64(image)
        const filename = `${signUpData.user.id}.${extension}`
        const file = dataURLtoFile(image, filename)
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(filename, file)
        if (uploadError)
          return NextResponse
            .json({ error: uploadError.message }, { status: 500 })

        uploadUrl = uploadData.path
      }

      const { error: insertError } = await supabase.from('users').insert({
        id,
        user_id: signUpData.user?.id,
        name,
        phone,
        role,
        pob,
        dob,
        email,
        image: uploadUrl
      })

      if (insertError)
        return NextResponse
          .json({ error: insertError.message }, { status: 500 })
    }

    return NextResponse
      .json({ message: 'Registered successfully.' }, { status: 200 })
  } catch (error) {
    return NextResponse
      .json({ error: (error as any).message }, { status: 500 })
  }
}