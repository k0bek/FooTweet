import LoginModal from './LoginModal'
import RegisterModal from './RegisterModal'
interface ModalProps {
  isLoginForm: boolean
  changeFormHandler: () => void
}

const Modal = ({ isLoginForm, changeFormHandler }: ModalProps) => {
  return (
    <div className="z-100 fixed left-0 top-0 flex h-full w-full flex-col items-center justify-center overflow-hidden bg-black bg-opacity-30 px-5">
      {isLoginForm ? (
        <LoginModal changeFormHandler={changeFormHandler} />
      ) : (
        <RegisterModal changeFormHandler={changeFormHandler} />
      )}
    </div>
  )
}

export default Modal
