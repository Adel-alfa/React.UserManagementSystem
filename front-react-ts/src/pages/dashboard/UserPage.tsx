import PageAccessTemplate from '../../components/dashboard/page-access/PageAccessTemplate';
import { FcAssistant } from 'react-icons/fc';

const UserPage = () => {
  return (
    <div className='m-4 h-8/9'>
      <PageAccessTemplate color='#96BC0B' icon={FcAssistant} role='User' />
    </div>
  );
};

export default UserPage;