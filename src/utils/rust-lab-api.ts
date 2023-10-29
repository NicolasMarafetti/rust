import { Resource, Resources } from '@/const/resources';
import { JSDOM } from 'jsdom';

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
