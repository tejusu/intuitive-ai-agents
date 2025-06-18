
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Mail, Phone, Globe, Camera } from "lucide-react";

const Profile = () => {
    return (
        <div className="p-4 md:p-6 lg:p-8 space-y-8 animate-fade-in max-w-6xl mx-auto">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
                <Button>Edit Profile</Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Profile Overview */}
                <div className="lg:col-span-1">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col items-center space-y-4">
                                <div className="relative">
                                    <Avatar className="h-32 w-32">
                                        <AvatarImage src="https://github.com/shadcn.png" alt="@user" />
                                        <AvatarFallback className="text-2xl">JD</AvatarFallback>
                                    </Avatar>
                                    <Button size="icon" variant="outline" className="absolute bottom-0 right-0 h-8 w-8 rounded-full">
                                        <Camera className="h-4 w-4" />
                                    </Button>
                                </div>
                                <div className="text-center space-y-2">
                                    <h2 className="text-2xl font-bold">John Doe</h2>
                                    <p className="text-muted-foreground">AI Enthusiast & Developer</p>
                                    <div className="flex flex-wrap gap-2 justify-center">
                                        <Badge variant="secondary">Pro User</Badge>
                                        <Badge variant="outline">Verified</Badge>
                                    </div>
                                </div>
                                <div className="w-full space-y-3 text-sm">
                                    <div className="flex items-center gap-2">
                                        <Mail className="h-4 w-4 text-muted-foreground" />
                                        <span>john.doe@example.com</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Phone className="h-4 w-4 text-muted-foreground" />
                                        <span>+1 (555) 123-4567</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin className="h-4 w-4 text-muted-foreground" />
                                        <span>San Francisco, CA</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                        <span>Joined March 2024</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Globe className="h-4 w-4 text-muted-foreground" />
                                        <span>johndoe.dev</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Stats Card */}
                    <Card className="mt-6">
                        <CardHeader>
                            <CardTitle className="text-lg">Statistics</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4 text-center">
                                <div>
                                    <div className="text-2xl font-bold text-primary">1,247</div>
                                    <div className="text-xs text-muted-foreground">Total Chats</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-primary">156</div>
                                    <div className="text-xs text-muted-foreground">This Month</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-primary">89%</div>
                                    <div className="text-xs text-muted-foreground">Satisfaction</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-primary">24</div>
                                    <div className="text-xs text-muted-foreground">Saved Plans</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Profile Details */}
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Personal Information</CardTitle>
                            <CardDescription>Update your personal details and contact information.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input id="firstName" defaultValue="John" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input id="lastName" defaultValue="Doe" />
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" defaultValue="john.doe@example.com" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone</Label>
                                    <Input id="phone" defaultValue="+1 (555) 123-4567" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="bio">Bio</Label>
                                <Textarea 
                                    id="bio" 
                                    placeholder="Tell us about yourself..."
                                    defaultValue="Passionate AI enthusiast and full-stack developer with expertise in React, Node.js, and machine learning. Love exploring new technologies and building innovative solutions."
                                    className="min-h-[100px]"
                                />
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="location">Location</Label>
                                    <Input id="location" defaultValue="San Francisco, CA" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="website">Website</Label>
                                    <Input id="website" defaultValue="https://johndoe.dev" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Preferences</CardTitle>
                            <CardDescription>Customize your AI assistant experience.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="defaultAgent">Default Agent</Label>
                                    <Input id="defaultAgent" defaultValue="AI Chat" readOnly className="bg-muted/50" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="preferredModel">Preferred Model</Label>
                                    <Input id="preferredModel" defaultValue="ChatGPT 4.1" readOnly className="bg-muted/50" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="interests">Interests</Label>
                                <div className="flex flex-wrap gap-2 mb-2">
                                    <Badge variant="secondary">Technology</Badge>
                                    <Badge variant="secondary">Travel</Badge>
                                    <Badge variant="secondary">Photography</Badge>
                                    <Badge variant="secondary">Coding</Badge>
                                    <Badge variant="secondary">AI/ML</Badge>
                                </div>
                                <Input id="interests" placeholder="Add new interests..." />
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex justify-end gap-4">
                        <Button variant="outline">Cancel</Button>
                        <Button>Save Changes</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
