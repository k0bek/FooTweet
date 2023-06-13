import { useModalStore } from '@/hooks/useStore';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

export const useFormRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [handleIsAuthModalOpen] = useModalStore((state) => [state.handleIsAuthModalOpen]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      repeatPassword: '',
    },
    mode: 'onTouched',
    criteriaMode: 'all',
  });

  const onSubmit = async () => {
    const { username, email, password } = getValues();

    const createUser = async () => {
      setIsLoading(true);
      const response = await fetch('api/auth/sign-up', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.field, {
          type: 'manual',
          message: errorData.message,
        });
        setIsLoading(false);
        return;
      } else {
        toast.success('Successfully registered!');
        handleIsAuthModalOpen();
      }

      await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      setIsLoading(false);
    };

    createUser();
  };

  return {
    onSubmit,
    register,
    handleSubmit,
    errors,
    getValues,
    setError,
    isLoading,
  };
};
