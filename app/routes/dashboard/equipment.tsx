import {json} from "@remix-run/node";
import {Outlet, useLoaderData} from "@remix-run/react";
import {getEquipments} from "~/models/equipment.server"
import EquipmentCard from "~/equipment/EquipmentCard";

type LoaderData = {
    equipments: Awaited<ReturnType<typeof getEquipments>>
}

export const loader = async () => {
    return json<LoaderData>({
        equipments: await getEquipments()
    })
};


const Equipment = () => {
    const {equipments} = useLoaderData<LoaderData>()

    return (
        <main>
            <div className="overflow-x-auto">
                <ul className="flex flex-row gap-2">
                    {equipments.map((equipment) => (
                        <li key={equipment.id}>
                            <EquipmentCard equipment={equipment}/>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex-1 p-6">
                <Outlet/>
            </div>
        </main>

    )
}

export default Equipment