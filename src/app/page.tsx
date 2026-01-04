import { redirect } from 'next/navigation';

// Home page for multiplatform app
// for now we have only the store platform
export default async function HomePage() {
  redirect('/store');
}
