import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData, useParams } from "@remix-run/react";
import { getEquipments } from "~/models/equipment.server";

type LoaderData = {
  equipments: Awaited<ReturnType<typeof getEquipments>>
}

export const loader = async () => {
  return json<LoaderData>({
    equipments: await getEquipments()
  });
};


const Equipments = () => {
  const { equipments } = useLoaderData<LoaderData>();
  const params = useParams();
  const equipmentId = params.equipmentId;

  console.log("params", params);

  return (
    <main className="flex:col md:flex">
      <div className="w-auto h-full md:w-1/4 mb-2 md:mr-2 p-2 bg-gray-300">
        <ul className="mb-4">
          {equipments.map((equipment) => {
              let fontStyle = equipment.id === equipmentId ? "font-bold" : "font-medium";
              return (
                <li key={equipment.id} className="hover:bg-gray-400">
                  <Link to={equipment.id}
                        className={`items-center justify-center ${fontStyle}`}>
                    {equipment.name}
                  </Link>
                </li>
              );
            }
          )}
        </ul>

        <div className="text-right">
          <Link to="new"
                className="rounded inline-block px-6 py-2 text-xs font-medium leading-6 text-center text-blue-600 uppercase transition bg-transparent border-2 border-blue-500 ripple hover:bg-blue-600 hover:text-white focus:outline-none">
            Neu
          </Link>
        </div>
      </div>
      <div className="md:w-full">
        <Outlet />
      </div>
    </main>
  );
};

export default Equipments;