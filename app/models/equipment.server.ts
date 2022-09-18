import type {Equipment} from "@prisma/client";
import {prisma} from "~/db.server";
import {DateTime} from "luxon";
import {json} from "@remix-run/node";

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

export type ActionData = {
    name: string | null
    type: string | null
    user: string | null
}

export const createEquipment = async (equipment: Pick<Equipment, "name" | "muscle_type" | "userId">) => {
    const errors: ActionData = {
        name: !equipment.name ? `Gerätename muss gesetzt sein` : null,
        type: !equipment.muscle_type ? `Gerätetyp muss gesetzt sein` : null,
        user: !equipment.userId ? "User muss gesetzt sein" : null
    }

    if (Object.values(errors).some(value => value !== null)) {
        return json<ActionData>(errors)
    }
    await prisma.equipment.create({data: equipment})
}