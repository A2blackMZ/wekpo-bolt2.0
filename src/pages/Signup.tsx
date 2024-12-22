import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { UserPlus } from 'lucide-react';

const signUpSchema = z.object({
  firstname: z.string().min(1, 'First name is required'),
  lastname: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^\d{10}$/, 'Invalid phone number'),
  address: z.string().min(1, 'Address is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Please confirm your password'),
  termsAccepted: z.boolean().refine((value) => value, 'You must accept the terms and conditions'),
}).refine((data) => data.password === data.confirmPassword, {
  path: ['confirmPassword'],
  message: 'Passwords do not match',
});

type SignUpForm = z.infer<typeof signUpSchema>;

export default function SignUp() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpForm) => {
    try {
      // TODO: Implement actual sign-up logic
      console.log('User signed up:', data);
      navigate('/confirmation');
    } catch (error) {
      console.error('Sign up failed:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="flex justify-center">
            <UserPlus className="h-12 w-12 text-indigo-600" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <input
                {...register('firstname')}
                type="text"
                placeholder="First name"
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.firstname && <p className="mt-1 text-sm text-red-600">{errors.firstname.message}</p>}
            </div>
            <div>
              <input
                {...register('lastname')}
                type="text"
                placeholder="Last name"
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.lastname && <p className="mt-1 text-sm text-red-600">{errors.lastname.message}</p>}
            </div>
            <div>
              <input
                {...register('email')}
                type="email"
                placeholder="Email address"
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
            </div>
            <div>
              <input
                {...register('phone')}
                type="text"
                placeholder="Phone number"
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
            </div>
            <div>
              <input
                {...register('address')}
                type="text"
                placeholder="Address"
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>}
            </div>
            <div>
              <input
                {...register('password')}
                type="password"
                placeholder="Password"
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
            </div>
            <div>
              <input
                {...register('confirmPassword')}
                type="password"
                placeholder="Confirm password"
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>}
            </div>
          </div>

          <div className="flex items-center">
            <input
              {...register('termsAccepted')}
              type="checkbox"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900">
              I accept the terms and conditions
            </label>
          </div>
          {errors.termsAccepted && (
            <p className="mt-1 text-sm text-red-600">{errors.termsAccepted.message}</p>
          )}

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isSubmitting ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                'Sign up'
              )}
            </button>
          </div>
        </form>
        <div className="mt-2 text-center">
          <a
            href="/login"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Already have an account? Login here!
          </a>
        </div>
      </div>
    </div>
  );
}
