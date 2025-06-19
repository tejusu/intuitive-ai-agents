
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, ShoppingCart, Heart, ExternalLink } from "lucide-react";

interface ShoppingResultsDisplayProps {
  query: string;
}

export function ShoppingResultsDisplay({ query }: ShoppingResultsDisplayProps) {
  const sampleProducts = [
    {
      id: 1,
      name: "Premium Running Shoes",
      price: "$129.99",
      originalPrice: "$159.99",
      rating: 4.8,
      reviews: 2847,
      image: "/placeholder.svg",
      badge: "Best Seller",
      features: ["Cushioned sole", "Breathable mesh", "Lightweight design"]
    },
    {
      id: 2,
      name: "Sport Performance Sneakers",
      price: "$89.99",
      originalPrice: "$119.99",
      rating: 4.6,
      reviews: 1523,
      image: "/placeholder.svg",
      badge: "Great Value",
      features: ["Shock absorption", "Durable material", "All-terrain grip"]
    },
    {
      id: 3,
      name: "Professional Running Gear",
      price: "$199.99",
      originalPrice: "$249.99",
      rating: 4.9,
      reviews: 891,
      image: "/placeholder.svg",
      badge: "Premium",
      features: ["Advanced technology", "Professional grade", "Warranty included"]
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Search Summary */}
      <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <ShoppingCart className="h-6 w-6 text-blue-600" />
            Found {sampleProducts.length} products for "{query}"
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Here are the best matches based on your preferences, sorted by popularity and ratings.
          </p>
        </CardContent>
      </Card>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleProducts.map((product) => (
          <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-all group">
            <div className="relative">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
              />
              <Badge className="absolute top-2 left-2 bg-blue-600 text-white">
                {product.badge}
              </Badge>
              <Button 
                size="icon" 
                variant="ghost" 
                className="absolute top-2 right-2 bg-white/80 hover:bg-white"
              >
                <Heart className="h-4 w-4" />
              </Button>
            </div>
            
            <CardContent className="p-4">
              <h4 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h4>
              
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{product.rating}</span>
                </div>
                <span className="text-xs text-muted-foreground">({product.reviews} reviews)</span>
              </div>
              
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg font-bold text-blue-600">{product.price}</span>
                <span className="text-sm text-muted-foreground line-through">{product.originalPrice}</span>
              </div>
              
              <ul className="space-y-1 mb-4">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <div className="h-1.5 w-1.5 bg-blue-600 rounded-full" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <div className="flex gap-2">
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
                <Button variant="outline" size="icon">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Load More */}
      <div className="text-center">
        <Button variant="outline" className="px-8">
          Load More Products
        </Button>
      </div>
    </div>
  );
}
