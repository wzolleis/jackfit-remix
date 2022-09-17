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
            <div className="overflow-x-auto">
                <ul className="flex flex-col gap-2">
                    {
                        equipments.map(equipment => {
                            return (
                                <li key={equipment.id}>
                                    <Link  to={equipment.id}>{equipment.name}</Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>

        </div>
    )
}

export default EquipmentAdmin