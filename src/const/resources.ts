export interface Resource {
    id: string;
    imageUrl: string;
    name: string;
    scrapValue: number;
}

export interface Resources {
    [key: string]: Resource[];
}

export const resources = {
    resources: [
        {
            id: "charcoal",
            name: "Charcoal",
            scrapValue: 0.01
        },
        {
            id: "wood",
            name: "Wood",
            scrapValue: 0.02
        },
        {
            id: "stones",
            name: "Stones",
            scrapValue: 0.05
        },
        {
            id: "bone-fragments",
            name: "Bone Fragments",
            scrapValue: 0.06
        },
        {
            id: "metal-ore",
            name: "Metal Ore",
            scrapValue: 0.09
        },
        {
            id: "metal-fragments",
            name: "Metal Fragments",
            scrapValue: 0.1
        },
        {
            id: "animal-fat",
            name: "Animal Fat",
            scrapValue: 0.1
        },
        {
            id: "cloth",
            name: "Cloth",
            scrapValue: 0.25
        },
        {
            id: "sulfur-ore",
            name: "Sulfur Ore",
            scrapValue: 0.25
        },
        {
            id: "sulfur",
            name: "Sulfur",
            scrapValue: 0.26
        },
        {
            id: "leather",
            name: "Leather",
            scrapValue: 0.33
        },
        {
            id: "crude-oil",
            name: "Crude Oil",
            scrapValue: 0.33
        },
        {
            id: "gunpowder",
            name: "Gunpowder",
            scrapValue: 0.7
        },
        {
            id: "low-grade-fuel",
            name: "Low Grade Fuel",
            scrapValue: 0.5
        },
        {
            id: "high-quality-metal-ore",
            name: "High quality metal ore",
            scrapValue: 3.97
        },
        {
            id: "high-quality-metal",
            name: "High quality metal",
            scrapValue: 4
        },
        {
            id: "explosives",
            name: "Explosives",
            scrapValue: 50.4
        }
    ],
    components: [
        {
            id: "rope",
            name: "Rope",
            scrapValue: 7.5
        },
        {
            id: "metal-blade",
            name: "Metal Blade",
            scrapValue: 11
        },
        {
            id: "empty-propane-tank",
            name: "Empty Propane Tank",
            scrapValue: 19.35
        },
        {
            id: "metal-pipe",
            name: "Metal Pipe",
            scrapValue: 24
        },
        {
            id: "tarp",
            name: "Tarp",
            scrapValue: 25
        },
        {
            id: "road-signs",
            name: "Road Signs",
            scrapValue: 26
        },
        {
            id: "sewing-kit",
            name: "Sewing Kit",
            scrapValue: 35
        },
        {
            id: "sheet-metal",
            name: "Sheet Metal",
            scrapValue: 37
        },
        {
            id: "electrical-fuse",
            name: "Electric Fuse",
            scrapValue: 40
        },
        {
            id: "metal-spring",
            name: "Metal Spring",
            scrapValue: 44
        },
        {
            id: "tech-trash",
            name: "Tech Trash",
            scrapValue: 48
        },
        {
            id: "smg-body",
            name: "SMG Body",
            scrapValue: 54
        },
        {
            id: "semi-automatic-body",
            name: "Semi Automatic Body",
            scrapValue: 61
        },
        {
            id: "rifle-body",
            name: "Rifle Body",
            scrapValue: 66
        },
        {
            id: "gears",
            name: "Gears",
            scrapValue: 68.15
        },
        {
            id: "cctv-camera",
            name: "CCTV Camera",
            scrapValue: 208
        },
        {
            id: "targeting-computer",
            name: "Targeting Computer",
            scrapValue: 306
        }
    ],
    foods: [
        {
            id: "raw-food",
            name: "Raw Food",
            scrapValue: 0.85
        },
        {
            id: "cooked-food",
            name: "Cooked Food",
            scrapValue: 1
        },
        {
            id: "corn",
            name: "Corn",
            scrapValue: 2
        },
        {
            id: "fertilizer",
            name: "Fertilizer",
            scrapValue: 3
        },
        {
            id: "corn-seed",
            name: "Corn Seed",
            scrapValue: 2
        },
        {
            id: "small-trout",
            name: "Small Trout",
            scrapValue: 10
        }
    ],
    constructions: [
        {
            id: "wooden-barricade-cover",
            name: "Wooden Barricade Cover",
            scrapValue: 4.56
        },
        {
            id: "floor-grill",
            name: "Floor Grill",
            scrapValue: 6.84
        },
        {
            id: "sandbag-barricade",
            name: "Sandbag Barricade",
            scrapValue: 6.84
        },
        {
            id: "code-lock",
            name: "Code Lock",
            scrapValue: 9.12
        },
        {
            id: "concrete-barricade",
            name: "Concrete Barricade",
            scrapValue: 9.12
        },
        {
            id: "wood-double-door",
            name: "Wood Double Door",
            scrapValue: 10.95
        },
        {
            id: "prison-cell-wall",
            name: "Prison Cell Wall",
            scrapValue: 18.25
        },
        {
            id: "sheet-metal-double-door",
            name: "Sheet Metal Double Door",
            scrapValue: 27.37
        },
        {
            id: "search-light",
            name: "Search Light",
            scrapValue: 27.37
        },
        {
            id: "small-water-catcher",
            name: "Small Water Catcher",
            scrapValue: 36.04
        },
        {
            id: "wooden-ladder",
            name: "Wooden Ladder",
            scrapValue: 26.01
        },
        {
            id: "high-external-wooden-wall",
            name: "High External Wooden Wall",
            scrapValue: 27.37
        },
        {
            id: "metal-barricade",
            name: "Metal Barricade",
            scrapValue: 62.05
        },
        {
            id: "high-external-stone-wall",
            name: "High External Stone Wall",
            scrapValue: 68.44
        },
        {
            id: "garage-door",
            name: "Garage Door",
            scrapValue: 151.75
        },
        {
            id: "armored-double-door",
            name: "Armored Double Door",
            scrapValue: 402.18
        }
    ],
    items: [
        {
            id: "small-stash",
            name: "Small Stash",
            scrapValue: 6.28
        },
        {
            id: "locker",
            name: "Locker",
            scrapValue: 28.17
        },
        {
            id: "igniter",
            name: "Igniter",
            scrapValue: 50
        },
        {
            id: "furnace",
            name: "Furnace",
            scrapValue: 94.77
        },
        {
            id: "small-oil-refinery",
            name: "Small Oil Refinery",
            scrapValue: 125
        },
        {
            id: "research-table",
            name: "Research Table",
            scrapValue: 243.33
        },
        {
            id: "computer-station",
            name: "Computer Station",
            scrapValue: 300
        },
        {
            id: "large-furnace",
            name: "Large Furnace",
            scrapValue: 350
        },
        {
            id: "",
            name: "Vending Machine",
            scrapValue: 728.57
        }
    ],
    clothing: [
        {
            id: "",
            name: "Burlap Gloves",
            scrapValue: 0.83
        },
        {
            id: "",
            name: "Hide Boots",
            scrapValue: 2.2
        },
        {
            id: "",
            name: "Hide Pants",
            scrapValue: 3.3
        },
        {
            id: "",
            name: "Hide Vest",
            scrapValue: 3.3
        },
        {
            id: "",
            name: "Burlap Headwrap",
            scrapValue: 1.67
        },
        {
            id: "",
            name: "Burlap Shoes",
            scrapValue: 1.67
        },
        {
            id: "",
            name: "Hide Poncho",
            scrapValue: 4.4
        },
        {
            id: "",
            name: "Improvised Balaclava",
            scrapValue: 2.5
        },
        {
            id: "",
            name: "Burlap Shirt",
            scrapValue: 3.33
        },
        {
            id: "",
            name: "Burlap Trousers",
            scrapValue: 3.33
        },
        {
            id: "",
            name: "Bone Helmet",
            scrapValue: 4.5
        },
        {
            id: "",
            name: "T-Shirt",
            scrapValue: 5
        },
        {
            id: "",
            name: "Riot Helmet",
            scrapValue: 5
        },
        {
            id: "",
            name: "Shorts",
            scrapValue: 5
        },
        {
            id: "",
            name: "Bone Armor",
            scrapValue: 8.5
        },
        {
            id: "",
            name: "Longsleeve T-Shirt",
            scrapValue: 10
        },
        {
            id: "",
            name: "Snow Jacket",
            scrapValue: 20
        },
        {
            id: "",
            name: "Boots",
            scrapValue: 20
        },
        {
            id: "",
            name: "Tactical Gloves",
            scrapValue: 40
        },
        {
            id: "",
            name: "Pants",
            scrapValue: 42.67
        },
        {
            id: "",
            name: "Coffee Can Helmet",
            scrapValue: 43.93
        },
        {
            id: "",
            name: "Hoodie",
            scrapValue: 55.59
        },
        {
            id: "",
            name: "Jacket",
            scrapValue: 66.19
        },
        {
            id: "",
            name: "Roadsign Gloves",
            scrapValue: 79.59
        },
        {
            id: "",
            name: "High Quality Horse Shoes",
            scrapValue: 100
        },
        {
            id: "",
            name: "Roadsign Horse Armor",
            scrapValue: 100
        },
        {
            id: "",
            name: "Hazmat Suit",
            scrapValue: 162.52
        }
    ],
    tools: [
        {
            id: "",
            name: "Stone Hatchet",
            scrapValue: 11.54
        },
        {
            id: "",
            name: "Stone Pickaxe",
            scrapValue: 11.54
        },
        {
            id: "",
            name: "Hatchet",
            scrapValue: 40
        },
        {
            id: "",
            name: "Pickaxe",
            scrapValue: 50
        },
        {
            id: "",
            name: "Salvaged Hammer",
            scrapValue: 63.49
        },
        {
            id: "",
            name: "RF Transmitter",
            scrapValue: 75
        },
        {
            id: "",
            name: "Salvaged Axe",
            scrapValue: 118
        },
        {
            id: "",
            name: "Salvaged Icepick",
            scrapValue: 118
        },
        {
            id: "",
            name: "Chainsaw",
            scrapValue: 125
        },
        {
            id: "",
            name: "Jackhammer",
            scrapValue: 150
        },
        {
            id: "",
            name: "Satchel Charge",
            scrapValue: 317.07
        }
    ],
    medical: [
        {
            id: "",
            name: "Anti-radiation Pills",
            scrapValue: 2
        },
        {
            id: "",
            name: "Bandage",
            scrapValue: 2.51
        },
        {
            id: "",
            name: "Medical Syringe",
            scrapValue: 12.26
        }
    ],
    weapons: [
        {
            id: "",
            name: "F1 Grenade",
            scrapValue: 8
        },
        {
            id: "",
            name: "Eoka Pistol",
            scrapValue: 8.58
        },
        {
            id: "",
            name: "Combat Knife",
            scrapValue: 12.39
        },
        {
            id: "",
            name: "Machete",
            scrapValue: 22.88
        },
        {
            id: "",
            name: "Weapon Flashlight",
            scrapValue: 22.88
        },
        {
            id: "",
            name: "Salvaged Sword",
            scrapValue: 23.83
        },
        {
            id: "",
            name: "Hunting Bow",
            scrapValue: 31.46
        },
        {
            id: "",
            name: "Silencer",
            scrapValue: 38.13
        },
        {
            id: "",
            name: "Nailgun",
            scrapValue: 42.9
        },
        {
            id: "",
            name: "Waterpipe Shotgun",
            scrapValue: 55.29
        },
        {
            id: "",
            name: "Salvaged Cleaver",
            scrapValue: 59.11
        },
        {
            id: "",
            name: "Crossbow",
            scrapValue: 71.98
        },
        {
            id: "",
            name: "Muzzle Boost",
            scrapValue: 76.26
        },
        {
            id: "",
            name: "Beancan Grenade",
            scrapValue: 83.89
        },
        {
            id: "",
            name: "Holosight",
            scrapValue: 183.04
        },
        {
            id: "",
            name: "Revolver",
            scrapValue: 200
        },
        {
            id: "",
            name: "Custom SMG",
            scrapValue: 211.64
        },
        {
            id: "",
            name: "Semi-Automatic Pistol",
            scrapValue: 217.36
        },
        {
            id: "",
            name: "Thompson",
            scrapValue: 230.7
        },
        {
            id: "",
            name: "M92 Pistol",
            scrapValue: 250
        },
        {
            id: "",
            name: "Double Barrel Shotgun",
            scrapValue: 250
        },
        {
            id: "",
            name: "Semi-Automatic Rifle",
            scrapValue: 316.5
        },
        {
            id: "",
            name: "Python Revolver",
            scrapValue: 371.79
        },
        {
            id: "",
            name: "Pump Shotgun",
            scrapValue: 381.32
        },
        {
            id: "",
            name: "Rocket Launcher",
            scrapValue: 488.1
        },
        {
            id: "",
            name: "Flame Thrower",
            scrapValue: 558.07
        },
        {
            id: "",
            name: "Assault Rifle",
            scrapValue: 850.35
        }
    ],
    ammo: [
        {
            id: "",
            name: "Wooden Arrow",
            scrapValue: 0.65
        },
        {
            id: "",
            name: "Pistol Bullet",
            scrapValue: 0.86
        },
        {
            id: "",
            name: "Nailgun Nails",
            scrapValue: 1.03
        },
        {
            id: "",
            name: "Handmade Shell",
            scrapValue: 1.23
        },
        {
            id: "",
            name: "5.56 Rifle Ammo",
            scrapValue: 1.94
        },
        {
            id: "",
            name: "Incendiary Pistol Bullet",
            scrapValue: 4.2
        },
        {
            id: "",
            name: "12 Gauge Incendiary Shell",
            scrapValue: 8.08
        },
        {
            id: "",
            name: "HV 5.56 Rifle Ammo",
            scrapValue: 9.7
        },
        {
            id: "",
            name: "Explosive 5.56 Rifle Ammo",
            scrapValue: 11.38
        },
        {
            id: "",
            name: "SAM Ammo",
            scrapValue: 12.5
        },
        {
            id: "",
            name: "Rocket",
            scrapValue: 849.57
        }
    ],
    traps: [
        {
            id: "",
            name: "Shotgun Trap",
            scrapValue: 150
        },
        {
            id: "",
            name: "Flame Turret",
            scrapValue: 250
        },
        {
            id: "",
            name: "Auto Turret",
            scrapValue: 400
        }
    ],
    electrical: [
        {
            id: "",
            name: "Root Combiner",
            scrapValue: 14.25
        },
        {
            id: "",
            name: "AND Switch",
            scrapValue: 14.25
        },
        {
            id: "",
            name: "Ceiling Light",
            scrapValue: 15
        },
        {
            id: "",
            name: "Or Switch",
            scrapValue: 24
        },
        {
            id: "",
            name: "Small Rechargeable Battery",
            scrapValue: 28.49
        },
        {
            id: "",
            name: "RF Receiver",
            scrapValue: 56.98
        },
        {
            id: "",
            name: "RF Broadcaster",
            scrapValue: 62.68
        },
        {
            id: "",
            name: "Tesla Coil",
            scrapValue: 75
        },
        {
            id: "",
            name: "Large Solar Panel",
            scrapValue: 75
        },
        {
            id: "",
            name: "RF Pager",
            scrapValue: 75
        },
        {
            id: "",
            name: "Small Generator",
            scrapValue: 125
        },
        {
            id: "",
            name: "Large Rechargable Battery",
            scrapValue: 142.45
        },
        {
            id: "",
            name: "Wind turbine",
            scrapValue: 500
        }
    ],
    misc: [
        {
            id: "",
            name: "Green Keycard",
            scrapValue: 30
        },
        {
            id: "",
            name: "Blue Keycard",
            scrapValue: 100
        },
        {
            id: "",
            name: "Red Keycard",
            scrapValue: 160
        },
        {
            id: "",
            name: "SAM Site",
            scrapValue: 500
        }
    ]
};