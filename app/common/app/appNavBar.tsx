import {appMenu} from "~/common/app/appMenu";
import {Form, Link} from "@remix-run/react";
import {appLinks} from "~/common/app/appLinks";
import {MdLogout} from 'react-icons/md'

const MainMenu = () => {
    return (
        <ul className="flex flex-col p-4 mt-4 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 bg-slate-800 p-4 text-white">
            {appMenu.map((menu) =>
                <li key={menu.id}>
                    <Link to={menu.path}
                          className="block py-2 pr-4 pl-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 "
                    >
                        {menu.label}
                    </Link>
                </li>
            )}
        </ul>
    )
}

const AppLogo = () => {
    return (
        <a href="/" className="flex items-center">
            <img src="/img/logo.jpg" className="mr-3 h-6 sm:h-9" alt="Jackfit Logo"/>
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                        Jackfit
                    </span>
        </a>
    )
}

const UserMenu = () => {
    return (
        <>
            <button type="button"
                    className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown"
                    data-dropdown-placement="bottom">
                <span className="sr-only">Open user menu</span>
                <img className="w-8 h-8 rounded-full" src="/img/user.png"
                     alt="user photo"/>
            </button>
            <div
                className="hidden z-50 my-4 text-base list-none rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                id="user-dropdown"
                style={{
                    position: "absolute",
                    inset: "0px auto auto 0px",
                    margin: "0px",
                    transform: "translate(0px, 15264px)"
                }}
                data-popper-reference-hidden="" data-popper-escaped="" data-popper-placement="bottom">
                <div className="py-3 px-4">
                    <span className="block text-sm text-gray-900 dark:text-white">Bonnie Green</span>
                    <span
                        className="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">name@flowbite.com</span>
                </div>
                <ul className="py-1" aria-labelledby="user-menu-button">
                    <li>
                        <Link
                            className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                            to={appLinks.application.path}>{appLinks.application.label}</Link>
                    </li>
                    <li>
                        <a href="#"
                           className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings</a>
                    </li>
                    <li>
                        <Form action="/logout" method="post">
                            <button type="submit"
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <MdLogout size='1.5rem'/>
                                <span className="sr-only">Logout</span>
                            </button>
                        </Form>
                    </li>
                </ul>
            </div>
        </>
    )
}

const AppNavBar = () => {
    return (
        <nav className="border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900 bg-slate-800 p-4 text-white">
            <div className="container flex flex-wrap justify-between items-center mx-auto">
                <AppLogo/>
                <div className="flex items-center md:order-2">

                    {/* <!-- Dropdown menu --> */}
                    <UserMenu/>
                    <button data-collapse-toggle="mobile-menu-2" type="button"
                            className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            aria-controls="mobile-menu-2" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                             xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd"
                                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                  clipRule="evenodd">
                            </path>
                        </svg>
                    </button>
                </div>
                <div className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1"
                     id="mobile-menu-2">
                    <MainMenu/>
                </div>
            </div>
        </nav>
    )
}

export default AppNavBar