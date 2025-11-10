import PageAccessTemplate from '../../components/dashboard/page-access/PageAccessTemplate';
import { FcConferenceCall } from 'react-icons/fc';


const OwnerPage = () => {
  return (
    <div className='m-4 h-8/9'>
      <PageAccessTemplate color='#3b3549' icon={FcConferenceCall} role='Owner' />
    </div>
  );
};

export default OwnerPage;