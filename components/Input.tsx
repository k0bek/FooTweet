import { VariantProps, cva } from 'class-variance-authority'
import { InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import { UseFormRegisterReturn } from 'react-hook-form'

const inputVariants = cva(
  'rounded-md border-2 outline-none transition focus:border-2 disabled:cursor-not-allowed disabled:opacity-70',
  {
    variants: {
      variant: {
        auth: 'border-neutral-800 bg-black p-4 text-xl text-white focus:border-sky-500 disabled:bg-neutral-900',
        changeInfo: 'w-full border-neutral-200 bg-white p-4 text-xl text-black focus:border-sky-500',
        // authSubmit:
        //   'mt-8 rounded-full py-4 text-2xl cursor-pointer font-bold text-white bg-sky-500 disabled:bg-gray-500',
      },
      defaultVariants: {
        variant: 'default',
      },
    },
  }
)

interface inputProps extends InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof inputVariants> {
  register?: UseFormRegisterReturn
}

const Input = ({ className, variant, register, ...props }: inputProps) => {
  return <input className={cn(inputVariants({ variant, className }))} {...props} {...register} />
}

export { Input, inputVariants }
