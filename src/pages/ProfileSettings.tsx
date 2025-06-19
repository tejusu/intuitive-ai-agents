
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Shield, Upload, Camera } from "lucide-react";

const ProfileSettings = () => {
    return (
        <div className="p-4 md:p-6 lg:p-8 space-y-8 animate-fade-in max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>
            
            {/* Profile Settings */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5" />
                        Profile
                    </CardTitle>
                    <CardDescription>Update your personal information and avatar.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center gap-6">
                        <Avatar className="h-24 w-24">
                            <AvatarImage src="https://github.com/shadcn.png" alt="Profile" />
                            <AvatarFallback className="text-lg">JD</AvatarFallback>
                        </Avatar>
                        <div className="space-y-2">
                            <Button variant="outline" className="flex items-center gap-2">
                                <Upload className="h-4 w-4" />
                                Upload new photo
                            </Button>
                            <Button variant="ghost" size="sm" className="flex items-center gap-2">
                                <Camera className="h-4 w-4" />
                                Take photo
                            </Button>
                        </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" defaultValue="John Doe" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" defaultValue="john.doe@example.com" />
                        </div>
                    </div>
                    
                    <Button className="w-full md:w-auto">
                        Save Changes
                    </Button>
                </CardContent>
            </Card>

            {/* Security Settings */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Shield className="h-5 w-5" />
                        Security
                    </CardTitle>
                    <CardDescription>Change your password.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="current-password">Current Password</Label>
                            <Input id="current-password" type="password" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="new-password">New Password</Label>
                            <Input id="new-password" type="password" />
                        </div>
                        <Button>Update Password</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default ProfileSettings;
