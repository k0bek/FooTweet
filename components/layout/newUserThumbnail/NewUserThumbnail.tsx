import { useModalStore } from '@/hooks/useStore'
import { Button } from '@/components/Button'

const NewUserThumbnail = () => {
  const [handlIsAuthModalOpen] = useModalStore((state) => [state.handleIsAuthModalOpen])

  return (
    <div className="relative hidden w-full max-w-[29rem] flex-col items-center gap-7 rounded-2xl bg-gray-800 p-10 text-white xl:flex">
      <div>
        <p className="mb-3 text-4xl font-bold">New on FooTweet?</p>
        <span className="text-xl">Log in or sign up now to create your own personalized timeline!</span>
      </div>
      <Button type="submit" size="lg" theme="white" onClick={handlIsAuthModalOpen}>
        Login
      </Button>
    </div>
  )
}

export default NewUserThumbnail
