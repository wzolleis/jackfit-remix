import {Outlet} from "@remix-run/react";
import AppNavBar from "~/features/app/AppNavBar";

const Admin = () => {
    return (
        <div className="flex h-full min-h-screen flex-col">
            <AppNavBar/>
            <main className="flex h-full bg-blue-100">
                <div className="flex-1 p-6">
                    <h1>ADMIN !!!</h1>
                    <Outlet/>
                </div>
            </main>
        </div>
    )
}

export default Admin