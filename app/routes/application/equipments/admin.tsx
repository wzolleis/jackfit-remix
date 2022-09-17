import {json, LoaderFunction} from "@remix-run/node";
import {getEquipments} from "~/models/equipment.server";
import {Link, useCatch, useLoaderData} from "@remix-run/react";
import CatchView from "~/features/errorhandling/CatchView";

type LoaderData = {
    equipments: Awaited<ReturnType<typeof getEquipments>>
}

export const loader: LoaderFunction = async () => {
    return json<LoaderData>({
        equipments: await getEquipments()
    })
};

export const CatchBoundary = () => {
    const {status, statusText} = useCatch();

    return (
        <CatchView statusText={statusText} status={status}/>
    );
}

const EquipmentAdmin = () => {
    const {equipments} = useLoaderData<LoaderData>()

    return (
        <div>
            <h1>ADMIN !!</h1>
            {
                equipments.map(equipment => {
                    return (
                        <Link key={equipment.id} to={equipment.id}>{equipment.name}</Link>
                    )
                })
            }
        </div>
    )
}

export default EquipmentAdmin