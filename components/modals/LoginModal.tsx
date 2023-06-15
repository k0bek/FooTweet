import { AiOutlineClose } from 'react-icons/ai'

import { regexEmail } from '@/constants/regexEmail'
import { useModalStore } from '@/hooks/useStore'

import { Input } from '../Input'
import { useFormLogin } from './hooks/useFormLogin'

interface LoginModalProps {
  changeFormHandler: () => void
}

export default function LoginModal({ changeFormHandler }: LoginModalProps) {
  const { handleSubmit, onSubmit, register, errors, isLoading } = useFormLogin()

  const [handlIsAuthModalOpen] = useModalStore((state) => [state.handleIsAuthModalOpen])

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative flex w-[30rem] flex-col gap-3 rounded-2xl bg-black px-10 py-20 xs:w-[40rem] sm:w-[50rem]"
    >
      <div className="flex w-full items-center justify-between">
        <h1 className="text-5xl font-bold text-white ">Login</h1>
        <button>
          <AiOutlineClose
            className="p-1 text-4xl  text-white transition-all hover:rounded-full hover:bg-gray-500"
            onClick={handlIsAuthModalOpen}
          />
        </button>
      </div>
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
        variant="auth"
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
        variant="auth"
      />

      {errors?.password?.message && <p className="text-white">{errors?.password?.message}</p>}

      <input
        className={`mt-8 rounded-full py-4 text-2xl ${
          isLoading ? 'cursor-not-allowed bg-gray-500' : 'bg-sky-500'
        } cursor-pointer font-bold text-white`}
        name="Submit"
        type="submit"
        value="Submit"
        disabled={isLoading}
      />
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
