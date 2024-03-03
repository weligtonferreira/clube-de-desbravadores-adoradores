import { Poppins } from 'next/font/google';

import { Form } from '@/components/form';

const poppings = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
});

export default function Home() {
  const actualYear = new Date().getFullYear();

  return (
    <main className='flex items-center justify-center px-3 py-9'>
      <section className='w-full max-w-6xl flex-col items-center justify-center p-2'>
        <header>
          <h1
            className={`${poppings.className} text-center mb-3 text-4xl leading-normal lg:text-5xl`}
          >
            INSCRIÇÃO <span style={{ color: '#ff8326' }}>{actualYear}</span>
          </h1>
        </header>

        <br />

        <Form />
      </section>
    </main>
  );
}
