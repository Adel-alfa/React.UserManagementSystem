
import type { IAuthUser } from '../../../types/authDto';
import { RolesEnum } from '../../../types/authDto';
import { FcAssistant ,FcBusinessman,FcBusinesswoman,FcManager} from 'react-icons/fc';

interface IProps {
  usersList: IAuthUser[];
}
const UserGrid = ({ usersList }: IProps) => {
let owners = 0;
  let admins = 0;
  let managers = 0;
  let users = 0;

  usersList.forEach((item) => {
    if (item.roles.includes(RolesEnum.OWNER)) {
      owners++;
    } else if (item.roles.includes(RolesEnum.ADMIN)) {
      admins++;
    } else if (item.roles.includes(RolesEnum.MANAGER)) {
      managers++;
    } else if (item.roles.includes(RolesEnum.USER)) {
      users++;
    }
  });
   const userCountData = [
      { count: owners, role: RolesEnum.OWNER, icon: FcBusinesswoman, color: '#3b3549' , bgColor: "bg-stone-100"},
      { count: admins, role: RolesEnum.ADMIN, icon: FcBusinessman, color:  '#9333EA', bgColor: "bg-purple-50"},
      { count: managers, role: RolesEnum.MANAGER, icon: FcManager, color: '#0B96BC',bgColor: "bg-cyan-50" },
      { count: users, role: RolesEnum.USER, icon: FcAssistant, color: '#96bc0b',bgColor: "bg-lime-50" },
    ];
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
           {userCountData.map((stats,index)=>{
             return<div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 
            border border-slate-200/50  hover:shadow-xl
            hover:shadow-slate-200/20  transition-all duration-300 group" key={index}>
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <p className="text-lg font-medium text-slate-600  mb-2">
                            {stats.count}
                        </p>
                        <p className="text-2xl font-bold text-slate-800  mb-4 "> {stats.role}</p>
                        
                    </div>     
                     <div className={`p-3 rounded-xl ${stats.bgColor} group-hover:scale-110 transition-all duration-200`}
                     >
                        {
                            <stats.icon className={`w-12 h-12 ${stats.bgColor} `} />
                        }                        
                    </div>
                   
                </div>
                    {/*Progress bar */}
                        <div className="mt-4 h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-linear-to-r rounded-full
                             transition-all duration-100"
                            style={{ backgroundColor: stats.color }}>
                            </div>
                        </div>
            </div>
           })}
            
        </div>
    );
};

export default UserGrid;