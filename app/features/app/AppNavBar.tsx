import {useState} from "react";
import {Link} from "@remix-run/react";
import {closeIcon, hamburgerIcon} from "~/common/menu/menuIcons";
import {MenuEntry} from "~/features/app/appMenu";

interface AppNavBarProps {
    appMenu: MenuEntry[]
}

const AppNavBar = ({appMenu}: AppNavBarProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuItemClassName = isOpen ? 'block' : 'hidden'
    const hamburgerOrCloseIcon = isOpen ? hamburgerIcon : closeIcon

    return (
        <header className="bg-gray-900 sm:flex sm:justify-between sm:items-center sm:px-4 sm:py-3">
            <div className="flex items-center justify-between px-4 py-3 sm:p-0">
                <div className="flex items-center justify-between">
                    <a href="/">
                        <img src="/img/logo.jpg" className="h-8" alt="Jackfit"/>
                    </a>
                    <span className="text-white px-2 uppercase">Jackfit</span>
                </div>
                <div className="sm:hidden">
                    <button type="button"
                            className="block text-gray-500 hover:text-white focus:text-white focus:outline-none"
                            onClick={() => setIsOpen(!isOpen)}
                    >
                        <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                            <path fillRule='evenodd' d={hamburgerOrCloseIcon}/>
                        </svg>
                    </button>
                </div>
            </div>
            <nav className={`${menuItemClassName} px-2 pt-2 pb-4 sm:flex sm:p-0`}>
                {appMenu.map((menu) =>
                    <Link key={menu.id}
                          className="block px-2 py-1 text-gray-100 font-semibold rounded hover:bg-gray-800 hover:text-yellow-300"
                          to={menu.appLink.path}>
                        {menu.appLink.label}
                    </Link>
                )}
            </nav>
        </header>
    );
}

export default AppNavBar