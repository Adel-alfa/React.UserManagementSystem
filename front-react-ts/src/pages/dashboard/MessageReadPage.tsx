import { useLocation } from "react-router-dom";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const MessageReadPage = () => {
  
  const location = useLocation();
  const item = location.state?.item; // full message object if passed
const navigate = useNavigate();
  return (
     <div className='pageTemplate2'>
        <div className='pageTemplate3 items-stretch'>
    <div className=" bg-white shadow rounded-lg border border-gray-200">
      {/* Header */}
      <div className="flex justify-between items-start p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          {/* Avatar with initials */}
          <div className="w-10 h-10 rounded-full bg-purple-200 flex items-center justify-center font-semibold text-purple-700">
            {item.sender?.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <p className="font-semibold text-gray-900">{item.sender}</p>
            <p className="text-sm text-gray-500">
              To: <span className="text-gray-700">{item.recipient}</span>
            </p>
          </div>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      </div>

      {/* Subject */}
      <div className="px-4 py-3 border-b border-gray-200">
        <h1 className="text-lg font-bold text-gray-900">{item.subject}</h1>
      </div>

      {/* Body */}
      <div className="px-4 py-6 space-y-4 text-gray-800 leading-relaxed">
        <p>{item.body ?? "No message body provided."}</p>
      </div>

      {/* Footer with timestamp */}
      <div className="px-4 py-2 border-t border-gray-200 text-sm text-gray-500">
        Sent {moment(item.sentDate).format("ddd DD/MM/YYYY HH:mm")}
      </div>
    </div>
    </div>
    </div>
  );
};
export default MessageReadPage;