import {PrismaClient} from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
    const email = "jack@jack.de";

    // cleanup the existing database
    await prisma.user.delete({where: {email}}).catch(() => {});
    await prisma.equipment.deleteMany({where: {name: {startsWith: 'Test'}}}).catch(() => {});

    const hashedPassword = await bcrypt.hash("jackjack", 10);

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
            name: "Test_Chest Press",
            muscle: "Chest",
        },
        {
            name: "Test_Butterfly",
            muscle: "Chest",
        }
    ]

    await Promise.all(equipments.map((equipment) => prisma.equipment.create({data: equipment})))

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
