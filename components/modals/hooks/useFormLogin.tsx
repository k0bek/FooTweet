import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import { useModalStore } from '@/hooks/useStore';

export const useFormLogin = () => {
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
      email: '',
      password: '',
    },
    mode: 'onTouched',
    criteriaMode: 'all',
  });

  const onSubmit = async () => {
    const { email, password } = getValues();
    setIsLoading(true);

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      let errorField: 'email' | 'password' | 'email';

      if (result.error.includes('email')) {
        errorField = 'email';
      } else {
        errorField = 'password';
      }
      setError(errorField, {
        type: 'manual',
        message: result.error,
      });
      toast.error('Unsuccessfully logged!');
    } else {
      toast.success('Successfully logged!');
      handleIsAuthModalOpen();
    }

    setIsLoading(false);
  };

  return { onSubmit, register, handleSubmit, errors, isLoading };
};
