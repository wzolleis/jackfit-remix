import { useOptionalUser } from "~/utils";
import { Outlet } from "@remix-run/react";
import AppNavBar from "~/features/nav/AppNavBar";
import { appMenu } from "~/features/nav/appMenu";

const Application = () => {
  const user = useOptionalUser();

  return (
    <>
      <div className="w-full flex flex-col sm-flex-row sm:flex-nowrap py-4">
        <AppNavBar appMenu={appMenu.app} user={user} />
        <div className="flex flex-col sm:flex-row">
          <div className="p-2">
            <ul>
              <li>
                <a href="#">
                  Sidenav link 1
                </a>
              </li>
            </ul>
          </div>
          <div className="flex flex-col justify-items-stretch w-full h-full ml-2 mr-2">
            <div className="flex flex-col bg-red-50" />
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};


// const Application = () =>
// {
//   const user = useOptionalUser();
//
//   return (
//     <div className="flex h-full min-h-screen flex-col">
//       <AppNavBar appMenu={appMenu.app} user={user} />s
//       <main className="flex h-full">
//         <div className="flex-1 p-6">
//           <AppSideBar/>
//           <Outlet />
//         </div>
//       </main>
//     </div>
//     )
// }

export default Application;