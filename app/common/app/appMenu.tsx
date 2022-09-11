import {appLinks} from "~/common/app/appLinks";

// const AppMenu = () => {
//     return (
//             <div className="h-full w-80 border-r bg-gray-50">
//                 <Link to={appLinks.application.equipment.path} className="block p-4 text-xl text-blue-500">
//                     {appLinks.application.equipment.label}
//                 </Link>
//                 <Link to={appLinks.application.training.path} className="block p-4 text-xl text-blue-500">
//                     {appLinks.application.training.label}
//                 </Link>
//                 <Link to="/admin" className="block p-4 text-xl text-blue-500">
//                     Verwaltung
//                 </Link>
//                 <Link to="/notes" className="block p-4 text-xl text-blue-300">
//                     Notes
//                 </Link>
//             </div>
//
//     )
// }

export const appMenu = [
    {
        id: "49331f29-6465-4c01-975d-bef01371d3fb",
        path: appLinks.application.equipment.path,
        label: appLinks.application.equipment.label
    },
    {
        id: "52cd654e-9c65-4318-ac5c-4bf0b0d77038",
        path: appLinks.application.training.path,
        label: appLinks.application.training.label
    },
    {
        id: "2d193f39-b6a9-4019-afc3-e12c56fe3770",
        path: appLinks.admin.path,
        label: appLinks.admin.label
    }
]



