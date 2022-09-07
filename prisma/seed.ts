import {PrismaClient, Equipment} from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
    const email = "rachel@remix.run";

    // cleanup the existing database
    await prisma.user.delete({where: {email}}).catch(() => {
        // no worries if it doesn't exist yet
    });

    const hashedPassword = await bcrypt.hash("racheliscool", 10);

    const user = await prisma.user.create({
        data: {
            email,
            password: {
                create: {
                    hash: hashedPassword,
                },
            },
        },
    });

    console.log('created user with id: ', user.id)

    const equipments = [
        {
            name: "Chest Press",
            muscle_type: "Chest",
            userId: user.id
        },
        {
            name: "Butterfly",
            muscle_type: "Chest",
            userId: user.id
        }
    ]

    await Promise.all(equipments.map((equipment) => prisma.equipment.create( {data: equipment})))

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
