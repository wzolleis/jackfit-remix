import {Outlet} from "@remix-run/react";
import AppNavBar from "~/features/nav/AppNavBar";
import {appMenu} from "~/features/nav/appMenu";

const Application = () => {
    return (
        <div className="flex h-full min-h-screen flex-col">
            <AppNavBar appMenu={appMenu.app}/>
            <main className="flex h-full">
                <div className="flex-1 p-6">
                    <Outlet/>
                </div>
            </main>
        </div>
    )
}

export default Application