import { Resource, Resources } from '@/const/resources';
import { JSDOM } from 'jsdom';
import { getItemsFromDatabase, searchItemIdFromName } from './items';
import { Item, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createCraftIngredient(ingredientName: string, ingredientSelector: any, craft: any): Promise<void> {
    const ingredientId = await searchItemIdFromName(ingredientName);
    if (!ingredientId) return;

    const ingredientQuanitySpan = ingredientSelector.querySelector('.text-in-icon')?.textContent || null;
    const ingredientQuantity = ingredientQuanitySpan ? parseInt(ingredientQuanitySpan.trim().replace('×', '')) : 1;

    try {
        await prisma.craftIngredient.create({
            data: {
                craft: {
                    connect: {
                        id: craft.id
                    }
                },
                ingredient: {
                    connect: {
                        id: ingredientId
                    }
                },
                ingredientQuantity: ingredientQuantity
            }
        })
    } catch (error) {
        console.log(error);
        console.log("ingredientSelector: ", ingredientSelector);
        console.log("ingredientQuanitySpan: ", ingredientQuanitySpan);
        console.log("craft: ", craft);
        console.log("ingredientQuantity: ", ingredientQuantity);
    }
}

async function createCraftAndIngredients(craftedItemId: string, craftedItemQuantity: number, duration: number, workbenchLevel: number, exchangeTr: any): Promise<void> {
    const craft = await prisma.craft.create({
        data: {
            craftedItem: {
                connect: {
                    id: craftedItemId
                }
            },
            craftedItemQuantity,
            duration,
            workbenchLevel
        }
    })

    // Ingredients
    let ingredientPromises: Promise<any>[] = [];
    const ingredientsSelectors = exchangeTr.querySelectorAll('td:nth-child(3) > a');
    ingredientsSelectors.forEach((ingredientSelector: any) => {
        const ingredientName: string = ingredientSelector.querySelector('img')?.getAttribute('alt') || '';
        if (ingredientName) {
            ingredientPromises.push(createCraftIngredient(ingredientName, ingredientSelector, craft));
        }
    })
}

async function createPrismaShoppingFromRustlabsData(shopName: string, saleItemName: string, saleItemQuantity: number, costItemName: string, costItemQuantity: number): Promise<void> {
    const saleItemId = await searchItemIdFromName(saleItemName);
    const costItemId = await searchItemIdFromName(costItemName);

    if (saleItemId === null || costItemId === null) {
        console.debug("createPrismaShoppingFromRustlabsData unexpected error");
        console.debug(`Could not find item id for ${saleItemName} or ${costItemName}`);
        return;
    }

    await prisma.shopping.create({
        data: {
            shopName,
            saleItemId,
            saleItemQuantity,
            costItemId,
            costItemQuantity
        }
    });
}

async function getCategoriesFromRustLabs(): Promise<string[]> {
    const pageUrl = 'https://rustlabs.com/';

    const response = await fetch(pageUrl);
    const data = await response.text();

    const dom = new JSDOM(data);

    const categoryElements = dom.window.document.querySelectorAll('#main-menu > li:first-of-type ul li a');
    const categories: string[] = Array.from(categoryElements).map((categoryElement: any) => categoryElement.getAttribute('href').replace('/group=', ''));

    return categories;
}

async function getCategoryItemsFromRustlabs(category: string): Promise<Resource[]> {
    const pageUrl = `https://rustlabs.com/group=${category}`;

    const response = await fetch(pageUrl);
    const data = await response.text();

    const dom = new JSDOM(data);

    const itemLinkElements = dom.window.document.querySelectorAll('.info-block > a');

    const items: Resource[] = Array.from(itemLinkElements).map((itemLinkElement: any) => {
        const itemId = itemLinkElement.getAttribute('href').replace('/item/', '');
        const itemName = itemLinkElement.querySelector('.r-cell')?.textContent;
        const itemImageUrl = itemLinkElement.querySelector('img')?.getAttribute('src').replace('//', 'https://www.');

        return {
            id: itemId,
            imageUrl: itemImageUrl,
            name: itemName,
            scrapValue: 0
        }
    })

    return items;
}

function getCraftDurationFromRustLabs(exchangeTr: any, craftedItemId: string): number {
    const durationTd = exchangeTr.querySelector('td:nth-child(4)');
    const rawDuration = durationTd.textContent || null;
    if (!rawDuration) {
        console.log("duration not found");
        return 0;
    }
    let matches = rawDuration.match(/\d+/g);

    if (matches) {
        if (matches.length > 1) {
            return parseInt(matches[1])
        } else {
            return parseInt(matches[0])
        }
    } else {
        console.log("Number not found");
        console.log("craftedItemId: ", craftedItemId);
        return 0;
    }
}

export const getCraftsFromRustlabs = async (getItemCraftsAlreadyRecovered: boolean = true) => {

    // Clean the craft databases
    if (getItemCraftsAlreadyRecovered) await prisma.craft.deleteMany();

    const items = await prisma.item.findMany({
        include: {
            Craft: true
        }
    });

    const itemsToCheck = getItemCraftsAlreadyRecovered ? items : items.filter(item => item.Craft.length === 0);

    for (const item of itemsToCheck) {
        await getItemCraftFromRustLabsToDatabase(item);
    }
}

async function getItemCraftFromRustLabsToDatabase(item: Item): Promise<void> {
    const pageUrl = `https://rustlabs.com/item/${getItemUrlName(item.name)}#tab=craft`;

    const response = await fetch(pageUrl);
    const data = await response.text();

    const dom = new JSDOM(data);

    const exchangeDiv = dom.window.document.querySelector('div[data-name="craft"]');

    if (!exchangeDiv) return;

    const exchangesTrs = exchangeDiv.querySelectorAll('tbody tr');

    for (const exchangeTr of Array.from(exchangesTrs)) {
        const bluePrintName = exchangeTr.querySelector('td:nth-child(2)')?.getAttribute('data-value') || '';

        if (bluePrintName.includes(item.name)) {
            // Crafted item informations
            const quantitySpan = exchangeTr.querySelector('.item-cell .text-in-icon')?.textContent || null;
            const craftedQuantity = quantitySpan ? parseInt(quantitySpan.trim().replace('×', '')) : 1;

            // Duration
            const craftDuration = getCraftDurationFromRustLabs(exchangeTr, bluePrintName);

            // Workbench level
            let workbenchLevel = exchangeTr.querySelector('td:nth-child(5) .text-in-icon')?.textContent || 0;
            if (typeof workbenchLevel === 'string') workbenchLevel = workbenchLevel.length;

            await createCraftAndIngredients(item.id, craftedQuantity, craftDuration, workbenchLevel, exchangeTr);
        }
    };
}

export async function getItemsFromRustlabs(): Promise<Resources> {
    let resources: Resources = {};

    const categories = await getCategoriesFromRustLabs();

    // Create an array of promises, one for each category
    const categoryPromises = categories.map(async (category) => {
        resources[category] = await getCategoryItemsFromRustlabs(category);
    });

    // Wait for all promises to resolve
    await Promise.all(categoryPromises);

    return resources;
}

function getItemUrlName(itemName: string): string {
    return itemName.toLowerCase().replaceAll(' ', '-');
}

async function getItemScrapPriceFromRustLabsToDatabase(item: Item): Promise<void> {
    const pageUrl = `https://rustlabs.com/item/${getItemUrlName(item.name)}#tab=exchange`;

    const response = await fetch(pageUrl);
    const data = await response.text();

    const dom = new JSDOM(data);

    const exchangeDiv = dom.window.document.querySelector('div[data-name="exchange"]');

    if (!exchangeDiv) return;

    const exchangesTrs = exchangeDiv.querySelectorAll('tbody tr');

    Array.from(exchangesTrs).forEach((exchangeTr) => {
        console.log("exchangeTr.innerHTML", exchangeTr.innerHTML);
    });
}

export async function getItemsScrapPriceFromRustLabsToDatabase(): Promise<void> {
    const items = await getItemsFromDatabase();

    let promises: Promise<void>[] = [];

    items.forEach(item => {
        promises.push(getItemScrapPriceFromRustLabsToDatabase(item));
    })

    await Promise.all(promises);
}

async function getItemShoppingListFromRustLabs(item: Item): Promise<void> {
    const pageUrl = `https://rustlabs.com/item/${getItemUrlName(item.name)}#tab=exchange`;

    const response = await fetch(pageUrl);
    const data = await response.text();

    const dom = new JSDOM(data);

    const exchangeDiv = dom.window.document.querySelector('div[data-name="exchange"]');

    if (!exchangeDiv) return;

    const exchangesTrs = exchangeDiv.querySelectorAll('tbody tr');

    let promises: Promise<any>[] = [];

    Array.from(exchangesTrs).forEach((exchangeTr) => {
        const shopName: string = exchangeTr.querySelector('td:nth-child(1)')?.textContent || '';

        // Sale Item
        const saleItemName: string = exchangeTr.querySelector('td:nth-child(2) img')?.getAttribute('title') || '';
        const saleItemQuantityRaw: string = exchangeTr.querySelector('td:nth-child(2) .text-in-icon')?.textContent || '1';
        const saleItemQuantityFiltered: string = saleItemQuantityRaw.replace('×', '').replace(',', '').trim();
        const saleItemQuantity: number = parseInt(saleItemQuantityFiltered);

        // Cost Item
        const costItemName: string = exchangeTr.querySelector('td:nth-child(3) img')?.getAttribute('title') || '';
        const costItemQuantityRaw: string = exchangeTr.querySelector('td:nth-child(3) .text-in-icon')?.textContent || '1';
        const costItemQuantityFiltered: string = costItemQuantityRaw.replace('×', '').replace(',', '').trim();
        const costItemQuantity: number = parseInt(costItemQuantityFiltered);

        if (!saleItemName || !saleItemQuantity || !costItemName || !costItemQuantity) {
            console.debug("Problem for item: ", item);
            console.debug("shopName: ", shopName);
            console.debug("saleItemName: ", saleItemName);
            console.debug("saleItemQuantityRaw: ", saleItemQuantityRaw);
            console.debug("saleItemQuantityFiltered: ", saleItemQuantityFiltered);
            console.debug("saleItemQuantity: ", saleItemQuantity);
            console.debug("costItemName: ", costItemName);
            console.debug("costItemQuantityRaw: ", costItemQuantityRaw);
            console.debug("costItemQuantityFiltered: ", costItemQuantityFiltered);
            console.debug("costItemQuantity: ", costItemQuantity);
            console.log("url: ", pageUrl);
            return;
        }

        promises.push(createPrismaShoppingFromRustlabsData(shopName, saleItemName, saleItemQuantity, costItemName, costItemQuantity));
    });
}

async function getItemRecycleFromRustLabsToDatabase(item: any): Promise<void> {
    const pageUrl = `https://rustlabs.com/item/${getItemUrlName(item.name)}#tab=recycle`;

    const response = await fetch(pageUrl);
    const data = await response.text();

    const dom = new JSDOM(data);

    const exchangeDiv = dom.window.document.querySelector('div[data-name="recycle"]');

    if (!exchangeDiv) return;

    const exchangesTrs = exchangeDiv.querySelectorAll('tbody tr');

    const trsArray = Array.from(exchangesTrs);

    for (const exchangeTr of trsArray) {
        const yieldItems = exchangeTr.querySelectorAll('td:nth-child(2) > a');

        const recycler = await prisma.recycler.create({
            data: {
                Item: {
                    connect: {
                        id: item.id
                    }
                }
            }
        });

        for (const link of Array.from(yieldItems)) {
            const itemName = link.querySelector("img")!.getAttribute('title') || '';
            const itemQuantity = parseInt(link.querySelector('.text-in-icon')?.textContent?.replace('×', '') || '1');
            const yieldItemId = await searchItemIdFromName(itemName);

            if (!yieldItemId) return;

            await prisma.recyclerYield.create({
                data: {
                    recycler: {
                        connect: {
                            id: recycler.id
                        }
                    },
                    yieldItem: {
                        connect: {
                            id: yieldItemId
                        }
                    },
                    quantity: itemQuantity
                }
            })
        }
    };
}

export async function getRecycleValuesFromRustlabs(): Promise<void> {
    // Clean the recycle databases
    await prisma.recycler.deleteMany();

    const items = await getItemsFromDatabase();

    for (const item of items) {
        await getItemRecycleFromRustLabsToDatabase(item);
    }
}

export async function getShoppingListFromRustLabs(): Promise<void> {
    const items = await getItemsFromDatabase();

    let promises: Promise<void>[] = [];

    items.forEach(item => {
        promises.push(getItemShoppingListFromRustLabs(item));
    })

    await Promise.all(promises);
}

export async function searchMissingCrafts(): Promise<void> {
    await getCraftsFromRustlabs(false);
}
