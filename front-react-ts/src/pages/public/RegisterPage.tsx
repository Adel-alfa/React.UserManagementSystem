

import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import type { IRegisterDto } from '../../types/authDto';
import InputField from '../../components/general/InputField';
import { yupResolver } from '@hookform/resolvers/yup';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-hot-toast';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PATH_PUBLIC } from '../../routes/path';
import Button from '../../components/general/Button';

const RegisterPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { register } = useAuth();

  const registerSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    userName: Yup.string().required('User Name is required'),
    email: Yup.string().required('Email is required').email('Input text must be a valid email'),
    password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 character'),
    address: Yup.string().required('Address Is required'),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IRegisterDto>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      userName: '',
      email: '',
      password: '',
      address: '',
    },
  });

  const onSubmitRegisterForm = async (data: IRegisterDto) => {
    try {
      setLoading(true);
      await register(data.firstName, data.lastName, data.userName, data.email, data.password, data.address);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      const err = error as { data: string; status: number };
      const { status, data } = err;
      if (status === 400 || status === 409) {
        toast.error(data);
      } else {
        toast.error('An Error occurred. Please contact admins');
      }
    }
  };

  return (
    <div className='pageTemplate1'>
      {/* <div>Left</div> */}
      <div className='max-sm:hidden flex-1 min-h-[600px] h-4/5 bg-linear-to-tr from-[#e0dfe2] via-[#dccff1] to-[#a7bbeb] flex flex-col justify-center items-center rounded-l-2xl'>
        <div className='p-6  flex flex-col gap-8 justify-center items-center bg-white/10  relative rounded-2xl'>
          <h1 className='text-6xl font-bold text-[#754eb4]'>Alfa One</h1>
         <img src="./images/Registration.png" className='rounded-2xl p-4' />
        </div>
      </div>
      {/* <div>Right</div> */}
      <form
        onSubmit={handleSubmit(onSubmitRegisterForm)}
        className='flex-1 min-h-[600px] h-4/5 bg-[#f0ecf7] flex flex-col justify-center items-center rounded-r-2xl'
      >
        <h1 className='text-4xl font-bold mb-2 text-[#754eb4]'>Register</h1>

        <InputField control={control} label='First Name' inputName='firstName' error={errors.firstName?.message} />
        <InputField control={control} label='Last Name' inputName='lastName' error={errors.lastName?.message} />
        <InputField control={control} label='User Name' inputName='userName' error={errors.userName?.message} />
        <InputField control={control} label='Email' inputName='email' error={errors.email?.message} />
        <InputField
          control={control}
          label='Password'
          inputName='password'
          inputType='password'
          error={errors.password?.message}
        />
        <InputField control={control} label='Address' inputName='address' error={errors.address?.message} />

        <div className='px-4 mt-2 mb-6 w-9/12 flex gap-2'>
          <h1>Already Have an account?</h1>
          <Link
            to={PATH_PUBLIC.login}
            className='text-[#754eb4] border border-[#754eb4] hover:shadow-[0_0_5px_2px_#754eb44c] px-3 rounded-2xl duration-200'
          >
            Log in
          </Link>
        </div>

        <div className='flex justify-center items-center gap-4 m-3'>
          <Button variant='secondary' type='button' label='Reset' onClick={() => reset()} />
          <Button variant='primary' type='submit' label='Register' onClick={() => {}} loading={loading} />
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;