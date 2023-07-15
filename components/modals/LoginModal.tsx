import { AiOutlineClose } from 'react-icons/ai'

import { regexEmail } from '@/constants/regexEmail'
import { useModalStore } from '@/hooks/useStore'

import { Input } from '../Input'
import { useFormLogin } from './hooks/useFormLogin'
import { Button } from '../Button'

interface LoginModalProps {
  changeFormHandler: () => void
}

export default function LoginModal({ changeFormHandler }: LoginModalProps) {
  const { handleSubmit, onSubmit, register, errors, isLoading } = useFormLogin()

  const [handlIsAuthModalOpen] = useModalStore((state) => [state.handleIsAuthModalOpen])

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault()
          handleSubmit(onSubmit)()
        }
      }}
      aria-hidden="true"
      className="relative flex w-[30rem] flex-col gap-3 rounded-2xl bg-black px-10 py-20 xs:w-[40rem] sm:w-[50rem]"
    >
      <div className="flex w-full items-center justify-between">
        <h1 className="text-5xl font-bold text-white ">Login</h1>
      </div>
      <Button onClick={handlIsAuthModalOpen} size="default" className="absolute right-2 top-7 text-3xl">
        <AiOutlineClose />
      </Button>
      <label className="font-medium" htmlFor="email">
        Email address
      </label>

      <Input
        placeholder="Email address"
        type="email"
        id="email"
        register={register('email', {
          required: 'You need to enter your email.',
          pattern: {
            value: regexEmail,
            message: 'This email is invalid.',
          },
        })}
        variant="default"
        theme="black"
      />

      {errors?.email?.message && <p className="text-white">{errors?.email?.message}</p>}

      <label className="font-medium" htmlFor="password">
        Password
      </label>
      <Input
        placeholder="Password"
        type="password"
        id="password"
        register={register('password', {
          required: 'You need to enter your password.',
        })}
        variant="default"
        theme="black"
      />

      {errors?.password?.message && <p className="text-white">{errors?.password?.message}</p>}

      <div className="py-2"></div>

      <Button disabled={isLoading} type="submit" size="lg" theme="blue">
        Login
      </Button>

      <p className="mt-2 text-center text-[1.5rem] text-gray-300">
        Dont have an account?
        <button
          className={`ml-2 cursor-pointer font-semibold text-white ${isLoading ? 'cursor-not-allowed' : ''}`}
          onClick={changeFormHandler}
          disabled={isLoading}
        >
          Register
        </button>
      </p>
    </form>
  )
}
