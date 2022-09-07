import {json, LoaderFunction} from "@remix-run/node";
import {getEquipment} from "~/models/equipment.server";
import invariant from "tiny-invariant";
import {useLoaderData} from "@remix-run/react";

type LoaderData = {
    equipment: Awaited<ReturnType<typeof getEquipment>>
}

export const loader: LoaderFunction = async ({params: {equipmentId}}) => {
    invariant(equipmentId, "Expected params.equipmentId");
    return json<LoaderData>({
        equipment: await getEquipment(equipmentId)
    })
};

const EquipmentDetails = () => {
    const {equipment} = useLoaderData<LoaderData>()

    // todo - equipment === null --> not found

    return (
        <div>
            <h1>{equipment.name}</h1>
        </div>
    )
}

export default EquipmentDetails