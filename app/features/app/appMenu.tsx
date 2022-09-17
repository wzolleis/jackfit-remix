import {AppLink, appLinks} from "~/features/app/appLinks";

export type MenuEntry = {
    id: string
    appLink: AppLink
}

export const appMenu: { app: MenuEntry[], admin: MenuEntry[] } = {
    app: [
        {
            id: "49331f29-6465-4c01-975d-bef01371d3fb",
            appLink: appLinks.application.equipment
        },
        {
            id: "52cd654e-9c65-4318-ac5c-4bf0b0d77038",
            appLink: appLinks.application.training
        },
        {
            id: "2d193f39-b6a9-4019-afc3-e12c56fe3770",
            appLink: appLinks.admin
        }
    ],
    admin: [
        {
            id: "ba31d8fe-6d36-4585-9784-e68945a64f6d",
            appLink: appLinks.application.equipment
        },
    ]
}



