import { AiOutlineClose } from 'react-icons/ai'

import { regexEmail } from '@/constants/regexEmail'
import { useModalStore } from '@/hooks/useStore'

import { Input } from '../Input'
import { useFormRegister } from './hooks/useFormRegister'
import { Button } from '../Button'

interface RegisterModalProps {
  changeFormHandler: () => void
}

export default function RegisterModal({ changeFormHandler }: RegisterModalProps) {
  const { handleSubmit, onSubmit, register, errors, getValues, isLoading } = useFormRegister()

  const [handlIsAuthModalOpen] = useModalStore((state) => [state.handleIsAuthModalOpen])

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative flex w-[30rem] flex-col gap-3 rounded-2xl bg-black px-10 py-20 xs:w-[40rem] sm:w-[50rem]"
    >
      <div className="flex w-full items-center justify-between">
        <h1 className="text-5xl font-bold text-white ">Register</h1>
        <Button onClick={handlIsAuthModalOpen} size="default">
          <AiOutlineClose />
        </Button>
      </div>

      <label className="font-medium" htmlFor="username">
        Username
      </label>
      <Input
        placeholder="Username"
        type="text"
        id="username"
        register={register('username', {
          required: 'You need to enter your username.',
          minLength: {
            value: 5,
            message: 'Your username is too short.',
          },
        })}
        variant="default"
        theme="black"
      />

      {errors?.username?.message && <p className="text-white">{errors.username.message}</p>}

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
      {errors?.email?.message && <p className="text-white">{errors.email.message}</p>}

      <label className="font-medium" htmlFor="password">
        Password
      </label>
      <Input
        placeholder="Password"
        type="password"
        id="password"
        register={register('password', {
          required: 'You need to enter your password.',
          minLength: {
            value: 7,
            message: 'Your password is too short.',
          },
        })}
        variant="default"
        theme="black"
      />
      {errors?.password?.message && <p className="text-white">{errors?.password?.message}</p>}

      <label className="font-medium" htmlFor="repeatPassword">
        Repeat password
      </label>
      <Input
        placeholder="Repeat password"
        type="password"
        id="repeatPassword"
        register={register('repeatPassword', {
          required: 'You need to repeat your password.',
          validate: (val: string) => {
            const { password } = getValues()
            // eslint-disable-next-line security/detect-possible-timing-attacks
            if (password != val) {
              return 'Your passwords do no match'
            }
          },
        })}
        variant="default"
        theme="black"
      />

      {errors?.repeatPassword?.message && <p className="text-white">{errors?.repeatPassword?.message}</p>}

      <div className="py-2"></div>

      <Button disabled={isLoading} type="submit" size="lg" theme="blue">
        Register
      </Button>

      <p className="mt-2 text-center text-[1.5rem] text-gray-300">
        Already have an account?
        <button
          className={`ml-2 cursor-pointer font-semibold text-white ${isLoading ? 'cursor-not-allowed' : ''}`}
          onClick={changeFormHandler}
          disabled={isLoading}
        >
          Login
        </button>
      </p>
    </form>
  )
}
