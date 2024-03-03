export function Footer() {
  return (
    <footer className='flex flex-col md:flex-row items-center justify-center bg-stone-900 text-xs lg:text-sm p-10'>
      <div className='flex flex-col sm:flex-row'>
        <p className='text-gray-100 text-center sm:mr-1'>
          Copyright © 2024 Clube Adoradores.
        </p>
        <p className='text-gray-100 text-center sm:mr-1'>
          Todos os direitos reservados.
        </p>
      </div>
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
