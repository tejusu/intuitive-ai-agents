
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Mail, Phone, Globe, Camera, X } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const { toast } = useToast();
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("John");
    const [lastName, setLastName] = useState("Doe");
    const [email, setEmail] = useState("john.doe@example.com");
    const [phone, setPhone] = useState("+1 (555) 123-4567");
    const [location, setLocation] = useState("San Francisco, CA");
    const [website, setWebsite] = useState("https://johndoe.dev");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const handleSaveChanges = () => {
        console.log("Saving changes:", { firstName, lastName, email });
        toast({
            title: "Profile Updated",
            description: "Your profile has been successfully updated.",
        });
    };

    const handleCancel = () => {
        setFirstName("John");
        setLastName("Doe");
        setEmail("john.doe@example.com");
        setPhone("+1 (555) 123-4567");
        setLocation("San Francisco, CA");
        setWebsite("https://johndoe.dev");
        toast({
            title: "Changes Cancelled",
            description: "All changes have been reverted.",
        });
    };

    const handleUpdatePassword = () => {
        if (!currentPassword || !newPassword) {
            toast({
                title: "Error",
                description: "Please fill in both password fields.",
                variant: "destructive",
            });
            return;
        }
        console.log("Updating password");
        toast({
            title: "Password Updated",
            description: "Your password has been successfully updated.",
        });
        setCurrentPassword("");
        setNewPassword("");
    };

    const handleUploadPhoto = () => {
        console.log("Photo upload triggered");
        toast({
            title: "Photo Upload",
            description: "Photo upload functionality would be implemented here.",
        });
    };

    const handleClose = () => {
        navigate('/');
    };

    return (
        <div className="p-4 md:p-6 lg:p-8 space-y-8 animate-fade-in max-w-6xl mx-auto">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>
                <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={handleClose}
                    className="h-8 w-8 rounded-full hover:bg-accent"
                >
                    <X className="h-4 w-4" />
                </Button>
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
                                    <Button 
                                        size="icon" 
                                        variant="outline" 
                                        className="absolute bottom-0 right-0 h-8 w-8 rounded-full"
                                        onClick={handleUploadPhoto}
                                    >
                                        <Camera className="h-4 w-4" />
                                    </Button>
                                </div>
                                <div className="text-center space-y-2">
                                    <h2 className="text-2xl font-bold">{firstName} {lastName}</h2>
                                    <p className="text-muted-foreground">AI Enthusiast & Developer</p>
                                    <div className="flex flex-wrap gap-2 justify-center">
                                        <Badge variant="secondary">Pro User</Badge>
                                        <Badge variant="outline">Verified</Badge>
                                    </div>
                                </div>
                                <div className="w-full space-y-3 text-sm">
                                    <div className="flex items-center gap-2">
                                        <Mail className="h-4 w-4 text-muted-foreground" />
                                        <span>{email}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Phone className="h-4 w-4 text-muted-foreground" />
                                        <span>{phone}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin className="h-4 w-4 text-muted-foreground" />
                                        <span>{location}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                        <span>Joined March 2024</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Globe className="h-4 w-4 text-muted-foreground" />
                                        <span>{website}</span>
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
                            <CardTitle>Profile</CardTitle>
                            <CardDescription>Update your personal information and avatar.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center gap-4">
                                <Avatar className="h-20 w-20">
                                    <AvatarImage src="https://github.com/shadcn.png" alt="@user" />
                                    <AvatarFallback className="text-xl">JD</AvatarFallback>
                                </Avatar>
                                <Button variant="outline" onClick={handleUploadPhoto}>
                                    Upload new photo
                                </Button>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">Name</Label>
                                    <Input 
                                        id="firstName" 
                                        value={firstName} 
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input 
                                        id="email" 
                                        type="email" 
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end gap-4">
                                <Button variant="outline" onClick={handleCancel}>Cancel</Button>
                                <Button onClick={handleSaveChanges}>Save Changes</Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Security</CardTitle>
                            <CardDescription>Change your password.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="currentPassword">Current Password</Label>
                                    <Input 
                                        id="currentPassword" 
                                        type="password" 
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="newPassword">New Password</Label>
                                    <Input 
                                        id="newPassword" 
                                        type="password" 
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <Button onClick={handleUpdatePassword}>Update Password</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Profile;
