import { useEffect, useState } from "react";
import type { IMessageDto } from "../../types/messageDto";
import axiosInstance from "../../utils/axiosInstance";
import { MY_MESSAGE_URL } from "../../utils/globalConfig";
import { toast } from "react-hot-toast";
import Spinner from "../../components/general/Spinner";
import moment from "moment";
import { MdInput, MdOutput } from "react-icons/md";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { PATH_DASHBOARD, PATH_PUBLIC } from "../../routes/path";
import { MailPlus } from "lucide-react";

const InboxPage = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<IMessageDto[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const getMyMessages = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get<IMessageDto[]>(MY_MESSAGE_URL);
      const { data } = response;
      setMessages(data);
      setLoading(false);
    } catch (error) {
      toast.error("An Error happened. Please Contact admins");
      setLoading(false);
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    getMyMessages();
  }, []);

  if (loading) {
    return (
      <div className="w-full">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="pageTemplate2">
      <div className="flex justify-between items-center mx-6">
        <h1 className="text-2xl font-bold">Inbox</h1>

        <button
          onClick={() => navigate(PATH_DASHBOARD.sendMessage)}
          className=" me-10 "
        >
          <div className="inline-flex items-center  
          bg-linear-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/20
          cursor-pointer gap-2 px-3 py-2 rounded-md hover:text-white/50">
            <MailPlus  />
           <span className="text-ms font-bold"> New Message</span> 
          </div>
        </button>
      </div>
      <div className="pageTemplate3 items-stretch">
        <div className="grid grid-cols-8 p-2 border-2 border-gray-200 rounded-lg">
          <span>Date</span>
          <span>Type</span>
          <span className="col-span-4">Subject</span>
          <span>Sender</span>
          <span>Receiver</span>
        </div>
        {messages.map((item) => (
          <div
            key={item.id}
            onClick={() =>
              navigate(PATH_PUBLIC.messageReadPage, { state: { item } })
            }
            className="grid grid-cols-8 p-2 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-purple-50"
          >
            <span>{moment(item.sentDate).fromNow()}</span>
            <span>
              {item.sender === user?.userName ? (
                <MdOutput className="text-2xl text-purple-500" />
              ) : (
                <MdInput className="text-2xl text-green-500" />
              )}
            </span>
            <span className="col-span-4">{item.subject}</span>
            <span>{item.sender}</span>
            <span>{item.recipient}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InboxPage;
