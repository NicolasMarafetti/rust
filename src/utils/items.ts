import { Resources } from "@/const/resources";
import { Item, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const calculateItemsPriceFromRecycleValues = async (): Promise<void> => {
    const items = await prisma.item.findMany();

    for (const item of items) {
        // Iteam alreay has a price
        if (item.scrapValue > 0) continue;

        if (item.name === "SMG Body") {
            console.log("item: ", item);
        }

        const recyclers = await prisma.recycler.findMany({
            include: {
                RecyclerYield: {
                    include: {
                        yieldItem: true
                    }
                }
            },
            where: {
                ItemId: item.id
            }
        });

        if (recyclers.length === 0) continue;

        // Test if any recycler item has no scrap value
        let itemValue = 0;

        for (const recycler of recyclers) {

            for (const recyclerYield of recycler.RecyclerYield) {
                if (recyclerYield.yieldItem.scrapValue === 0) continue;

                itemValue += recyclerYield.yieldItem.scrapValue * recyclerYield.quantity;
            }
        }

        await prisma.item.update({
            where: {
                id: item.id
            },
            data: {
                scrapValue: parseFloat((itemValue * 2).toFixed(3))
            }
        })
    }
}

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
                if (costItem) {
                    itemScrapValue += (saleItem.costItemQuantity * costItem.scrapValue) / saleItem.saleItemQuantity;
                    shoppingCount++;
                }
            }
        })

        item.costItems.forEach((costItem) => {
            if (costItem.saleItemId !== scrapItem.id) {
                // Search the cost item value
                const saleItem = items.find((item) => item.id === costItem.saleItemId);
                if (saleItem) {
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

const getItemScrapFromCrafting = async (item: any) => {
    // Item has already a scrap value or has no craft recipe
    if (item.scrapValue !== 0 || item.Craft.length === 0) return;

    let itemScrapValue: number = 0;
    let craftAnalysedQuantity: number = 0;

    // For the moment, we stop the functions if we don't have all ingredients values
    for (const craft of item.Craft) {
        let craftScrapValue: number = 0;

        for (const craftIngredient of craft.CraftIngredient) {
            if (craftIngredient.ingredient.scrapValue === 0) return;

            craftScrapValue += craftIngredient.ingredient.scrapValue * craftIngredient.ingredientQuantity;
        }

        itemScrapValue += craftScrapValue;
        craftAnalysedQuantity++;
    }

    itemScrapValue = itemScrapValue / craftAnalysedQuantity;

    await prisma.item.update({
        where: {
            id: item.id
        },
        data: {
            scrapValue: parseFloat(itemScrapValue.toFixed(3))
        }
    })
}

export const getItemsScrapFromCrafting = async (): Promise<void> => {
    const itemsWithCrafts = await prisma.item.findMany({
        include: {
            Craft: {
                include: {
                    CraftIngredient: {
                        include: {
                            ingredient: true
                        }
                    }
                }
            }
        }
    });

    for (const item of itemsWithCrafts) {
        await getItemScrapFromCrafting(item);
    }
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