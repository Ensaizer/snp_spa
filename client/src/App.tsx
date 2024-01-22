import React from 'react';
import {Outlet, useLocation} from "react-router-dom";
import NavBar from "./components/ui/NavBar";
import MainPage from "./components/pages/MainPage";

function App(): JSX.Element {
    const {pathname } = useLocation();
    console.log(pathname)
  return (
      <>
          <NavBar />
          {pathname === '/' ? <MainPage/> : <Outlet />}
      </>
  );
}

export default App;
