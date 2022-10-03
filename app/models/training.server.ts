import { prisma } from "~/db.server";
import { Training } from "@prisma/client";
import { json } from "@remix-run/node";
import dateUtils from "~/dateUtils";

export type TrainingActionData = {
  executedAt: string | null
  userId: string | null
}

export type SerializableTraining = Omit<Training, "createdAt" | "updatedAt" | "executedAt"> & {
  createdAt: string
  updatedAt: string
  executedAt: string
}

const makeSerializable = (training: Training): SerializableTraining => {
  return {
    ...training,
    createdAt: dateUtils.format(training.createdAt),
    updatedAt: dateUtils.format(training.updatedAt),
    executedAt: dateUtils.format(training.executedAt)
  };
};

export const getTrainings = async (userId: string): Promise<SerializableTraining[]> => {
  const trainings = await prisma.training.findMany({ where: { userId } });
  return trainings.map(makeSerializable);
};

export const getTraining = async (trainingId: string): Promise<SerializableTraining> => {
  const training = await prisma.training.findUnique({
    where: { id: trainingId }
  });

  if (!training) {
    throw new Response("Not Found", {
      status: 404,
      statusText: `Es gibt kein Training mit der ID ${trainingId}`
    });
  }
  return makeSerializable(training);
};

export const createTraining = async (training: Pick<Training, "executedAt" | "userId">) => {
  const errors: TrainingActionData = {
    executedAt: !training.executedAt ? `Ausführungsdatum muss gesetzt sein` : null,
    userId: !training.userId ? `User muss gesetzt sein` : null
  };

  if (Object.values(errors).some(value => value !== null)) {
    return json<TrainingActionData>(errors);
  }
  await prisma.training.create({ data: training });
};

export async function updateTraining(
  id: string,
  training: Pick<Training, "executedAt" | "userId">
) {
  const errors: TrainingActionData = {
    executedAt: !training.executedAt ? `Ausführungsdatum muss gesetzt sein` : null,
    userId: !training.userId ? "User muss gesetzt sein" : null
  };

  if (Object.values(errors).some(value => value !== null)) {
    return json<TrainingActionData>(errors);
  }
  await prisma.training.update({ data: training, where: { id } });
}
