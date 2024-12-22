import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail } from 'lucide-react';

const confirmationSchema = z.object({
  code: z.string().length(6, 'Code must be 6 characters long'),
});

type ConfirmationForm = z.infer<typeof confirmationSchema>;

export default function AccountConfirmation() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [email, setEmail] = useState('useradress@gmail.com'); // Replace with dynamic email logic
  const [isResending, setIsResending] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ConfirmationForm>({
    resolver: zodResolver(confirmationSchema),
  });

  const onSubmit = async (data: ConfirmationForm) => {
    try {
      console.log('Confirmation code submitted:', data.code);
      // TODO: Implement actual confirmation logic
    } catch (error) {
      console.error('Confirmation failed:', error);
    }
  };

  const resendCode = async () => {
    setIsResending(true);
    try {
      console.log('Resending code to:', email);
      // TODO: Implement actual resend code logic
      alert('A new code has been sent to your email.');
    } catch (error) {
      console.error('Resend failed:', error);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="flex justify-center">
            <Mail className="h-12 w-12 text-indigo-600" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Account Confirmation
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter the confirmation code sent to <span className="font-medium">{email}</span>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <input
                {...register('code')}
                type="text"
                placeholder="Enter confirmation code"
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.code && <p className="mt-1 text-sm text-red-600">{errors.code.message}</p>}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isSubmitting ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                'Confirm Account'
              )}
            </button>
          </div>
        </form>
        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={resendCode}
            disabled={isResending}
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            {isResending ? 'Resending...' : "Didn't receive a code? Resend the code!"}
          </button>
        </div>
      </div>
    </div>
  );
}
