import React from 'react';
import { Link, useLocation,NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Transition,
  } from '@headlessui/react'
  import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useSelector } from 'react-redux';
import { SignOutSuccess } from '../Redux/Slice/UserSlice';
import { current } from '@reduxjs/toolkit';
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  
const Header = () => {
    const path = useLocation().pathname;
    const {currentUser} = useSelector((state)=>state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    //console.log(path);
    const handleClickSignOut = () => {
        dispatch(SignOutSuccess());
        localStorage.removeItem('Token');
        navigate("/signin");
    }
    return (
        <Disclosure as="nav" className="bg-grey-100 border-spacing-1 border-b-2">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </DisclosureButton>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start gap-10">
                  <div className="flex flex-shrink-0 items-center">
                  <span className="sm:text-xl md:text-xl self-center whitespace-nowrap text-sm font-semibold text-blue-500">
            <Link to="/landingpage">Tech Solutions Inc.</Link>
            </span>
                  </div>
                  <div className="hidden sm:ml-6 sm:block px-10">
  <div className="flex space-x-4 gap-7">
  <NavLink
  to="/dashboard"
  className="hover:border-b-2 hover:text-blue-500 hover:border-blue-500 py-5"
  activeClassName="border-b-2 text-blue-500 border-blue-500"
  isActive={() => path === "/dashboard"}
>
  Dashboard
</NavLink>
    <NavLink
      to="/about"
      className="hover:border-b-2 hover:text-blue-500 hover:border-blue-500 py-5"
      activeClassName="border-b-2 text-blue-500 border-blue-500"
      isActive={() => path === "/about"}
    >
      About
    </NavLink>
    <NavLink
      to="/teams"
      className="hover:border-b-2 hover:text-blue-500 hover:border-blue-500 py-5"
      activeClassName="border-b-2 text-blue-500 border-blue-500"
      isActive={() => path === "/teams"}
    >
      Teams
    </NavLink>
  </div>
</div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 sm:gap-6">
                  <button
                    type="button"
                    className="relative rounded-full bg-white p-1 text-gray-400 hover:bg-grey-900 focus:outline-none focus:ring-2 focus:ring-grey-400 focus:ring-offset-2 focus:ring-offset-gray-800 h-17 w-17 "
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-5 w-5 sm:h-10 sm:w-10" aria-hidden="true" />
                  </button>
  
                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-9 w-9 sm:h-10 sm:w-10 rounded-full"
                          src={currentUser.rest.profilePic}
                          alt=""
                        />
                      </MenuButton>
                    </div>
                    <Transition
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <MenuItem>
                          {({ focus }) => (
                            <a
                              className={classNames(focus ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-black-700')}
                            >
                            {currentUser.rest.username}
                            </a>
                          )}
                        </MenuItem>
                        <MenuItem>
                          {({ focus }) => (
                            <a
                              className={classNames(focus ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-black-700')}
                            ><Link to="./dashboard?tab=profile">
                            Your Profile
                            </Link>
                            </a>
                          )}
                        </MenuItem>
                        <MenuItem>
                          {({ focus }) => (
                            <a
                              href="#"
                              className={classNames(focus ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                              onClick={handleClickSignOut}
                            >
                              Sign out
                            </a>
                          )}
                        </MenuItem>
                      </MenuItems>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
  
            <DisclosurePanel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                <div className="flex space-x-4 gap-7">
    <p className="text-gray-500 py-5">
      <Link to="/dashboard" className="hover:border-b-2 hover:text-blue-500 hover:border-blue-500 py-5 active:border-blue-500 active:text-blue-500">
        Dashboard
      </Link>
    </p>
    <p className="text-gray-500 py-5">
      <Link to="/about" className="hover:border-b-2 hover:text-blue-500 hover:border-blue-500 py-5">
        About
      </Link>
    </p>
    <p className="text-gray-500 py-5">
      <Link to="/Teams" className="hover:border-b-2 hover:text-blue-500 hover:border-blue-500 py-5">
        Teams
      </Link>
    </p>
    <p className="text-gray-500 py-5">
      <Link to="/Calander" className="hover:border-b-2 hover:text-blue-500 hover:border-blue-500 py-5">
        Calendar
      </Link>
    </p>
  </div>
              </div>
            </DisclosurePanel>
          </>
        )}
      </Disclosure>
    );
};

export default Header;