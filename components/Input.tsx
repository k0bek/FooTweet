import { VariantProps, cva } from 'class-variance-authority'
import { InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import { UseFormRegisterReturn } from 'react-hook-form'

const inputVariants = cva(
  'rounded-md border-2 outline-none transition focus:border-2 disabled:cursor-not-allowed disabled:opacity-70',
  {
    variants: {
      variant: {
        default: 'border-neutral-800 p-4 text-xl',
        secondary: 'w-full p-4 text-xl',
      },
      theme: {
        black: 'bg-black text-white focus:border-sky-500 disabled:bg-neutral-900',
        white: 'border-neutral-200 bg-white text-yellow focus:border-sky-500',
      },
    },
    defaultVariants: {
      variant: 'default',
      theme: 'black',
    },
  }
)

interface InputProps extends InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof inputVariants> {
  register?: UseFormRegisterReturn
}

const Input = ({ className, variant, theme, register, ...props }: InputProps) => {
  return <input className={cn(inputVariants({ variant, theme, className }))} {...props} {...register} />
}
export { Input, inputVariants }
