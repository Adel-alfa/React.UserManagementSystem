import {
  BarChart3,
  House,
  Package,
  Users,
  Settings,
  MessageSquare,
  Calendar,
  FileText,
  CreditCard,
  ChevronDown,
  LayoutDashboard,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PATH_DASHBOARD } from "../../routes/path";

const menuItems = [
  {
    id: "Dashboard",
    icon: LayoutDashboard,
    label: "Dashboard",
    active: true,
    badge: "New",
    path: PATH_DASHBOARD.dashboard,
  },

  {
    id: "messages",
    icon: MessageSquare,
    label: "Messages",
    badge: "12",
    submenu: [
      { id: "all-users", label: "In Box", path: PATH_DASHBOARD.inbox },
      { id: "roles", label: "Send Message", path: PATH_DASHBOARD.sendMessage },
      {
        id: "activity",
        label: " All Message Activity",
        path: PATH_DASHBOARD.messages,
      },
    ],
  },
   {
    id: "logs",
    icon: BarChart3,
    label: "Logs",
    submenu: [
      { id: "mylogs", label: "My Log", path: PATH_DASHBOARD.myLogs },
      { id: "allLogs", label: "All Log", path: PATH_DASHBOARD.systemLogs },
      
    ],
  },
  {
    id: "calendar",
    icon: Calendar,
    label: "Calendar",
    path: PATH_DASHBOARD.dashboard,
  },
  {
    id: "transactions",
    icon: CreditCard,
    label: "Transactions",
  },
  {
    id: "reports",
    icon: FileText,
    label: "Reports",
    count: 5,
    path: PATH_DASHBOARD.dashboard,
  },
  {
    id: "users",
    icon: Users,
    label: "Users",
    path: PATH_DASHBOARD.usersManagement,
  },
  {
    id: "pages",
    icon: Package,
    label: "Pages",
    submenu: [
      { id: "owner", label: "Owner", path: PATH_DASHBOARD.owner },
      { id: "admin", label: "Admin", path: PATH_DASHBOARD.admin },
      { id: "manager", label: "Manager", path: PATH_DASHBOARD.manager },
      { id: "user", label: "User", path: PATH_DASHBOARD.user },
    ],
  },
  {
    id: "settings",
    icon: Settings,
    label: "Settings",
    path: PATH_DASHBOARD.dashboard,
  },
];
interface IProps {
  collapsed: boolean;
  onToggle: () => void;
  currentPage: string;
  onPageChange: (page: string) => void;
}
const Sidebar = ({
  collapsed,
  onToggle,
  currentPage,
  onPageChange,
}: IProps) => {
  const [expandedItems, setExpendedItems] = useState(new Set(["analytics"]));
  const navigate = useNavigate();
  const toggleExpanded = (itemid: string) => {
    const newExpanded = new Set(expandedItems);

    if (newExpanded.has(itemid)) {
      newExpanded.delete(itemid);
    } else {
      newExpanded.add(itemid);
    }
    setExpendedItems(newExpanded);
  };
  return (
    <div
      className={`${
        collapsed ? "w-20" : "w-72"
      } transition-all duration-300 ease-in-out bg-white/80 backdrop-blur-xl
         border-r border-slate-200/50 d flex flex-col relative z-10 `}
    >
      {/* Logo */}
      <div className="p-6 border-b border-slate-200/50 ">
        <div className="flex items-center space-x-3">
          <div
            className="w-10 h-10 bg-linear-to-r from-blue-600 to-purple-600 rounded-xl
                     flex items-center justify-center showdow-lg"
          >
            <House className="w-6 h-6 text-white" />
          </div>
          {/* Conditional Rendering */}
          {!collapsed && (
            <div>
              <h1 className="text-xl font-bold text-slate-900">Alfa One</h1>
              <p className="text-sm text-slate-500">UMS</p>
            </div>
          )}
        </div>
      </div>
      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          return (
            <div key={item.id}>
              <button
                className={`w-full flex items-center justify-between p-3 rounded-xl 
                        transition-all duration-200 ${
                          currentPage === item.id || item.active
                            ? "bg-linear-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25"
                            : "text-slate-600 hover:bg-slate-100"
                        } `}
                onClick={() => {
                  if (item.submenu) {
                    toggleExpanded(item.id);
                  } else {
                    onPageChange(item.id);
                    navigate(item.path ? item.path : PATH_DASHBOARD.dashboard);
                  }
                }}
              >
                <div className="flex items-center space-x-3">
                  <item.icon className={`w-5 h-5`} />
                  <>
                    {!collapsed && (
                      <>
                        <span className="font-medium ml-2">{item.label}</span>
                        {item.badge && (
                          <span
                            className="px-2 py-1 text-xs bg-red-500
                                 text-white rounded-full"
                          >
                            {item.badge}
                          </span>
                        )}

                        {item.count && (
                          <span className="px-2 py-1 text-xs bg-slate-300 text-slate-600 rounded-full">
                            {item.count}
                          </span>
                        )}
                      </>
                    )}
                  </>
                </div>

                {!collapsed && item.submenu && (
                  <ChevronDown className={`w-4 h-4 transition-transform `} />
                )}
              </button>
              {/* Sub Menus*/}
              {!collapsed && item.submenu && expandedItems.has(item.id) && (
                <div className="ml-8 mt-2 space-y-1">
                  {item.submenu.map((subitem) => {
                    return (
                      <button
                        key={subitem.id}
                        className="w-full text-left p-2 text-sm text-slate-600 
                         hover:text-slate-800  hover:bg-slate-100 rounded-lg transition-transform"
                        onClick={() => {
                          navigate(
                            subitem.path
                              ? subitem.path
                              : PATH_DASHBOARD.dashboard
                          );
                        }}
                      >
                        {subitem.label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
