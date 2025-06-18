
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bell, Shield, Palette, Database, Key, Trash2, Download } from "lucide-react";

const Settings = () => {
    return (
        <div className="p-4 md:p-6 lg:p-8 space-y-8 animate-fade-in max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
            
            {/* Account Settings */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Shield className="h-5 w-5" />
                        Account & Security
                    </CardTitle>
                    <CardDescription>Manage your account security and login preferences.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="current-password">Current Password</Label>
                            <Input id="current-password" type="password" />
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="new-password">New Password</Label>
                                <Input id="new-password" type="password" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirm-password">Confirm Password</Label>
                                <Input id="confirm-password" type="password" />
                            </div>
                        </div>
                        <Button>Update Password</Button>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                        <h4 className="text-sm font-medium">Two-Factor Authentication</h4>
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <div className="text-sm">Enable 2FA</div>
                                <div className="text-xs text-muted-foreground">
                                    Add an extra layer of security to your account
                                </div>
                            </div>
                            <Switch />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <div className="text-sm">SMS Authentication</div>
                                <div className="text-xs text-muted-foreground">
                                    Receive authentication codes via SMS
                                </div>
                            </div>
                            <Switch />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Notifications */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Bell className="h-5 w-5" />
                        Notifications
                    </CardTitle>
                    <CardDescription>Configure how you receive notifications.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <div className="text-sm">Email Notifications</div>
                            <div className="text-xs text-muted-foreground">
                                Receive updates about your account via email
                            </div>
                        </div>
                        <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <div className="text-sm">Browser Notifications</div>
                            <div className="text-xs text-muted-foreground">
                                Get notified in your browser for important updates
                            </div>
                        </div>
                        <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <div className="text-sm">Weekly Summary</div>
                            <div className="text-xs text-muted-foreground">
                                Receive a weekly summary of your AI interactions
                            </div>
                        </div>
                        <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <div className="text-sm">Product Updates</div>
                            <div className="text-xs text-muted-foreground">
                                Get notified about new features and improvements
                            </div>
                        </div>
                        <Switch defaultChecked />
                    </div>
                </CardContent>
            </Card>

            {/* Appearance */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Palette className="h-5 w-5" />
                        Appearance
                    </CardTitle>
                    <CardDescription>Customize the look and feel of your interface.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="theme">Theme</Label>
                            <Select defaultValue="system">
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="light">Light</SelectItem>
                                    <SelectItem value="dark">Dark</SelectItem>
                                    <SelectItem value="system">System</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="language">Language</Label>
                            <Select defaultValue="en">
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="en">English</SelectItem>
                                    <SelectItem value="es">Spanish</SelectItem>
                                    <SelectItem value="fr">French</SelectItem>
                                    <SelectItem value="de">German</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <div className="text-sm">Compact Mode</div>
                            <div className="text-xs text-muted-foreground">
                                Use a more compact interface layout
                            </div>
                        </div>
                        <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <div className="text-sm">Show Animations</div>
                            <div className="text-xs text-muted-foreground">
                                Enable smooth animations and transitions
                            </div>
                        </div>
                        <Switch defaultChecked />
                    </div>
                </CardContent>
            </Card>

            {/* AI Preferences */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Database className="h-5 w-5" />
                        AI Preferences
                    </CardTitle>
                    <CardDescription>Configure your AI assistant behavior and preferences.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="default-model">Default Model</Label>
                            <Select defaultValue="gpt-4">
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="gpt-4">ChatGPT 4.1</SelectItem>
                                    <SelectItem value="o3">O3-2025</SelectItem>
                                    <SelectItem value="o4">O4-mini</SelectItem>
                                    <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="response-length">Response Length</Label>
                            <Select defaultValue="balanced">
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="concise">Concise</SelectItem>
                                    <SelectItem value="balanced">Balanced</SelectItem>
                                    <SelectItem value="detailed">Detailed</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="system-prompt">Custom System Prompt</Label>
                        <Textarea 
                            id="system-prompt"
                            placeholder="Enter a custom system prompt to modify AI behavior..."
                            className="min-h-[100px]"
                        />
                        <div className="text-xs text-muted-foreground">
                            This will be added to all your conversations to customize the AI's responses.
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <div className="text-sm">Auto-save Conversations</div>
                            <div className="text-xs text-muted-foreground">
                                Automatically save your chat history
                            </div>
                        </div>
                        <Switch defaultChecked />
                    </div>
                </CardContent>
            </Card>

            {/* API Keys */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Key className="h-5 w-5" />
                        API Keys
                    </CardTitle>
                    <CardDescription>Manage your API keys for external integrations.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="openai-key">OpenAI API Key</Label>
                        <div className="flex gap-2">
                            <Input 
                                id="openai-key" 
                                type="password" 
                                placeholder="sk-..." 
                                defaultValue="sk-proj-1234567890abcdef"
                            />
                            <Button variant="outline">Update</Button>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="google-key">Google Maps API Key</Label>
                        <div className="flex gap-2">
                            <Input 
                                id="google-key" 
                                type="password" 
                                placeholder="AIza..." 
                            />
                            <Button variant="outline">Add</Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Data & Privacy */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Download className="h-5 w-5" />
                        Data & Privacy
                    </CardTitle>
                    <CardDescription>Manage your data and privacy settings.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <div className="text-sm">Data Collection</div>
                            <div className="text-xs text-muted-foreground">
                                Allow collection of usage data to improve the service
                            </div>
                        </div>
                        <Switch defaultChecked />
                    </div>
                    <Separator />
                    <div className="space-y-4">
                        <h4 className="text-sm font-medium">Data Export & Deletion</h4>
                        <div className="flex gap-4">
                            <Button variant="outline">
                                <Download className="h-4 w-4 mr-2" />
                                Export Data
                            </Button>
                            <Button variant="destructive">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete Account
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-end gap-4">
                <Button variant="outline">Reset to Defaults</Button>
                <Button>Save All Changes</Button>
            </div>
        </div>
    );
};

export default Settings;
