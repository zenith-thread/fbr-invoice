import React from "react";

import { NavLink, Outlet } from "react-router";

const Navbar = React.memo(() => {
  return (
    <>
      <div className="text-xl text-white flex gap-[100px] justify-center w-full items-center bg-[#333] px-14 py-4 mb-10">
        <NavLink
          to="/"
          className="px-4 py-2 rounded-xl font-medium hover:bg-[#444] transition-all"
        >
          Create Invoice
        </NavLink>
        <NavLink
          to="/invoices"
          className="px-4 py-2 rounded-xl font-medium hover:bg-[#444] transition-all"
        >
          Invoices
        </NavLink>
      </div>
      <Outlet />
    </>
  );
});

export default Navbar;
