import Link from 'next/link';
import React from 'react';

export default function Custom404() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center bg-slate-50'>
      <Link className='mb-5 text-3xl font-extrabold uppercase' href='/'>
        Accessibilator
      </Link>
      <h1 className='mb-3 text-2xl'>
        Hi there, It seems we may have lost you!
      </h1>
      <p className='mb-2 text-xl'>
        Or you may yo have followed a link that is no longer valid.
      </p>
      <Link className='text-lg text-yellow-800 underline' href={'/'}>
        Click here to return to our homepage
      </Link>
    </main>
  );
}
