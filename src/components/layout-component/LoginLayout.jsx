import { Outlet } from "react-router-dom";

  
  function LoginLayout() {
    console.log("Rendering LoginLayout");
    return (
        <div className="flex justify-center">
          <Outlet />
        </div>
    );
  }

export default LoginLayout