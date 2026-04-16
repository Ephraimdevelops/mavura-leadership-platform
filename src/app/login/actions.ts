'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function loginAction(prevState: any, formData: FormData) {
  const password = formData.get('password');
  const redirectPath = (formData.get('from') as string) || '/admin';

  const adminPassword = process.env.ADMIN_PASSWORD || 'mavura2024';

  if (password === adminPassword) {
    const cookieStore = await cookies();
    const sessionSecret = process.env.ADMIN_SESSION_SECRET || 'mavura_leadership_portal_2024_secure_token';
    cookieStore.set('mavura_admin_session', sessionSecret, {
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
