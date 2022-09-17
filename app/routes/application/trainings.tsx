import {Outlet} from "@remix-run/react";

const Trainings = () => {
    return (
        <main>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-300">
                Training - noch nicht implementiert !!!
            </h5>
            <div className="flex-1 p-6">
                <Outlet/>
            </div>
        </main>
    )
}

export default Trainings