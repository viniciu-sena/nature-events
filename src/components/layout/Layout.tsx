import { memo } from 'react';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <main className="p-8">
      <Outlet />
    </main>
  );
}

export default memo(Layout);
