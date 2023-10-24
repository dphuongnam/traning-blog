'use client'

import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useMemo, use } from "react";
import { useEffect } from "react";
import Cookies from 'js-cookie';
import {
  ArticleIcon,
  HomeIcon,
  LogoIcon,
  LogoutIcon,
  UsersIcon,
  VideosIcon,
} from "./icons";

const menuItems = [
  { id: 1, label: "Home", icon: HomeIcon, link: "/" },
  { id: 2, label: "Category", icon: ArticleIcon, link: "/admin/category" },
  { id: 3, label: "Post", icon: UsersIcon, link: "/admin/posts" },
];

const Sidebar = () => {
  const [toggleCollapse, setToggleCollapse] = useState(false);
  const [isCollapsible, setIsCollapsible] = useState(false);
  const router = useRouter();

  const wrapperClasses = classNames(
    "h-screen px-4 pt-8 pb-4 bg-light flex justify-between flex-col",
    {
      ["w-80"]: !toggleCollapse,
      ["w-20"]: toggleCollapse,
    }
  );

  const collapseIconClasses = classNames(
    "p-4 rounded bg-light-lighter absolute right-0",
    {
      "rotate-180": toggleCollapse,
    }
  );

  const onMouseOver = () => {
    setIsCollapsible(!isCollapsible);
  };

  const handleSidebarToggle = () => {
    setToggleCollapse(!toggleCollapse);
  };
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(Cookies.get('isLoggedIn') === 'true');
  }, []);

  const handleLogout = () => {
    Cookies.remove('isLoggedIn');
    setIsLoggedIn(false);
    router.push('/login');
  };

  return (
    <div className="side-bar">
      <div className="flex flex-col">
        <div className="flex items-center justify-between relative">
          <div className="flex items-center pl-1 gap-4 mb-5">
            <LogoIcon />
            <span
              className={classNames("ml-5 mt-2 text-lg font-medium text-text", {
                hidden: toggleCollapse,
              })}>
              NPN Blogs
            </span>
          </div>
        </div>

        <div className="flex flex-col items-start mt-24">
          {menuItems.map(({ icon: Icon, ...menu }) => {
            return (
              <div>
                <Link href={menu.link} className="nav-link d-flex pt-3 pb-3">
                  <div style={{ width: "2.5rem" }}>
                    <Icon />
                  </div>
                  <span
                    className={classNames("text-md font-medium text-text-light")}>
                    {menu.label}
                  </span>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      <div className={'px-3 py-4 d-flex '}
        style={{ cursor: 'pointer' }}
        onClick={handleLogout}
      >
        <div style={{ width: "2.5rem" }}>
          <LogoutIcon />
        </div>
        <span className={classNames("text-md font-medium text-text-light")}>
          Logout
        </span>
      </div>
    </div>
  );
};

export default Sidebar;
