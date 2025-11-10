import { useState, useEffect } from 'react';
import { CREATE_MESSAGE_URL, USERNAMES_LIST_URL } from '../../utils/globalConfig';
import axiosInstance from '../../utils/axiosInstance';
import { toast } from 'react-hot-toast';
import Spinner from '../../components/general/Spinner';
import UserNamesComboBox from '../../components/dashboard/send-message/UserNameComboBox';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import type { ISendMessageDto } from '../../types/messageDto';
import InputField from '../../components/general/InputField';
import Button from '../../components/general/Button';
import { useNavigate } from 'react-router-dom';
import { PATH_DASHBOARD } from '../../routes/path';



const SendMessagePage = () => {
  const [usernames, setUsernames] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const sendMessageSchema = Yup.object().shape({
    recipient: Yup.string().required('User Name is required').oneOf(usernames, 'Invalid username'),
    subject: Yup.string().required('Message Text is required'),
     body: Yup.string().required('Message Text is required'),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ISendMessageDto>({
    resolver: yupResolver(sendMessageSchema),
    defaultValues: {
      recipient: '',
      subject: '',
      body: '',
    },
  });

  const getUsernamesList = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get<string[]>(USERNAMES_LIST_URL);
      const { data } = response;
      setUsernames(data);
      setLoading(false);
    } catch (error) {
      toast.error('An Error happened. Please Contact admins');
      setLoading(false);
      console.error('Error fetching usernames list:', error);
    }
  };

  useEffect(() => {
    getUsernamesList();
  }, []);

  const onSubmitSendMessageForm = async (submittedData: ISendMessageDto) => {
    try {
      setLoading(true);
      const newMessage: ISendMessageDto = {
        recipient: submittedData.recipient,
        subject: submittedData.subject,
        body: submittedData.body,

      };
      await axiosInstance.post(CREATE_MESSAGE_URL, newMessage);
      setLoading(false);
      toast.success('Your message Sent successfully.');
      navigate(PATH_DASHBOARD.inbox);
    } catch (error) {
      setLoading(false);
      reset();
      const err = error as { data: string; status: number };
      if (err.status === 400) {
        toast.error(err.data);
      } else {
        toast.error('An Error occurred. Please contact admins');
      }
    }
  };

  if (loading) {
    return (
      <div className='w-full'>
         <Spinner size={150} thickness={8} color="border-purple-200" highlight="border-t-purple-700" className="my-12" />
      </div>
    );
  }

  return (
    <div className='pageTemplate2'>
      <h1 className='text-2xl font-bold'>Send Message</h1>
      <div className='pageTemplate3 items-stretch'>
        <form onSubmit={handleSubmit(onSubmitSendMessageForm)}>
          <UserNamesComboBox
            usernames={usernames}
            control={control}
            name='recipient'
            error={errors.recipient?.message}
          />
          <InputField control={control} label='Subject' inputName='subject' error={errors.subject?.message} />
           <label className="font-semibold mx-4 mt-6 ">Body</label>
           <p></p>
          <textarea   rows={4}  id="body"   placeholder="Enter your message here..."  {...control.register('body')}
           className=" border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 px-4 mx-4 w-9/12"/>
            
    
          <div className='flex justify-center items-center gap-4 mt-6'>
            <Button variant='secondary' type='button' label='Discard' onClick={() => navigate(PATH_DASHBOARD.inbox)} />
            <Button variant='primary' type='submit' label='Send' onClick={() => {}} loading={loading} />
          </div>
        </form>
      </div>
    </div>
  );
};



export default SendMessagePage;