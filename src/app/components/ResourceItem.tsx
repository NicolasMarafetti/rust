import { Resource } from '@/const/resources';
import Image from 'next/image';
import React from 'react'

interface ResourceItemProps {
    resourceCategory: string;
    resourceItem: Resource;
}

export default function ResourceItem(props: ResourceItemProps) {

    const { resourceCategory, resourceItem } = props;

    return (
        <li key={resourceItem.name} className="flex items-center justify-between py-1 px-10">
            <div className="flex items-center">
                <Image className="mr-5" src={`/img/items/${resourceCategory}/${resourceItem.name}.webp`} alt={resourceItem.name} height={30} width={30} />
                <p className="text-amber-600 uppercase text-sm font-bold">{resourceItem.name}</p>
            </div>
            <div className="flex items-center">
                <span className="mr-1">{resourceItem.scrapValue}</span>
                <Image alt="scrap" src="https://static.wikia.nocookie.net/play-rust/images/0/03/Scrap_icon.png/revision/latest?cb=20170721095804" width={20} height={20} title="scrap" />
            </div>
        </li>
    )
}
