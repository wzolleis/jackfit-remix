import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData, useParams } from "@remix-run/react";
import { getEquipments, SerializableEquipment } from "~/models/equipment.server";
import messages from "~/features/i18n/messages";

type LoaderData = {
  equipments: Awaited<ReturnType<typeof getEquipments>>
}

export const loader = async () => {
  return json<LoaderData>({
    equipments: await getEquipments()
  });
};

type EquipmentListProps = { equipments: SerializableEquipment[], activeEquipment?: string }
const EquipmentList = ({ equipments, activeEquipment }: EquipmentListProps) => {
  return (
    <div className="mb-2 p-2 bg-gray-300 overflow-auto">
      <ul className="mb-2">
        {equipments.map((equipment) => {
            const fontStyle = equipment.id === activeEquipment ? "font-bold" : "font-medium";
            return (
              <li key={equipment.id} className="hover:bg-gray-400 hover:text-white">
                <Link to={equipment.id}
                      className={`items-center justify-center ${fontStyle}`}>
                  {equipment.name}
                </Link>
              </li>
            );
          }
        )}
      </ul>
      <Link to="new"
            className="p-2 hover:bg-gray-100 rounded mb-2 outline-gray-200 border-gray-300">
        <i className="fa-solid fa-square-plus" />
        <span className="m-2">{messages.equipments.new}</span>
      </Link>
    </div>
  );
};


const Equipments = () => {
  const { equipments } = useLoaderData<LoaderData>();
  const params = useParams();
  const equipmentId = params.equipmentId;

  return (
    <main className="flex:col w-full h-full">
      <EquipmentList equipments={equipments} activeEquipment={equipmentId} />
      <Outlet />
    </main>
  );
};

export default Equipments;