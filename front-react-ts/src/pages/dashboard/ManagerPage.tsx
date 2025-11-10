import PageAccessTemplate from "../../components/dashboard/page-access/PageAccessTemplate";
import { FcBusinesswoman } from 'react-icons/fc';

const ManagerPage = () => {
  return (
    <div className="m-4 h-8/9">
      <PageAccessTemplate color="#0B96BC" icon={FcBusinesswoman} role="Manager" />
    </div>
  );
};

export default ManagerPage;
