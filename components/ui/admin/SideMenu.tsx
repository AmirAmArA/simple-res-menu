import Link from "next/link";
import React from "react";

type Props = {};

function SideMenu({ children }: any) {
  return (
    <div className="drawer md:drawer-open ">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Page content here */}
        <label
          htmlFor="my-drawer"
          className="btn btn-primary drawer-button md:hidden w-40"
        >
          Open Menu
        </label>
        {children}
      </div>
      <div className="drawer-side shadow-lg">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 w-60 bg-base-100 text-base-content">
          <li className="menu-title">
            <span>SideMenu</span>
          </li>
          <li>
            <Link href="/admin/dashboard/meals">Meals</Link>
          </li>
          <li>
            <Link href="/admin/dashboard/ingredients">Ingredients</Link>
          </li>
          <li>
            <Link href="/admin/dashboard/customers">Customers</Link>
          </li>
          <li>
            <Link href="/admin/dashboard/orders">Orders</Link>
          </li>
          <li>
            <Link href="/admin/dashboard/stock">Stock</Link>
          </li>
          <li>
            <Link href="/admin/dashboard/settings">Settings</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SideMenu;
