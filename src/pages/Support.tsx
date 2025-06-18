
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Mail, MessageCircle, Phone, HelpCircle, FileText, Video } from "lucide-react";

const Support = () => {
    return (
        <div className="p-4 md:p-6 lg:p-8 space-y-8 animate-fade-in max-w-6xl mx-auto">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Support Center</h1>
                <Badge variant="secondary">24/7 Available</Badge>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Contact Options */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <HelpCircle className="h-5 w-5 text-primary" />
                                Get Help
                            </CardTitle>
                            <CardDescription>Choose how you'd like to reach out to our support team.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Button className="w-full justify-start" variant="outline">
                                <MessageCircle className="mr-2 h-4 w-4" />
                                Start Live Chat
                            </Button>
                            <Button className="w-full justify-start" variant="outline">
                                <Mail className="mr-2 h-4 w-4" />
                                Send Email
                            </Button>
                            <Button className="w-full justify-start" variant="outline">
                                <Phone className="mr-2 h-4 w-4" />
                                Schedule Call
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Quick Links */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Quick Links</CardTitle>
                            <CardDescription>Find answers to common questions.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <Button variant="ghost" className="w-full justify-start">
                                <FileText className="mr-2 h-4 w-4" />
                                Documentation
                            </Button>
                            <Button variant="ghost" className="w-full justify-start">
                                <Video className="mr-2 h-4 w-4" />
                                Video Tutorials
                            </Button>
                            <Button variant="ghost" className="w-full justify-start">
                                <HelpCircle className="mr-2 h-4 w-4" />
                                FAQ
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Contact Info */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Contact Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 text-sm">
                            <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-muted-foreground" />
                                <span>support@example.com</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-muted-foreground" />
                                <span>+1 (555) 123-4567</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MessageCircle className="h-4 w-4 text-muted-foreground" />
                                <span>Available 24/7</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Contact Form */}
                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Send us a Message</CardTitle>
                            <CardDescription>We'll get back to you within 24 hours.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input id="firstName" placeholder="John" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input id="lastName" placeholder="Doe" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="john.doe@example.com" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="subject">Subject</Label>
                                <Input id="subject" placeholder="How can we help you?" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="message">Message</Label>
                                <Textarea 
                                    id="message" 
                                    placeholder="Describe your issue or question in detail..."
                                    className="min-h-[120px]"
                                />
                            </div>
                            <Button className="w-full">Send Message</Button>
                        </CardContent>
                    </Card>

                    {/* FAQ Preview */}
                    <Card className="mt-6">
                        <CardHeader>
                            <CardTitle className="text-lg">Frequently Asked Questions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <h4 className="font-medium">How do I reset my password?</h4>
                                <p className="text-sm text-muted-foreground">Click on 'Forgot Password' on the login page and follow the instructions.</p>
                            </div>
                            <div>
                                <h4 className="font-medium">How do I upgrade my plan?</h4>
                                <p className="text-sm text-muted-foreground">Go to Settings > Billing to view and change your subscription plan.</p>
                            </div>
                            <div>
                                <h4 className="font-medium">Can I export my data?</h4>
                                <p className="text-sm text-muted-foreground">Yes, you can export your data from Settings > Data Export.</p>
                            </div>
                            <Button variant="outline" className="w-full">
                                View All FAQs
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Support;
