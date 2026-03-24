'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function loginAction(prevState: any, formData: FormData) {
  const password = formData.get('password');
  const redirectPath = (formData.get('from') as string) || '/admin';

  if (password === process.env.ADMIN_PASSWORD) {
    const cookieStore = await cookies();
    cookieStore.set('mavura_admin_session', process.env.ADMIN_SESSION_SECRET as string, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });
    
    redirect(redirectPath);
    return { success: true };
  } else {
    return { error: 'Invalid Credentials. Access Denied.' };
  }
}
