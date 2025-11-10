import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import {useState} from 'react'
import useAuth from '../../hooks/useAuth';



const Layout = () => {
   const { isAuthenticated } = useAuth();
  const { pathname } = useLocation();
    const [SideBarCollapsed, setSideBarCollapsed] =  useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");

  const sideBarRenderer = () => {
    if (isAuthenticated && pathname.toLowerCase().startsWith('/dashboard')) {
      return  <div className="min-h-screen bg-linear-to-r from-slate-50 via-blue-50 to-indigo-50
                transition-all duration-500">
      <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
        <Sidebar 
          collapsed ={SideBarCollapsed}  
          onToggle={()=> setSideBarCollapsed(!SideBarCollapsed)}
          currentPage= {currentPage}
          onPageChange={setCurrentPage}/>
      {/* Header */}
      <div className="flex-1 flex flex-col overflow-hidden ">
        <Header 
        sidebarCollapsed={SideBarCollapsed}
        onToggleSidebar={()=> setSideBarCollapsed(!SideBarCollapsed)}
         />
         <div className='flex-1 overflow-y-auto bg-transparent'>
           <Outlet  /> 
         </div>
        
      </div>
      </div>
    
    </div>
          
    }else{
       return <div className="flex-1 flex flex-col overflow-hidden ">
        <Header 
        sidebarCollapsed={SideBarCollapsed}
        onToggleSidebar={()=> setSideBarCollapsed(!SideBarCollapsed)}
         />
         <div className='flex-1 overflow-y-auto bg-transparent'>
           <Outlet  /> 
         </div>
        
      </div>
    }
    return null;
  };
    return (
    <div>
        {sideBarRenderer()}
        
      </div>
   
  )
};

export default Layout;