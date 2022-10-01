import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData, useParams } from "@remix-run/react";
import { getEquipments, SerializableEquipment } from "~/models/equipment.server";

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
    <ul className="md:w-1/2 px-2">
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
      <div>
        <Link to="new"
              className="my-2 py-2 hover:bg-gray-500 mr-2">
          <i className="fa-solid fa-square-plus" />
        </Link>
        <Link to="remove"
              className="my-2 py-2 hover:bg-gray-500">
          <i className="fa-solid fa-square-minus" />
        </Link>
      </div>
    </ul>
  );
};


const Equipments = () => {
  const { equipments } = useLoaderData<LoaderData>();
  const params = useParams();
  const equipmentId = params.equipmentId;

  return (
    <main className="flex:col w-full h-full">
      <div className="mb-2 p-2 bg-gray-300">
        <EquipmentList equipments={equipments} activeEquipment={equipmentId} />
      </div>
      <Outlet />
    </main>
  );
};

export default Equipments;