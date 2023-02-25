import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient({ log: ["query"] });

const main = async () => {
    await prismaClient.preferences.deleteMany();
    await prismaClient.user.deleteMany();

    await prismaClient.user.create({
        data: {
            name: "Venkatesh",
            email: "venkatesh@email.com",
            preferences: {
                create: {
                    emailUpdates: true,
                },
            },
        },
    });

    await prismaClient.user.createMany({
        data: [
            {
                name: "Balaji",
                email: "balaji@email.com",
            },
            {
                name: "Nirosha",
                email: "nirosha@email.com",
            },
            {
                name: "Chandraiah",
                email: "chandraiah@email.com",
            },
            {
                name: "Lakshmi Devi",
                email: "lakshmi.devi@email.com",
            },
        ],
    });

    const user = await prismaClient.user.findUnique({
        where: { email: "balaji@email.com" },
    });

    const users = await prismaClient.user.findMany({
        take: 2,
        skip: 0,
        orderBy: { createdAt: "desc" },
    });
    await prismaClient.user.findMany({
        where: {
            name: {equals: "venkatesh"}
        },
        take: 2,
        skip: 0,
        orderBy: { createdAt: "desc" },
    });
    const preferences = await prismaClient.preferences.findMany();

    console.info(user);
    console.info(users);
    console.info(preferences);
};

main()
    .then()
    .catch()
    .finally(() => {
        prismaClient.$disconnect();
    });
