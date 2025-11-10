import PageAccessTemplate from '../../components/dashboard/page-access/PageAccessTemplate';
import { FcBusinessman } from 'react-icons/fc';

const AdminPage = () => {
  return (
    <div className='m-4 h-8/9'>
      <PageAccessTemplate color='#9333EA' icon={FcBusinessman} role='Admin' />
    </div>
  );
};

export default AdminPage;