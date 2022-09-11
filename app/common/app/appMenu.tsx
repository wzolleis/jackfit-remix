import {Link} from "@remix-run/react";
import {appLinks} from "~/common/app/appLinks";

const AppMenu = () => {
    return (
            <div className="h-full w-80 border-r bg-gray-50">
                <Link to={appLinks.application.equipment.path} className="block p-4 text-xl text-blue-500">
                    {appLinks.application.equipment.label}
                </Link>
                <Link to={appLinks.application.training.path} className="block p-4 text-xl text-blue-500">
                    {appLinks.application.training.label}
                </Link>
                <Link to="/admin" className="block p-4 text-xl text-blue-500">
                    Verwaltung
                </Link>
                <Link to="/notes" className="block p-4 text-xl text-blue-300">
                    Notes
                </Link>
            </div>

    )
}

export default AppMenu