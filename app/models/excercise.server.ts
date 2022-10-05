import { prisma } from "~/db.server";
import { Exercise } from "@prisma/client";

export const getExercises = async (trainingId: string): Promise<Exercise[]> => {
  console.log("getExercises", trainingId);
  return await prisma.exercise.findMany({ where: { trainingId } });
};