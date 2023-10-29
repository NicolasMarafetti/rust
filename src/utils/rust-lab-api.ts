import { Resource, Resources } from '@/const/resources';
import { JSDOM } from 'jsdom';
import { getItemsFromDatabase, searchItemIdFromName } from './items';
import { Item, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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
    return itemName.toLowerCase().replace(' ', '-');
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

export async function getShoppingListFromRustLabs(): Promise<void> {
    const items = await getItemsFromDatabase();

    let promises: Promise<void>[] = [];

    items.forEach(item => {
        promises.push(getItemShoppingListFromRustLabs(item));
    })

    await Promise.all(promises);
}
