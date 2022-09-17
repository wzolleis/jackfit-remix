import {Link} from "@remix-run/react";
import {SerializableEquipment} from "~/models/equipment.client";

interface EquipmentCardProps {
    equipment: SerializableEquipment
}

const EquipmentCard = ({equipment}: EquipmentCardProps) => {
    return (
        <div className="block p-6 max-w-sm text-white rounded-lg border shadow-md bg-gray-900 border-gray-700 hover:text-yellow-300">
            <h5 className="mb-2 text-2xl font-bold tracking-tight">
                {equipment.name}
            </h5>
            <p>
                <Link to={equipment.id} className="font-normal underline">
                    Details
                </Link>
            </p>
        </div>
    )
}

export default EquipmentCard
