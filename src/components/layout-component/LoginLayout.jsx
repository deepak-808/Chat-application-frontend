import React from 'react';
import { Outlet } from "react-router-dom";

  
  function LoginLayout() {
    console.log("Rendering LoginLayout");
    return (
        <div className="login_wrap">
          <Outlet />
        </div>
    );
  }

export default LoginLayout