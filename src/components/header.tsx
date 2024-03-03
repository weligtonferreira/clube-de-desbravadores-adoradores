import Image from 'next/image';

import AdoradoresLogo from '../../public/adoradores-logo.jpeg';

export function Header() {
  return (
    <header className='w-full flex flex-col p-2 items-center justify-center bg-white border'>
      <Image
        src={AdoradoresLogo}
        alt='Logo Clube Adoradores'
        className='w-20 lg:w-24'
      />
      <figcaption className='text-xs lg:text-sm text-center italic text-slate-500'>
        Clube Adoradores
      </figcaption>
    </header>
  );
}
