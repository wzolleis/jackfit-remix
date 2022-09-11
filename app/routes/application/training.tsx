import {Outlet, useLoaderData} from "@remix-run/react";
import EquipmentCard from "~/features/equipment/EquipmentCard";

// type LoaderData = {
//     equipments: Awaited<ReturnType<typeof getEquipments>>
// }
//
// export const loader = async () => {
//     return json<LoaderData>({
//         equipments: await getEquipments()
//     })
// };


const Training = () => {
    // const {equipments} = useLoaderData<LoaderData>()

    return (
        <main>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Training - noch nicht implementiert !!!
            </h5>
                <div className="flex-1 p-6">
                    <Outlet/>
                </div>
        </main>

)
}

export default Training