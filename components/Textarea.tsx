import { VariantProps, cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const textareaVariants = cva('overflow-auto resize-none rounded-2xl outline-none', {
  variants: {
    theme: {
      default: 'bg-slate-500 text-white',
    },
    size: {
      default: 'w-full sm:text-4xl p-4 text-xl sm:text-4xl',
    },
  },

  defaultVariants: {
    theme: 'default',
    size: 'default',
  },
})

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {}

const Textarea = ({ className, children, size, theme, ...props }: TextareaProps) => {
  return (
    <textarea className={cn(textareaVariants({ size, theme, className }))} {...props}>
      {children}
    </textarea>
  )
}

export { Textarea, textareaVariants }
