import { Outlet } from 'react-router-dom';
import { AppSidebar } from './AppSidebar';

export const Layout = () => {
  return (
    <div className="flex min-h-screen w-full bg-slate-50/50">
      <AppSidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;