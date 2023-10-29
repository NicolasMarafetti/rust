export interface Resource {
    name: string;
    scrapValue: number;
}

interface Resources {
    [key: string]: Resource[];
}

export const resources: Resources = {
    resources: [
        {
            name: "Charcoal",
            scrapValue: 0.01
        },
        {
            name: "Wood",
            scrapValue: 0.02
        },
        {
            name: "Stones",
            scrapValue: 0.05
        },
        {
            name: "Bone Fragments",
            scrapValue: 0.06
        },
        {
            name: "Metal Ore",
            scrapValue: 0.09
        },
        {
            name: "Metal Fragments",
            scrapValue: 0.1
        },
        {
            name: "Animal Fat",
            scrapValue: 0.1
        },
        {
            name: "Cloth",
            scrapValue: 0.25
        },
        {
            name: "Sulfur Ore",
            scrapValue: 0.25
        },
        {
            name: "Sulfur",
            scrapValue: 0.26
        },
        {
            name: "Leather",
            scrapValue: 0.33
        },
        {
            name: "Crude Oil",
            scrapValue: 0.33
        },
        {
            name: "Gunpowder",
            scrapValue: 0.7
        },
        {
            name: "Low Grade Fuel",
            scrapValue: 0.5
        },
        {
            name: "High quality metal ore",
            scrapValue: 3.97
        },
        {
            name: "High quality metal",
            scrapValue: 4
        },
        {
            name: "Explosives",
            scrapValue: 50.4
        }
    ],
    components: [
        {
            name: "Rope",
            scrapValue: 7.5
        },
        {
            name: "Metal Blade",
            scrapValue: 11
        },
        {
            name: "Empty Propane Tank",
            scrapValue: 19.35
        },
        {
            name: "Metal Pipe",
            scrapValue: 24
        },
        {
            name: "Tarp",
            scrapValue: 25
        },
        {
            name: "Road Signs",
            scrapValue: 26
        },
        {
            name: "Sewing Kit",
            scrapValue: 35
        },
        {
            name: "Sheet Metal",
            scrapValue: 37
        },
        {
            name: "Electric Fuse",
            scrapValue: 40
        },
        {
            name: "Metal Spring",
            scrapValue: 44
        },
        {
            name: "Tech Trash",
            scrapValue: 48
        },
        {
            name: "SMG Body",
            scrapValue: 54
        },
        {
            name: "Semi Automatic Body",
            scrapValue: 61
        },
        {
            name: "Rifle Body",
            scrapValue: 66
        },
        {
            name: "Gears",
            scrapValue: 68.15
        },
        {
            name: "CCTV Camera",
            scrapValue: 208
        },
        {
            name: "Targeting Computer",
            scrapValue: 306
        }
    ],
    foods: [
        {
            name: "Raw Food",
            scrapValue: 0.85
        },
        {
            name: "Cooked Food",
            scrapValue: 1
        },
        {
            name: "Corn",
            scrapValue: 2
        },
        {
            name: "Fertilizer",
            scrapValue: 3
        },
        {
            name: "Corn Seed",
            scrapValue: 2
        },
        {
            name: "Small Trout",
            scrapValue: 10
        }
    ],
    constructions: [
        {
            name: "Wooden Barricade Cover",
            scrapValue: 4.56
        },
        {
            name: "Floor Grill",
            scrapValue: 6.84
        },
        {
            name: "Sandbag Barricade",
            scrapValue: 6.84
        },
        {
            name: "Code Lock",
            scrapValue: 9.12
        },
        {
            name: "Concrete Barricade",
            scrapValue: 9.12
        },
        {
            name: "Wood Double Door",
            scrapValue: 10.95
        },
        {
            name: "Prison Cell Wall",
            scrapValue: 18.25
        },
        {
            name: "Sheet Metal Double Door",
            scrapValue: 27.37
        },
        {
            name: "Search Light",
            scrapValue: 27.37
        },
        {
            name: "Small Water Catcher",
            scrapValue: 36.04
        },
        {
            name: "Wooden Ladder",
            scrapValue: 26.01
        },
        {
            name: "High External Wooden Wall",
            scrapValue: 27.37
        },
        {
            name: "Metal Barricade",
            scrapValue: 62.05
        },
        {
            name: "High External Stone Wall",
            scrapValue: 68.44
        },
        {
            name: "Garage Door",
            scrapValue: 151.75
        },
        {
            name: "Armored Double Door",
            scrapValue: 402.18
        }
    ],
    items: [
        {
            name: "Small Stash",
            scrapValue: 6.28
        },
        {
            name: "Locker",
            scrapValue: 28.17
        },
        {
            name: "Igniter",
            scrapValue: 50
        },
        {
            name: "Furnace",
            scrapValue: 94.77
        },
        {
            name: "Small Oil Refinery",
            scrapValue: 125
        },
        {
            name: "Research Table",
            scrapValue: 243.33
        },
        {
            name: "Computer Station",
            scrapValue: 300
        },
        {
            name: "Large Furnace",
            scrapValue: 350
        },
        {
            name: "Vending Machine",
            scrapValue: 728.57
        }
    ],
    clothing: [
        {
            name: "Burlap Gloves",
            scrapValue: 0.83
        },
        {
            name: "Hide Boots",
            scrapValue: 2.2
        },
        {
            name: "Hide Pants",
            scrapValue: 3.3
        },
        {
            name: "Hide Vest",
            scrapValue: 3.3
        },
        {
            name: "Burlap Headwrap",
            scrapValue: 1.67
        },
        {
            name: "Burlap Shoes",
            scrapValue: 1.67
        },
        {
            name: "Hide Poncho",
            scrapValue: 4.4
        },
        {
            name: "Improvised Balaclava",
            scrapValue: 2.5
        },
        {
            name: "Burlap Shirt",
            scrapValue: 3.33
        },
        {
            name: "Burlap Trousers",
            scrapValue: 3.33
        },
        {
            name: "Bone Helmet",
            scrapValue: 4.5
        },
        {
            name: "T-Shirt",
            scrapValue: 5
        },
        {
            name: "Riot Helmet",
            scrapValue: 5
        },
        {
            name: "Shorts",
            scrapValue: 5
        },
        {
            name: "Bone Armor",
            scrapValue: 8.5
        },
        {
            name: "Longsleeve T-Shirt",
            scrapValue: 10
        },
        {
            name: "Snow Jacket",
            scrapValue: 20
        },
        {
            name: "Boots",
            scrapValue: 20
        },
        {
            name: "Tactical Gloves",
            scrapValue: 40
        },
        {
            name: "Pants",
            scrapValue: 42.67
        },
        {
            name: "Coffee Can Helmet",
            scrapValue: 43.93
        },
        {
            name: "Hoodie",
            scrapValue: 55.59
        },
        {
            name: "Jacket",
            scrapValue: 66.19
        },
        {
            name: "Roadsign Gloves",
            scrapValue: 79.59
        },
        {
            name: "High Quality Horse Shoes",
            scrapValue: 100
        },
        {
            name: "Roadsign Horse Armor",
            scrapValue: 100
        },
        {
            name: "Hazmat Suit",
            scrapValue: 162.52
        }
    ],
    tools: [
        {
            name: "Stone Hatchet",
            scrapValue: 11.54
        },
        {
            name: "Stone Pickaxe",
            scrapValue: 11.54
        },
        {
            name: "Hatchet",
            scrapValue: 40
        },
        {
            name: "Pickaxe",
            scrapValue: 50
        },
        {
            name: "Salvaged Hammer",
            scrapValue: 63.49
        },
        {
            name: "RF Transmitter",
            scrapValue: 75
        },
        {
            name: "Salvaged Axe",
            scrapValue: 118
        },
        {
            name: "Salvaged Icepick",
            scrapValue: 118
        },
        {
            name: "Chainsaw",
            scrapValue: 125
        },
        {
            name: "Jackhammer",
            scrapValue: 150
        },
        {
            name: "Satchel Charge",
            scrapValue: 317.07
        }
    ],
    medical: [
        {
            name: "Anti-radiation Pills",
            scrapValue: 2
        },
        {
            name: "Bandage",
            scrapValue: 2.51
        },
        {
            name: "Medical Syringe",
            scrapValue: 12.26
        }
    ],
    weapons: [
        {
            name: "F1 Grenade",
            scrapValue: 8
        },
        {
            name: "Eoka Pistol",
            scrapValue: 8.58
        },
        {
            name: "Combat Knife",
            scrapValue: 12.39
        },
        {
            name: "Machete",
            scrapValue: 22.88
        },
        {
            name: "Weapon Flashlight",
            scrapValue: 22.88
        },
        {
            name: "Salvaged Sword",
            scrapValue: 23.83
        },
        {
            name: "Hunting Bow",
            scrapValue: 31.46
        },
        {
            name: "Silencer",
            scrapValue: 38.13
        },
        {
            name: "Nailgun",
            scrapValue: 42.9
        },
        {
            name: "Waterpipe Shotgun",
            scrapValue: 55.29
        },
        {
            name: "Salvaged Cleaver",
            scrapValue: 59.11
        },
        {
            name: "Crossbow",
            scrapValue: 71.98
        },
        {
            name: "Muzzle Boost",
            scrapValue: 76.26
        },
        {
            name: "Beancan Grenade",
            scrapValue: 83.89
        },
        {
            name: "Holosight",
            scrapValue: 183.04
        },
        {
            name: "Revolver",
            scrapValue: 200
        },
        {
            name: "Custom SMG",
            scrapValue: 211.64
        },
        {
            name: "Semi-Automatic Pistol",
            scrapValue: 217.36
        },
        {
            name: "Thompson",
            scrapValue: 230.7
        },
        {
            name: "M92 Pistol",
            scrapValue: 250
        },
        {
            name: "Double Barrel Shotgun",
            scrapValue: 250
        },
        {
            name: "Semi-Automatic Rifle",
            scrapValue: 316.5
        },
        {
            name: "Python Revolver",
            scrapValue: 371.79
        },
        {
            name: "Pump Shotgun",
            scrapValue: 381.32
        },
        {
            name: "Rocket Launcher",
            scrapValue: 488.1
        },
        {
            name: "Flame Thrower",
            scrapValue: 558.07
        },
        {
            name: "Assault Rifle",
            scrapValue: 850.35
        }
    ],
    ammo: [
        {
            name: "Wooden Arrow",
            scrapValue: 0.65
        },
        {
            name: "Pistol Bullet",
            scrapValue: 0.86
        },
        {
            name: "Nailgun Nails",
            scrapValue: 1.03
        },
        {
            name: "Handmade Shell",
            scrapValue: 1.23
        },
        {
            name: "5.56 Rifle Ammo",
            scrapValue: 1.94
        },
        {
            name: "Incendiary Pistol Bullet",
            scrapValue: 4.2
        },
        {
            name: "12 Gauge Incendiary Shell",
            scrapValue: 8.08
        },
        {
            name: "HV 5.56 Rifle Ammo",
            scrapValue: 9.7
        },
        {
            name: "Explosive 5.56 Rifle Ammo",
            scrapValue: 11.38
        },
        {
            name: "SAM Ammo",
            scrapValue: 12.5
        },
        {
            name: "Rocket",
            scrapValue: 849.57
        }
    ],
    traps: [
        {
            name: "Shotgun Trap",
            scrapValue: 150
        },
        {
            name: "Flame Turret",
            scrapValue: 250
        },
        {
            name: "Auto Turret",
            scrapValue: 400
        }
    ],
    electrical: [
        {
            name: "Root Combiner",
            scrapValue: 14.25
        },
        {
            name: "AND Switch",
            scrapValue: 14.25
        },
        {
            name: "Ceiling Light",
            scrapValue: 15
        },
        {
            name: "Or Switch",
            scrapValue: 24
        },
        {
            name: "Small Rechargeable Battery",
            scrapValue: 28.49
        },
        {
            name: "RF Receiver",
            scrapValue: 56.98
        },
        {
            name: "RF Broadcaster",
            scrapValue: 62.68
        },
        {
            name: "Tesla Coil",
            scrapValue: 75
        },
        {
            name: "Large Solar Panel",
            scrapValue: 75
        },
        {
            name: "RF Pager",
            scrapValue: 75
        },
        {
            name: "Small Generator",
            scrapValue: 125
        },
        {
            name: "Large Rechargable Battery",
            scrapValue: 142.45
        },
        {
            name: "Wind turbine",
            scrapValue: 500
        }
    ],
    misc: [
        {
            name: "Green Keycard",
            scrapValue: 30
        },
        {
            name: "Blue Keycard",
            scrapValue: 100
        },
        {
            name: "Red Keycard",
            scrapValue: 160
        },
        {
            name: "SAM Site",
            scrapValue: 500
        }
    ]
};