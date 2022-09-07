import {json} from "@remix-run/node";
import {Link, Outlet, useLoaderData} from "@remix-run/react";
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
    console.log(equipments)

    return (
        <main>
            <ul className="flex flex-row gap-2">
                {equipments.map((equipment) => (
                    <li key={equipment.id}>
                        <EquipmentCard equipment={equipment}/>
                    </li>
                ))}
            </ul>

            <div className="flex-1 p-6">
                <Outlet />
            </div>
        </main>
    )
}

export default Equipment