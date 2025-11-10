import { Menu, Bell, LogOut, House } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

import { PATH_PUBLIC } from "../../routes/path";
import AccountDropdown from "./AccountDropdown";

const Header = ({ sidebarCollapsed, onToggleSidebar }) => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const userRolesLabelCreator = () => {
    if (user) {
      let result = "";
      user.roles.forEach((role, index) => {
        result += role;
        if (index < user.roles.length - 1) {
          result += ", ";
        }
      });
      return result;
    }
    return "--";
  };

  return (
    <div
      className=" bg-white/80 backdrop-blur-xl border-b
         border-slate-200/50 px-6 py-4 "
    >
      <div>
        <div className="flex items-center justify-between">
          {/* Left section */}
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <button
                className="p-2 rounded-lg text-slate-600  hover:bg-slate-100 transition-colors"
                onClick={onToggleSidebar}
              >
                <Menu className="w-5 h-5" />
              </button>

              <div className="hidden md:block">
                <h1 className="text-2xl font-semibold text-slate-900">
                  User Management System
                </h1>
                <p className="text-sm text-slate-500">
                  Welcome {user?.firstName} {user?.lastName}
                </p>
              </div>
            </div>
          ) : (
            <></>
          )}

          {/* Center */}

          {/* Right section */}
          <div className="flex items-center space-x-3 pe-8">
            {/* Quic Action */}
            {isAuthenticated && (
              <div className="flex items-center gap-2">                
               
                <div className="flex items-center space-x-3 px-3 border-l border-slate-200">
                  <AccountDropdown />
                  <div className="hidden sm:block">
                    <p className="text-sm font-medium text-slate-800 truncate">
                      {user ? user.userName : "--"}
                    </p>
                    <p className="text-xs text-slate-600  truncate">
                      {userRolesLabelCreator()}
                    </p>
                  </div>
                </div>

                
              </div>
            )}
          </div>
        </div>
      </div>
      {!isAuthenticated && (
        <div className="flex items-center justify-between h-12 px-6 ">
          <div className="flex items-center gap-4">
            <div
              className="w-10 h-10 bg-linear-to-r from-blue-600 to-purple-600 
                  rounded-xl  flex items-center justify-center showdow-lg cursor-pointer"
            >
              <House
                className="w-6 h-6 text-white"
                onClick={() => navigate("/")}
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              className="hidden lg:flex items-center px-6 bg-linear-to-r
                    from-blue-500 to-purple-600 text-white rounded-2xl hover:shadow-[0_0_5px_5px_#BBB3DB]  transition-all duration-500
                     h-10  "
              onClick={() => navigate(PATH_PUBLIC.register)}
            >
              <span className="text-lg font-semibold">Register</span>
            </button>

            <button
              className="hidden lg:flex items-center px-6 bg-linear-to-r
                    from-blue-500 to-purple-600 text-white rounded-2xl hover:shadow-[0_0_5px_5px_#BBB3DB]  transition-all duration-500
                     h-10  "
              onClick={() => navigate(PATH_PUBLIC.login)}
            >
              <span className="text-lg font-semibold">Login</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
