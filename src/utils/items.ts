import { Resources } from "@/const/resources";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const getItemsFromDatabase = async (): Promise<Resources> => {
    const items = await prisma.item.findMany({
        include: {
            category: true
        }
    });

    let resources: Resources = {};

    items.forEach((item) => {

        if(typeof resources[item.category.name] === 'undefined') resources[item.category.name] = [];

        resources[item.category.name].push({
            id: item.id,
            name: item.name,
            imageUrl: item.imageUrl,
            scrapValue: item.scrapValue
        })
    })

    return resources;
}

export const saveItemCategories = async (items: Resources) => {

    await prisma.itemCategory.deleteMany({});

    let promises: any[] = [];

    for (let resourceType in items) {
        promises.push(
            prisma.itemCategory.create({
                data: {
                    name: resourceType
                }
            })
        )
    }

    await Promise.all(promises);
}

export const saveItemsInDatabase = async (items: Resources) => {

    const categories = await prisma.itemCategory.findMany({});

    await prisma.item.deleteMany({});

    let promises: any[] = [];

    for (let resourceType in items) {
        items[resourceType].forEach(async (item) => {
            promises.push(
                prisma.item.create({
                    data: {
                        category: {
                            connect: {
                                id: categories.find((category) => category.name === resourceType)?.id
                            }
                        },
                        imageUrl: item.imageUrl,
                        name: item.name,
                        scrapValue: item.scrapValue
                    }
                })
            )
        })
    }

    await Promise.all(promises);
}