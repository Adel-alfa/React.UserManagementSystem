
import type { IAuthUser } from '../../../types/authDto';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { RolesEnum } from '../../../types/authDto';
interface IProps {
  usersList: IAuthUser[];
}

const UserChartSection = ({ usersList }: IProps) => {
    const data = [
  { name: "User", value: usersList.filter((q) => q.roles.includes(RolesEnum.USER)).length, color: "#96bc0b" },
  { name: "Manager", value: usersList.filter((q) => q.roles.includes(RolesEnum.MANAGER)).length, color: "#0B96BC" },
  { name: "Admin", value: usersList.filter((q) => q.roles.includes(RolesEnum.ADMIN)).length , color: "#8b5cf6" },
  { name: "Owner", value: usersList.filter((q) => q.roles.includes(RolesEnum.OWNER)).length, color: "#3b3549" },
];
    return (
        <div className="bg-white backdrop-blur-xl rounded-b-2xl p-6 border border-slate-200/50">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-slate-800">
          Users Chart
        </h3>        
      </div>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                >
                    {data.map((entry, index)=>(
                        <Cell key={`cell-${index}`} fill={entry.color}/>
                    ))}

                </Pie>
                <Tooltip 
                contentStyle={{
                    backgroundColor: "rgba(255,255,255,0.95)",
                    border: "none",
                    borderRadius: "12px",
                    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)"
                }}
                />
            </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="space-y-3">
        {data.map((item, index)=>{
            return <div className="flex items-center justify-between" key={index}>
                <div className="flex item-sce space-x-3">
                    <div className="w-3 h-3 rounded-full" style={{backgroundColor: item.color}} 
                    />
                    <span className="text-sm text-slate-600">{item.name}</span>
                    
                </div>
                <div className="text-sm font-semibold  text-slate-800">{(item.value/usersList.length*100).toFixed(2)}%</div>
            </div>
        })}
      </div>
    </div>
    );
};



export default UserChartSection;