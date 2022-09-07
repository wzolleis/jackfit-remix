import {json} from "@remix-run/node";
import {Link, useLoaderData} from "@remix-run/react";
import {getEquipments} from "~/models/equipment.server"

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
            <h1>Equipments</h1>
            <ul>
                {equipments.map((equipment) => (
                    <li key={equipment.id}>
                        <Link
                            to={equipment.id}
                            className="text-blue-600 underline"
                        >
                            {equipment.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </main>
    )
}

export default Equipment