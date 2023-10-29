import { Resource } from '@/const/resources';
import Image from 'next/image';
import React from 'react'

interface ResourceItemProps {
    resourceCategory: string;
    resourceItem: Resource;
}

export default function ResourceItem(props: ResourceItemProps) {

    const { resourceItem } = props;

    return (
        <li key={resourceItem.name} className="flex items-center justify-between py-2 px-4">
            <div className="flex items-center">
                <Image src={`/img/items/resources/${resourceItem.name}.webp`} alt="Charcoal" height={40} width={40} />
                <p>{resourceItem.name}</p>
            </div>
            <div className="flex items-center">
                <span className="mr-1">{resourceItem.scrapValue}</span>
                <Image alt="scrap" src="https://static.wikia.nocookie.net/play-rust/images/0/03/Scrap_icon.png/revision/latest?cb=20170721095804" width={20} height={20} title="scrap" />
            </div>
        </li>
    )
}
