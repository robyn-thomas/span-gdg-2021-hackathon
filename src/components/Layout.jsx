import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom';
import { logout } from '../services/firebase';

import { useLocation } from 'react-router-dom';

export default function Example(props) {
  const { children } = props;
  const location = useLocation();

  return (
    <>
      <Popover className="relative bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-16">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <Link to={'/'} className={"flex"}>
                <span className="sr-only">Workflow</span>
                <img className="h-6 w-auto sm:h-24" src="/PI3-logo.png" alt="" />
                <h1 className="text-2xl ml-4 tracking-tight mt-8 font-extrabold text-center text-gray-900 sm:text-5xl md:text-xl">
                  <span className="block xl:inline">PII </span>{' '}
                  <span className="block text-indigo-600 xl:inline">Investigator</span>
                </h1>
              </Link>
            </div>

            <div className="-mr-2 -my-4 md:hidden">
              <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                <span className="sr-only">Open menu</span>
                <MenuIcon className="h-6 w-6" aria-hidden="true" />
              </Popover.Button>
            </div>

            <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
              {location.pathname === '/profile' ? (
                <p>
                  <Link to={'/'} className={'underline text-gray-500 hover:text-indigo-500'}>
                    Back to Dashboard
                  </Link>
                </p>
              ) : (
                <Link to={'/profile'} className={'underline text-gray-500 hover:text-indigo-500'}>
                  Profile
                </Link>
              )}
              <button
                onClick={logout}
                className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        <Transition
          as={Fragment}
          enter="duration-200 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            focus
            className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
          >
            <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
              <div className="pt-5 pb-6 px-5">
                <div className="flex items-center justify-between">
                  <div>
                    <img className="h-8 w-auto" src="PI3-logo.png" alt="Workflow" />
                  </div>
                  <div className="-mr-2">
                    <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                      <span className="sr-only">Close menu</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
              </div>
              <div className="py-6 px-5 space-y-6 flex flex-row">
                <>
                  <p>
                    <Link to={'/profile'}>Profile</Link>
                  </p>
                  <p className="mt-6 text-center text-base font-medium text-gray-500">
                    <button onClick={logout} className="text-indigo-600 hover:text-indigo-500">
                      Logout
                    </button>
                  </p>
                </>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
      {children}
    </>
  );
}
