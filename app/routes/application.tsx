import {Outlet} from "@remix-run/react";
import AppNavBar from "~/features/app/AppNavBar";
import {appMenu} from "~/features/app/appMenu";

const Application = () => {
    return (
        <div className="flex h-full min-h-screen flex-col">
            <AppNavBar appMenu={appMenu.app}/>
            <main className="flex h-full bg-blue-100">
                <div className="flex-1 p-6">
                    <Outlet/>
                </div>
            </main>
        </div>
    )
}

export default Application