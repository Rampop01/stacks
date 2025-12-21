import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type MarketplaceItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  seller: string;
  image: string;
  category: 'weapon' | 'armor' | 'potion' | 'spell' | 'other';
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  levelRequirement: number;
};

// Mock data - in a real app, this would come from an API
const marketplaceItems: MarketplaceItem[] = [
  {
    id: '1',
    name: 'Dragonbone Sword',
    description: 'Forged from the bones of an ancient dragon, this sword burns with inner fire.',
    price: 1250,
    currency: 'STX',
    seller: '0x1a2b...3c4d',
    image: '/items/dragonbone-sword.png',
    category: 'weapon',
    rarity: 'epic',
    levelRequirement: 15
  },
  {
    id: '2',
    name: 'Elven Chainmail',
    description: 'Light as silk but strong as steel, this armor is favored by elven rangers.',
    price: 850,
    currency: 'STX',
    seller: '0x2b3c...4d5e',
    image: '/items/elven-chainmail.png',
    category: 'armor',
    rarity: 'rare',
    levelRequirement: 10
  },
  {
    id: '3',
    name: 'Health Potion',
    description: 'Restores 50 health points. A staple in any adventurer\'s inventory.',
    price: 50,
    currency: 'STX',
    seller: '0x3c4d...5e6f',
    image: '/items/health-potion.png',
    category: 'potion',
    rarity: 'common',
    levelRequirement: 1
  },
  {
    id: '4',
    name: 'Scroll of Fireball',
    description: 'Unleash a devastating fireball that engulfs enemies in flames.',
    price: 300,
    currency: 'STX',
    seller: '0x4d5e...6f7a',
    image: '/items/scroll-fireball.png',
    category: 'spell',
    rarity: 'uncommon',
    levelRequirement: 5
  },
  {
    id: '5',
    name: 'Mysterious Key',
    description: 'An ornate key that seems to pulse with magical energy. Its purpose is unknown.',
    price: 2000,
    currency: 'STX',
    seller: '0x5e6f...7a8b',
    image: '/items/mysterious-key.png',
    category: 'other',
    rarity: 'legendary',
    levelRequirement: 20
  },
  {
    id: '6',
    name: 'Steel Dagger',
    description: 'A reliable dagger for close-quarters combat. Simple but effective.',
    price: 120,
    currency: 'STX',
    seller: '0x6f7a...8b9c',
    image: '/items/steel-dagger.png',
    category: 'weapon',
    rarity: 'common',
    levelRequirement: 2
  },
];

const rarityColors = {
  common: 'text-gray-300',
  uncommon: 'text-green-400',
  rare: 'text-blue-400',
  epic: 'text-purple-500',
  legendary: 'text-amber-400'
};

export default function MarketplacePage() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-[#1a1a1a] via-[#242424] to-[#1a1a1a] py-12 px-4 sm:px-6 lg:px-8">
      {/* Stone texture overlay */}
      <div className="absolute inset-0 stone-texture opacity-40" />

      {/* Torch glow effects */}
      <div
        className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-pulse"
        style={{ animationDuration: "4s" }}
      />
      <div
        className="absolute bottom-20 right-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-pulse"
        style={{ animationDuration: "5s", animationDelay: "1s" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-primary to-transparent" />
              <div className="w-3 h-3 rotate-45 border-2 border-primary" />
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-primary to-transparent" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-engraved tracking-wider uppercase bg-gradient-to-b from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent mb-4">
            Merchant's Bazaar
          </h1>
          <p className="text-lg text-muted-foreground font-serif max-w-2xl mx-auto">
            Trade goods and treasures with fellow adventurers
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <Input 
              type="text" 
              placeholder="Search for items..." 
              className="bg-background/80 border-primary/20 text-foreground placeholder:text-muted-foreground"
            />
          </div>
          <Select>
            <SelectTrigger className="bg-background/80 border-primary/20 text-foreground">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent className="bg-background border-primary/20">
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="weapon">Weapons</SelectItem>
              <SelectItem value="armor">Armor</SelectItem>
              <SelectItem value="potion">Potions</SelectItem>
              <SelectItem value="spell">Spells</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="bg-background/80 border-primary/20 text-foreground">
              <SelectValue placeholder="All Rarities" />
            </SelectTrigger>
            <SelectContent className="bg-background border-primary/20">
              <SelectItem value="all">All Rarities</SelectItem>
              <SelectItem value="common">Common</SelectItem>
              <SelectItem value="uncommon">Uncommon</SelectItem>
              <SelectItem value="rare">Rare</SelectItem>
              <SelectItem value="epic">Epic</SelectItem>
              <SelectItem value="legendary">Legendary</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {marketplaceItems.map((item) => (
            <Card key={item.id} className="bg-background/80 backdrop-blur-sm border border-primary/20 shadow-lg shadow-primary/10 hover:shadow-xl hover:shadow-primary/20 transition-all hover:-translate-y-1">
              <div className="h-48 bg-muted/30 flex items-center justify-center p-4">
                <div className="w-full h-full bg-cover bg-center rounded-t-lg" 
                     style={{ backgroundImage: `url(${item.image})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
                </div>
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className={`text-xl ${rarityColors[item.rarity]}`}>
                      {item.name}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                      <span className="mx-2">•</span>
                      <span className="capitalize">{item.rarity}</span>
                      <span className="mx-2">•</span>
                      Lvl {item.levelRequirement}+
                    </CardDescription>
                  </div>
                  <div className="text-xl font-bold text-amber-400">
                    {item.price} {item.currency}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{item.description}</p>
                <div className="mt-4 text-sm text-muted-foreground">
                  Sold by: <span className="text-primary">{item.seller}</span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" className="border-primary/30 text-foreground hover:bg-primary/10">
                  View Details
                </Button>
                <Button className="bg-amber-600 hover:bg-amber-700">
                  Buy Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button 
            variant="outline" 
            className="border-primary/30 text-foreground hover:bg-primary/10 px-8 py-6 text-lg"
          >
            Load More Items
          </Button>
        </div>

        <div className="mt-12 text-center">
          <Link 
            href="/" 
            className="inline-flex items-center px-6 py-3 border border-primary/30 bg-primary/10 hover:bg-primary/20 text-foreground rounded-lg font-medium transition-colors"
          >
            ← Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
