import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar";
import Header from "../Layout/Header/Header";

function MainLayout(){

  return (
    <>
      <div className="header_area">
        <Header />
      </div>
      <div className="wrapper d-flex">
        <div className="left_sidebar">
          <Sidebar />
        </div>
        <div className="content_area">
          <Outlet />
          {/* <Footer /> */}
        </div>
      </div>
    </>
  );
}

export default MainLayout;