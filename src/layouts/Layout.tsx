import React, { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

const Layout = () => (
  <main className="App">
    <Toaster />
    <Outlet />
  </main>
);

export default Layout;
