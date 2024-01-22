import React from 'react';
import NavBar from "./components/ui/NavBar.tsx";
import {Outlet, useLocation} from "react-router-dom";
import MainPage from "./components/pages/MainPage.tsx";

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
