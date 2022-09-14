import type {Equipment} from "@prisma/client";
import {prisma} from "~/db.server";
import {DateTime} from "luxon";

export type {Equipment} from "@prisma/client";
export type SerializableEquipment = Omit<Equipment, "createdAt" | "updatedAt"> & {
    createdAt: string
    updatedAt: string
}

const makeSerializable = (equipment: Equipment) => {
    return {
        ...equipment,
        createdAt: DateTime.fromJSDate(equipment.createdAt).toFormat('dd.MM.yyyy HH:mm'),
        updatedAt: DateTime.fromJSDate(equipment.updatedAt).toFormat('dd.MM.yyyy HH:mm')
    }
}

export const getEquipments = async (): Promise<SerializableEquipment[]> => {
    const equipments = await prisma.equipment.findMany()
    return equipments.map(makeSerializable)
}


export const getEquipment = async (equipmentId: string): Promise<SerializableEquipment> => {
    const equipment = await prisma.equipment.findUnique({
        where: {id: equipmentId},
    })

    if (!equipment) {
        throw new Response("Not Found", {
            status: 404,
            statusText: `Es gibt kein Gerät mit der ID ${equipmentId}`
        });
    }

    return makeSerializable(equipment)
}

export const createEquipment = async (
    equipment: Pick<Equipment, "name" | "muscle_type" | "userId">) => {

    const errors = {
        name: !equipment.name ? `Gerätename muss gesetzt sein` : undefined,
        type: !equipment.muscle_type ? `Gerätetyp muss gesetzt sein` : undefined,
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