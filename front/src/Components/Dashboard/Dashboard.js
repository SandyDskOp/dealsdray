import React,{useState} from 'react'
import DashboardLayout from "./DashboardLayout";
import SideBar from './SideBar';

const Dashboard = () => {
    const [display, setDisplay] = useState(false);

    const showMenu = () => {
        setDisplay(true);
      };
    
      const closeMenu = () => {
        setDisplay(false);
      };
  return (
    <DashboardLayout
    display={display}
    showMenu={showMenu}
    closeMenu={closeMenu}
  >
    <SideBar closemenu={closeMenu} />
  </DashboardLayout>
  )
}

export default Dashboard