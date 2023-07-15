import { VariantProps, cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'flex items-center justify-center rounded-full transition-all disabled:cursor-not-allowed disabled:bg-gray-500 hover:opacity-90 py-3 font-bold cursor-pointer',
  {
    variants: {
      theme: {
        default: 'bg-transparent text-white',
        blue: 'bg-sky-500 text-white',
        black: 'text-white bg-black',
        white: 'text-black bg-white',
      },
      size: {
        default: 'text-2xl px-6',
        icon: 'text-lg px-2',
        sm: 'text-xl px-4',
        lg: 'text-3xl px-8',
        xl: 'text-5xl px-10',
        xxl: 'text-7xl px-13',
      },
    },

    defaultVariants: {
      theme: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = ({ className, children, size, theme, ...props }: ButtonProps) => {
  return (
    <button className={cn(buttonVariants({ size, theme, className }))} {...props}>
      {children}
    </button>
  )
}

export { Button, buttonVariants }

// 'rounded-full bg-sky-500 p-2 font-bold text-white transition-all hover:opacity-90': true,
