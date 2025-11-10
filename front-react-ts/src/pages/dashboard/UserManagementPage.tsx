import { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { USERS_LIST_URL } from '../../utils/globalConfig';
import type { IAuthUser } from '../../types/authDto';
import UserChartSection from '../../components/dashboard/user-management/UserChartSection';
import UsersTableSection from '../../components/dashboard/user-management/UsersTableSection';
import UserGrid from '../../components/dashboard/user-management/StatsGridSection';
import { toast } from 'react-hot-toast';
import Spinner from '../../components/general/Spinner';

const UsersManagementPage = () => {
  const [users, setUsers] = useState<IAuthUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false)

  const getUsersList = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get<IAuthUser[]>(USERS_LIST_URL);
      const { data } = response;
      setUsers(data);
      setLoading(false);
    } catch (error) {
      toast.error('An Error happened. Please Contact admins');
      setLoading(false);
      console.error('Get Users List Error: ', error);
    }
  };

  useEffect(() => {
    getUsersList();
  }, []);

  if (loading) {
    return (
      <div className='w-full'>
        <Spinner />
      </div>
    );
  }

  return (
    <div className='pageTemplate2'>
      <h1 className='text-2xl font-bold'>Users Management</h1>
      
      <UserGrid usersList={users}/>
      <div className="w-9/12 mx-auto  my-4">
        <UserChartSection usersList={users} />        
      </div>      
      <UsersTableSection usersList={users} />
    </div>
  );
};

export default UsersManagementPage;