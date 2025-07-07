import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { ShoppingBag, User, ShoppingCart, Heart, Star, Keyboard, ArrowLeft } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  quickReplies?: string[];
  showTextInput?: boolean;
  showProducts?: boolean;
  timestamp: Date;
}

interface Product {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  image: string;
  rating: number;
  reviews: number;
  badge?: string;
}

export function ConversationalShoppingAssistant() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [userChoices, setUserChoices] = useState<Record<string, string>>({});
  const [isTyping, setIsTyping] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [showProducts, setShowProducts] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const sampleProducts: Product[] = [
    {
      id: '1',
      name: 'Premium Running Shoes',
      price: '₹3,299',
      originalPrice: '₹4,999',
      image: '/placeholder.svg',
      rating: 4.8,
      reviews: 2847,
      badge: 'Best Seller'
    },
    {
      id: '2',
      name: 'Sport Performance Sneakers',
      price: '₹2,199',
      originalPrice: '₹2,999',
      image: '/placeholder.svg',
      rating: 4.6,
      reviews: 1523,
      badge: 'Top Rated'
    },
    {
      id: '3',
      name: 'Professional Running Gear',
      price: '₹4,599',
      originalPrice: '₹5,999',
      image: '/placeholder.svg',
      rating: 4.9,
      reviews: 891,
      badge: 'Premium'
    }
  ];

  const conversationFlow = [
    {
      text: "Hi! I'm your shopping assistant 🛍️ What are you looking for today?",
      quickReplies: ["Running shoes", "Laptop", "Skincare", "Headphones"],
      showTextInput: true
    },
    {
      text: "Great choice! Which category would you like to explore?",
      quickReplies: ["Clothing", "Gadgets", "Groceries", "Skincare", "Accessories", "Other"]
    },
    {
      text: "Do you have a preferred brand in mind?",
      quickReplies: ["Nike", "Sony", "Apple", "Samsung", "No preference"],
      showTextInput: true
    },
    {
      text: "What's your budget range?",
      quickReplies: ["Below ₹1000", "₹1000–₹5000", "₹5000+", "No Limit"]
    },
    {
      text: "Any specific preferences or features you're looking for?",
      quickReplies: ["Lightweight", "Waterproof", "Compact", "Organic", "Eco-Friendly", "No Preference"],
      showTextInput: true
    },
    {
      text: "Perfect! Here are some top picks for you:",
      showProducts: true
    }
  ];

  useEffect(() => {
    // Start the conversation
    addBotMessage(conversationFlow[0]);
  }, []);

  const addBotMessage = (messageData: typeof conversationFlow[0]) => {
    setIsTyping(true);
    
    setTimeout(() => {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: messageData.text,
        isBot: true,
        quickReplies: messageData.quickReplies,
        showTextInput: messageData.showTextInput,
        showProducts: messageData.showProducts,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, newMessage]);
      setIsTyping(false);
      
      if (messageData.showProducts) {
        setShowProducts(true);
      }
    }, 1500);
  };

  const handleQuickReply = (reply: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: reply,
      isBot: false,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setUserChoices(prev => ({ ...prev, [currentStep]: reply }));
    
    // Move to next step
    const nextStep = currentStep + 1;
    if (nextStep < conversationFlow.length) {
      setCurrentStep(nextStep);
      setTimeout(() => addBotMessage(conversationFlow[nextStep]), 800);
    }
  };

  const handleTextSubmit = () => {
    if (!textInput.trim()) return;
    
    handleQuickReply(textInput);
    setTextInput('');
  };

  const handleAddToCart = (product: Product) => {
    setCartCount(prev => prev + 1);
    // Add your cart logic here
  };

  const handleContinueShopping = () => {
    setShowProducts(false);
    const message: Message = {
      id: Date.now().toString(),
      text: "Want to search or explore something else?",
      isBot: true,
      showTextInput: true,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, message]);
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Top Navigation */}
      <div className="flex items-center justify-between p-4 border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
            <ShoppingBag className="w-4 h-4 text-primary" />
          </div>
          <span className="font-semibold text-lg">Shop</span>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                {cartCount}
              </Badge>
            )}
          </Button>
          <Button variant="ghost" size="icon">
            <User className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex gap-3 ${message.isBot ? '' : 'flex-row-reverse'}`}>
            <Avatar className="w-8 h-8 shrink-0">
              <AvatarFallback className={message.isBot ? 'bg-primary/10' : 'bg-secondary'}>
                {message.isBot ? <ShoppingBag className="w-4 h-4 text-primary" /> : <User className="w-4 h-4" />}
              </AvatarFallback>
            </Avatar>
            
            <div className={`flex-1 space-y-3 ${message.isBot ? '' : 'text-right'}`}>
              <div className={`inline-block rounded-2xl px-4 py-3 max-w-[80%] shadow-sm ${
                message.isBot 
                  ? 'bg-muted text-foreground' 
                  : 'bg-primary text-primary-foreground ml-auto'
              }`}>
                <p className="text-sm">{message.text}</p>
              </div>
              
              {/* Quick Reply Chips */}
              {message.quickReplies && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {message.quickReplies.map((reply, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="rounded-full text-xs h-8 px-3 hover:bg-primary hover:text-primary-foreground transition-colors"
                      onClick={() => handleQuickReply(reply)}
                    >
                      {reply}
                    </Button>
                  ))}
                </div>
              )}
              
              {/* Text Input Option */}
              {message.showTextInput && (
                <div className="flex items-center gap-2 mt-3">
                  <div className="flex-1 flex items-center gap-2 bg-muted rounded-full px-3 py-2">
                    <Keyboard className="w-4 h-4 text-muted-foreground" />
                    <Input
                      value={textInput}
                      onChange={(e) => setTextInput(e.target.value)}
                      placeholder="Type your answer..."
                      className="border-0 bg-transparent text-sm h-auto p-0 focus-visible:ring-0"
                      onKeyPress={(e) => e.key === 'Enter' && handleTextSubmit()}
                    />
                  </div>
                  <Button 
                    size="sm" 
                    className="rounded-full h-8 w-8 p-0"
                    onClick={handleTextSubmit}
                  >
                    →
                  </Button>
                </div>
              )}
              
              {/* Product Carousel */}
              {message.showProducts && (
                <div className="mt-4">
                  <Carousel className="w-full max-w-sm mx-auto">
                    <CarouselContent>
                      {sampleProducts.map((product) => (
                        <CarouselItem key={product.id}>
                          <Card className="overflow-hidden shadow-lg">
                            <div className="relative">
                              <img 
                                src={product.image} 
                                alt={product.name}
                                className="w-full h-48 object-cover"
                              />
                              {product.badge && (
                                <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">
                                  {product.badge}
                                </Badge>
                              )}
                              <Button 
                                size="icon" 
                                variant="ghost" 
                                className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                              >
                                <Heart className="h-4 w-4" />
                              </Button>
                            </div>
                            
                            <CardContent className="p-4">
                              <h4 className="font-semibold text-sm mb-2 line-clamp-2">{product.name}</h4>
                              
                              <div className="flex items-center gap-2 mb-2">
                                <div className="flex items-center gap-1">
                                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                  <span className="text-xs font-medium">{product.rating}</span>
                                </div>
                                <span className="text-xs text-muted-foreground">({product.reviews})</span>
                              </div>
                              
                              <div className="flex items-center gap-2 mb-3">
                                <span className="font-bold text-primary">{product.price}</span>
                                {product.originalPrice && (
                                  <span className="text-xs text-muted-foreground line-through">{product.originalPrice}</span>
                                )}
                              </div>
                              
                              <div className="flex gap-2">
                                <Button 
                                  size="sm" 
                                  className="flex-1 text-xs h-8"
                                  onClick={() => handleAddToCart(product)}
                                >
                                  🛒 Add to Cart
                                </Button>
                                <Button variant="outline" size="sm" className="text-xs h-8">
                                  🔍 Details
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>
                  
                  {/* Post-Product Actions */}
                  <div className="flex gap-2 mt-4 justify-center">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleContinueShopping}
                      className="rounded-full"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Continue Shopping
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="rounded-full"
                      onClick={() => handleQuickReply("Show similar items")}
                    >
                      Ask for Similar Items
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
        
        {/* Typing Animation */}
        {isTyping && (
          <div className="flex gap-3">
            <Avatar className="w-8 h-8 shrink-0">
              <AvatarFallback className="bg-primary/10">
                <ShoppingBag className="w-4 h-4 text-primary" />
              </AvatarFallback>
            </Avatar>
            <div className="bg-muted rounded-2xl px-4 py-3 shadow-sm">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Input for Continue Shopping */}
      {showProducts && (
        <div className="p-4 border-t border-border/50 bg-background/80 backdrop-blur-sm">
          <div className="flex items-center gap-2 bg-muted rounded-full px-4 py-2">
            <Input
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Search for another product..."
              className="border-0 bg-transparent h-auto p-0 focus-visible:ring-0"
              onKeyPress={(e) => e.key === 'Enter' && handleTextSubmit()}
            />
            <Button 
              size="sm" 
              className="rounded-full h-8 w-8 p-0"
              onClick={handleTextSubmit}
            >
              →
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}