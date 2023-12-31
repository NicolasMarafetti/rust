import React from 'react';
import { Resources } from '@/const/resources';
import ResourceItem from './ResourceItem';
import { PrismaClient } from '@prisma/client';
import { getItemsFromDatabaseOrderedByCategory } from '@/utils/items';
import { getItemsScrapPriceFromRustLabsToDatabase, getShoppingListFromRustLabs } from '@/utils/rust-lab-api';

const prisma = new PrismaClient()

async function getWebpageContent() {
    const items = await getItemsFromDatabaseOrderedByCategory();

    return items;
}

export default async function HomeFooter() {

    const resources: Resources = await getWebpageContent();

    const resourcesKeys = Object.keys(resources);

    return (
        <footer className="bg-black/70 max-h-96 overflow-y-auto py-5 px-4 text-white">
            <ul className="flex items-start justify-around flex-wrap">
                {
                    resourcesKeys.map((resourceCategory) => {

                        const resource = resources[resourceCategory]!;
                        return (
                            <li key={resourceCategory} className="w-full lg:w-[22vw] my-5">
                                <h2 className="bg-[#242425] font-bold px-10 py-3 uppercase text-gray-500">{resourceCategory}</h2>
                                <ul className="bg-[#1a1a1c] h-64 overflow-y-scroll py-3">
                                    {resource.map((resourceItem, index) => <ResourceItem key={index} resourceCategory={resourceCategory} resourceItem={resourceItem} />)}
                                </ul>
                            </li>
                        )
                    })
                }
            </ul>
        </footer>
    )
}
