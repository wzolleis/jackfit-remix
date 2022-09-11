import type { Equipment } from "@prisma/client";
import {prisma} from "~/db.server";

export type {Equipment} from "@prisma/client";

export const getEquipments = async () => {
    return prisma.equipment.findMany();
}

export const getEquipment = async (equipmentId: string) => {
    const equipment = await prisma.equipment.findUnique({
        where: {id: equipmentId}
    })

    if (!equipment) {
        throw new Response("Not Found", {
            status: 404,
            statusText: `Es gibt kein Gerät mit der ID ${equipmentId}`
        });
    }

    return equipment
}

export const createEquipment = async (
    equipment: Pick<Equipment, "name" | "muscle_type" | "userId">) => {

    const errors = {
        name: !equipment.name ? `Gerätename muss gesetzt sein` : undefined,
        type: !equipment.muscle_type ? `Gerätetyp muss gesetzt sein`: undefined,
        user: !equipment.userId ? "User muss gesetzt sein" : undefined
    }

    if (Object.values(errors).some(value => value !== undefined)) {
        return {
            equipment: undefined,
            errors
        }
    }

    const created = await prisma.equipment.create({data: equipment})
    return {
        equipment: created,
        errors: undefined
    }
}