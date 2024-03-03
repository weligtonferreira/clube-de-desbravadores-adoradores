export function Footer() {
  return (
    <footer className='flex flex-col lg:flex-row items-center justify-center bg-stone-900 text-xs lg:text-sm p-10'>
      <p className='text-gray-100 text-center mr-1'>
        Copyright © 2024-2024 Clube Adoradores. Todos os direitos reservados.
      </p>
      <p className='text-gray-100 text-center'>
        Desenvolvido por{' '}
        <span className='text-cyan-600 font-bold ml-1 hover:cursor-pointer'>
          <a
            href='https://www.linkedin.com/in/weligtonferreira/'
            target='_blank'
          >
            Weligton Ferreira
          </a>
        </span>
      </p>
    </footer>
  );
}
