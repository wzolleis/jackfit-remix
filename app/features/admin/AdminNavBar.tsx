import {useState} from "react";
import {Link} from "@remix-run/react";
import {appMenu} from "~/features/app/appMenu";

const MainMenu = () => {
    return (
        <>
            {appMenu.map((menu) =>
                <Link key={menu.id} className="block px-2 py-1 text-gray-100 font-semibold rounded hover:bg-gray-800 hover:text-yellow-300"
                      to={menu.path}>
                    {menu.label}
                </Link>
            )}
        </>
    )
}

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const menuItemClassName = isOpen ? 'block' : 'hidden'
    return (
        <>
            <header className="bg-gray-900 sm:flex sm:justify-between sm:items-center sm:px-4 sm:py-3">
                <div className="flex items-center justify-between px-4 py-3 sm:p-0">
                    <div className="flex items-center justify-between">
                        <a href="/public">
                            <img src="/img/logo.jpg" className="h-8" alt="Jackfit"/>
                        </a>
                        <span className="text-white px-2">Jackfit</span>
                    </div>
                    <div className="sm:hidden">
                        <button type="button"
                                className="block text-gray-500 hover:text-white focus:text-white focus:outline-none"
                                onClick={() => setIsOpen(!isOpen)}
                        >
                            <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                                {isOpen && <path fillRule="evenodd"
                                                 d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"/>
                                }
                                {
                                    !isOpen && <path fillRule="evenodd"
                                                     d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"/>
                                }
                            </svg>
                        </button>
                    </div>
                </div>
                <nav className={`${menuItemClassName} px-2 pt-2 pb-4 sm:flex sm:p-0`}>
                    <MainMenu/>
                </nav>
            </header>
        </>
    );
}

export default NavBar