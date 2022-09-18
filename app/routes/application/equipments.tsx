import {json} from "@remix-run/node";
import {Link, Outlet, useLoaderData} from "@remix-run/react";
import {getEquipments} from "~/models/equipment.server"
import EquipmentCard from "~/features/equipment/EquipmentCard";

type LoaderData = {
    equipments: Awaited<ReturnType<typeof getEquipments>>
}

export const loader = async () => {
    return json<LoaderData>({
        equipments: await getEquipments()
    })
};


const Equipments = () => {
    const {equipments} = useLoaderData<LoaderData>()

    return (
        <main>
            <div className="overflow-auto">
                <ul className="flex sm:flex-row flex-col gap-2">
                    {equipments.map((equipment) => (
                        <li key={equipment.id}>
                            <EquipmentCard equipment={equipment}/>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex py-2">
                <Link to="new"
                      className="items-center justify-center rounded-md bg-gray-900 px-4 py-3 font-medium text-white hover:bg-yellow-600">
                    <i className="fa-solid fa-square-plus mr-2"></i>
                    Neu
                </Link>
            </div>
            <div className="flex-1 p-6">
                <Outlet/>
            </div>
        </main>
    )
}

export default Equipments