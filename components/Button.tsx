import classNames from 'classnames'
import { ReactNode, ButtonHTMLAttributes } from 'react'

type ButtonAttrs = ButtonHTMLAttributes<HTMLButtonElement>
type ButtonPickedAttrs = 'type' | 'disabled' | 'className' | 'onClick'

interface ButtonProps extends Pick<ButtonAttrs, ButtonPickedAttrs> {
  children: ReactNode
  className: string
  onClick?: () => void
}

const Button = ({ children, className, onClick }: ButtonProps) => {
  return (
    <button
      className={classNames(
        {
          'rounded-full bg-sky-500 p-2 font-bold text-white transition-all hover:opacity-90': true,
        },
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
