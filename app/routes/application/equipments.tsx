import {json} from "@remix-run/node";
import {Outlet, useLoaderData} from "@remix-run/react";
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
            <div>
                Neu
            </div>
            <div className="flex-1 p-6">
                <Outlet/>
            </div>
        </main>
    )
}

export default Equipments