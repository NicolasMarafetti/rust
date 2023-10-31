import { Resources } from "@/const/resources";
import { Item, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const calculateItemsScrapValueFromShoppingFromOtherItems = async (): Promise<void> => {

    let itemsModified: number = 0;

    const items = await prisma.item.findMany({
        include: {
            saleItems: true,
            costItems: true
        }
    });

    const scrapItem = items.find((item) => item.name === "Scrap");
    if (!scrapItem) throw new Error("Scrap item not found");

    let promises: any[] = [];

    items.forEach((item) => {
        if (item.id === scrapItem.id) return;
        if (item.scrapValue !== 0) return;

        if (item.saleItems.length === 0 && item.costItems.length === 0) return;

        let itemScrapValue: number = 0;
        let shoppingCount: number = 0;

        item.saleItems.forEach((saleItem) => {
            if (saleItem.costItemId !== scrapItem.id) {
                // Search the cost item value
                const costItem = items.find((item) => item.id === saleItem.costItemId);
                if (!costItem) {
                    console.log("Cost item not found");
                    console.log("Item id: " + saleItem.costItemId);
                } else {
                    itemScrapValue += (saleItem.costItemQuantity * costItem.scrapValue) / saleItem.saleItemQuantity;
                    shoppingCount++;
                }
            }
        })

        item.costItems.forEach((costItem) => {
            if (costItem.saleItemId !== scrapItem.id) {
                // Search the cost item value
                const saleItem = items.find((item) => item.id === costItem.saleItemId);
                if (!saleItem) {
                    console.log("sale item not found");
                    console.log("Item id: " + costItem.saleItemId);
                } else {
                    itemScrapValue += (costItem.saleItemQuantity * saleItem.scrapValue) / costItem.costItemQuantity;
                    shoppingCount++;
                }
            }
        })

        if (shoppingCount > 0) {
            itemScrapValue = itemScrapValue / shoppingCount;
            promises.push(
                prisma.item.update({
                    where: {
                        id: item.id
                    },
                    data: {
                        scrapValue: parseFloat(itemScrapValue.toFixed(3))
                    }
                })
            )
            itemsModified++;
        }
    })

    await Promise.all(promises);

    console.log("items quantity modified: ", itemsModified);
}

export const calculateItemsScrapValueFromShopping = async (): Promise<void> => {
    const items = await prisma.item.findMany({
        include: {
            saleItems: true,
            costItems: true
        }
    });

    const scrapItem = items.find((item) => item.name === "Scrap");
    if (!scrapItem) throw new Error("Scrap item not found");

    let promises: any[] = [];

    items.forEach((item) => {
        if (item.id === scrapItem.id) return;

        if (item.saleItems.length === 0 && item.costItems.length === 0) return;

        let itemScrapValue: number = 0;
        let shoppingCount: number = 0;

        item.saleItems.forEach((saleItem) => {
            if (saleItem.costItemId === scrapItem.id) {
                itemScrapValue += saleItem.costItemQuantity / saleItem.saleItemQuantity;
                shoppingCount++;
            }
        })

        item.costItems.forEach((costItem) => {
            if (costItem.saleItemId === scrapItem.id) {
                itemScrapValue += costItem.saleItemQuantity / costItem.costItemQuantity;
                shoppingCount++;
            }
        })

        if (shoppingCount > 0) {
            itemScrapValue = itemScrapValue / shoppingCount;
            promises.push(
                prisma.item.update({
                    where: {
                        id: item.id
                    },
                    data: {
                        scrapValue: parseFloat(itemScrapValue.toFixed(3))
                    }
                })
            )
        }
    })

    await Promise.all(promises);
}

export const getItemsFromDatabase = async (): Promise<Item[]> => {
    return await prisma.item.findMany();
}

export const getItemsFromDatabaseOrderedByCategory = async (): Promise<Resources> => {
    const items = await prisma.item.findMany({
        include: {
            category: true
        }
    });

    let resources: Resources = {};

    items.forEach((item) => {

        if (typeof resources[item.category.name] === 'undefined') resources[item.category.name] = [];

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

export const searchItemIdFromName = async (itemName: string): Promise<string | null> => {
    const item = await prisma.item.findFirst({
        where: {
            name: itemName
        }
    });

    return item?.id || null;
}