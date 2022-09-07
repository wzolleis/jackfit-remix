import {prisma} from "~/db.server";

export type {Equipment} from "@prisma/client";

export const getEquipments = async () => {
    return prisma.equipment.findMany();
}

export const getEquipment = async (equipmentId: string) => {
    return prisma.equipment.findUnique({
        where: {id: equipmentId}
    })
}