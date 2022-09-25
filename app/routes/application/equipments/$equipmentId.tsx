import {json, LoaderFunction} from "@remix-run/node";
import {getEquipment} from "~/models/equipment.server";
import invariant from "tiny-invariant";
import {useCatch, useLoaderData} from "@remix-run/react";
import CatchView from "~/features/errorhandling/CatchView";
import {ThrownResponse} from "@remix-run/react/dist/errors";

type LoaderData = {
    equipment: Awaited<ReturnType<typeof getEquipment>>
}

export const loader: LoaderFunction = async ({params: {equipmentId}}) => {
    invariant(equipmentId, "Expected params.equipmentId");
    return json<LoaderData>({
        equipment: await getEquipment(equipmentId)
    })
};

export const CatchBoundary = () => {
    const {status, statusText} = useCatch<ThrownResponse<number, LoaderData>>();

    return (
        <CatchView statusText={statusText} status={status}/>
    );
}

const EquipmentDetails = () => {
    const {equipment} = useLoaderData<LoaderData>()

    return (
        <div>
            <h1>{equipment.name}</h1>
        </div>
    )
}

export default EquipmentDetails