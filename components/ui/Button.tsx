import React from 'react';
import { Slot } from '@radix-ui/react-slot';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  asChild?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  asChild = false,
  className = '',
  children,
  ...props
}) => {
  const Comp = asChild ? Slot : 'button';

  const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

  const variants = {
    primary: 'bg-[#8A61FF] text-white hover:bg-[#7A51EF] focus:ring-[#8A61FF]',
    secondary: 'bg-[#FF9F87] text-white hover:bg-[#EF8F77] focus:ring-[#FF9F87]',
    outline: 'border-2 border-[#8A61FF] text-[#8A61FF] hover:bg-[#EFEAFF] focus:ring-[#8A61FF]',
    ghost: 'text-[#03010D] hover:bg-[#F8F8F8] focus:ring-[#8A61FF]',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-7 py-3.5 text-lg',
  };

  return (
    <Comp
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </Comp>
  );
};

export default Button;