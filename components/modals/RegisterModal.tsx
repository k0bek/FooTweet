import { AiOutlineClose } from 'react-icons/ai'

import { regexEmail } from '@/constants/regexEmail'
import { useModalStore } from '@/hooks/useStore'

import FormInput from '../FormInput'
import { useFormRegister } from './hooks/useFormRegister'

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
        <button>
          <AiOutlineClose
            className="p-1 text-4xl  text-white transition-all hover:rounded-full hover:bg-gray-500"
            onClick={handlIsAuthModalOpen}
          />
        </button>
      </div>

      <label className="font-medium" htmlFor="username">
        Username
      </label>
      <FormInput
        placeholder="Username"
        register={register('username', {
          required: 'You need to enter your username.',
          minLength: {
            value: 5,
            message: 'Your username is too short.',
          },
        })}
        type="text"
      />

      {errors?.username?.message && <p className="text-white">{errors.username.message}</p>}

      <label className="font-medium" htmlFor="email">
        Email address
      </label>
      <FormInput
        placeholder="Email address"
        register={register('email', {
          required: 'You need to enter your email.',
          pattern: {
            value: regexEmail,
            message: 'This email is invalid.',
          },
        })}
        type="email"
      />
      {errors?.email?.message && <p className="text-white">{errors.email.message}</p>}

      <label className="font-medium" htmlFor="password">
        Password
      </label>
      <FormInput
        placeholder="Password"
        register={register('password', {
          required: 'You need to enter your password.',
          minLength: {
            value: 7,
            message: 'Your password is too short.',
          },
        })}
        type="password"
      />
      {errors?.password?.message && <p className="text-white">{errors?.password?.message}</p>}

      <label className="font-medium" htmlFor="repeatPassword">
        Repeat password
      </label>
      <FormInput
        placeholder="Repeat password"
        register={register('repeatPassword', {
          required: 'You need to repeat your password.',
          validate: (val: string) => {
            const { password } = getValues()
            // eslint-disable-next-line security/detect-possible-timing-attacks
            if (password != val) {
              console.log('what you doin')
              return 'Your passwords do no match'
            }
          },
        })}
        type="password"
      />

      {errors?.repeatPassword?.message && <p className="text-white">{errors?.repeatPassword?.message}</p>}

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
