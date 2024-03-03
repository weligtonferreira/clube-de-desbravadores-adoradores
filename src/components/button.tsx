import { Poppins } from 'next/font/google';
import { ButtonHTMLAttributes, ReactNode } from 'react';

const poppings = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
});

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

function Button({ children, ...rest }: ButtonProps) {
  return (
    <button
      className={`${poppings.style} px-8 py-1 rounded-md text-white bg-sky-600 hover:brightness-110 transition-all`}
      {...rest}
    >
      {children}
    </button>
  );
}

function ButtonSend({ children, ...rest }: ButtonProps) {
  return (
    <button
      className='px-8 py-2 text-white text-sm rounded-sm bg-sky-600 hover:bg-sky-500 transition-all'
      {...rest}
    >
      {children}
    </button>
  );
}

function ButtonClean({ children, ...rest }: ButtonProps) {
  return (
    <button
      className='px-8 py-2 text-white text-sm rounded-sm bg-red-600 hover:bg-red-500 transition-all'
      {...rest}
    >
      {children}
    </button>
  );
}

Button.Send = ButtonSend;
Button.Clean = ButtonClean;

export { Button };
