import { Outlet } from "react-router-dom";

function MainLayout(){

  return (
    <>
        <div className="content_area">
          <Outlet />
          {/* <Footer /> */}
        </div>
    </>
  );
}

export default MainLayout;