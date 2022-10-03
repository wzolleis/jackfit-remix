import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  const email = "jack@jack.de";

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
  });
  await prisma.equipment.deleteMany({
    where: {
      OR: [
        { name: { startsWith: "Test" } },
        { test: true }
      ]
    }
  }).catch(() => {
  });

  const hashedPassword = await bcrypt.hash("jackjack", 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword
        }
      }
    }
  });

  console.log("created user with id: ", user.id);

  const equipmentsData = [
    {
      name: "Test_Chest Press",
      muscle: "Chest",
      test: true
    },
    {
      name: "Test_Butterfly",
      muscle: "Chest",
      test: true
    },
    {
      name: "Test_Shoulder Press",
      muscle: "Shoulder",
      test: true
    },
    {
      name: "Test_Arm Curl",
      muscle: "Arms",
      test: true
    }
  ];
  const equipments = await Promise.all(equipmentsData.map((equipment) => prisma.equipment.create({ data: equipment })));
  console.log("created equipments");

  const trainingData = {
    userId: user.id,
    executedAt: new Date()
  };
  const training = await prisma.training.create({ data: trainingData });
  console.log("created training");

  const exerciseSet = await prisma.exerciseSet.create({ data: {} });


  const exerciseData = {
    weight: 25.0,
    notes: "Das ist ein Test",
    trainingType: "Weight",
    repeatCount: 20,
    equipmentId: equipments[0].id,
    trainingId: training.id,
    excerciseSetId: exerciseSet.id
  };

  await prisma.exercise.create({ data: exerciseData });

  console.log("created exercise");

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
