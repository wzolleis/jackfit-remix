import {Form, Link, Outlet} from "@remix-run/react";
import {useUser} from "~/utils";

const Dashboard = () => {
    const user = useUser();

    return (
        <div className="flex h-full min-h-screen flex-col">
            <header className="flex items-center justify-between bg-slate-800 p-4 text-white">
                <h1 className="text-3xl font-bold">
                    <Link to=".">Dashboard</Link>
                </h1>
                <p>{user.email}</p>
                <Form action="/logout" method="post">
                    <button
                        type="submit"
                        className="rounded bg-slate-600 py-2 px-4 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
                    >
                        Logout
                    </button>
                </Form>
            </header>

            <main className="flex h-full bg-white">
                <div className="h-full w-80 border-r bg-gray-50">
                    <Link to="admin" className="block p-4 text-xl text-blue-500">
                        Verwaltung
                    </Link>
                    <Link to="equipment" className="block p-4 text-xl text-blue-500">
                        Geräte
                    </Link>
                </div>
                <div className="flex-1 p-6">
                    <Outlet />
                </div>
            </main>
        </div>
    )
}

export default Dashboard