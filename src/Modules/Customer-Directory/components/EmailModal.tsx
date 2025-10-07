import React, { useState } from 'react';
import { DynamicIcon } from 'lucide-react/dynamic';
import { Button } from '@/_Shared/Components/Ui/button';
import { Input } from '@/_Shared/Components/Ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/_Shared/Components/Ui/select';
import type { Customer } from '@/Modules/Customer-Directory/types';
import { Label } from '@/_Shared/Components/Ui/label';
import { Checkbox } from '@/_Shared/Components/Ui/checkbox';
import { Textarea } from '@/_Shared/Components/Ui/textarea';

interface EmailModalProps {
    customer: Customer;
    isOpen: boolean;
    onClose: () => void;
    onSend: (payload: {
        recipientEmail: string;
        recipientName: string;
        template: string;
        subject: string;
        message: string;
        priority: string;
        sendCopy: boolean;
    }) => Promise<void> | void;
}

const EmailModal: React.FC<EmailModalProps> = ({ customer, isOpen, onClose, onSend }) => {
    const [emailData, setEmailData] = useState({
        template: '',
        subject: '',
        message: '',
        priority: 'normal',
        sendCopy: false
    });
    const [isSending, setIsSending] = useState(false);

    if (!isOpen || !customer) return null;

    const emailTemplates = [
        { value: '', label: 'Custom Email' },
        { value: 'welcome', label: 'Welcome Message' },
        { value: 'order-confirmation', label: 'Order Confirmation' },
        { value: 'shipping-update', label: 'Shipping Update' },
        { value: 'feedback-request', label: 'Feedback Request' },
        { value: 'promotional', label: 'Promotional Offer' },
        { value: 'account-update', label: 'Account Update' },
        { value: 'support-followup', label: 'Support Follow-up' }
    ];

    const priorityOptions = [
        { value: 'low', label: 'Low Priority' },
        { value: 'normal', label: 'Normal Priority' },
        { value: 'high', label: 'High Priority' },
        { value: 'urgent', label: 'Urgent' }
    ];

    const templateContent: Record<string, { subject: string; message: string }> = {
        welcome: {
            subject: `Welcome to Merch Street, ${customer?.name}!`,
            message: `Dear ${customer?.name},\n\nWelcome to Merch Street! We're excited to have you as part of our community.\n\nYour account has been successfully created and you can now start exploring our wide range of products. If you have any questions or need assistance, please don't hesitate to reach out to our support team.\n\nThank you for choosing Merch Street!\n\nBest regards,\nThe Merch Street Team`
        },
        'order-confirmation': {
            subject: `Order Confirmation - Thank you for your purchase!`,
            message: `Dear ${customer?.name},\n\nThank you for your recent order! We've received your purchase and are processing it now.\n\nYou'll receive a shipping confirmation email once your order has been dispatched. In the meantime, you can track your order status in your account dashboard.\n\nIf you have any questions about your order, please contact our customer service team.\n\nBest regards,\nThe Merch Street Team`
        },
        'shipping-update': {
            subject: `Your order is on its way!`,
            message: `Dear ${customer?.name},\n\nGreat news! Your order has been shipped and is on its way to you.\n\nYou can track your package using the tracking information provided in your account. We expect delivery within the next 3-5 business days.\n\nThank you for your patience and for choosing Merch Street!\n\nBest regards,\nThe Merch Street Team`
        },
        'feedback-request': {
            subject: `We'd love your feedback!`,
            message: `Dear ${customer?.name},\n\nWe hope you're enjoying your recent purchase from Merch Street!\n\nYour feedback is incredibly valuable to us and helps us improve our products and services. Would you mind taking a few minutes to share your experience?\n\nThank you for being a valued customer!\n\nBest regards,\nThe Merch Street Team`
        },
        promotional: {
            subject: `Special offer just for you!`,
            message: `Dear ${customer?.name},\n\nAs one of our valued customers, we're excited to offer you an exclusive discount on your next purchase!\n\nUse code SAVE20 at checkout to get 20% off your entire order. This offer is valid for the next 7 days only.\n\nDon't miss out on this limited-time opportunity to save on your favorite products!\n\nBest regards,\nThe Merch Street Team`
        },
        'account-update': {
            subject: `Important account update`,
            message: `Dear ${customer?.name},\n\nWe're writing to inform you about an important update to your account.\n\nYour account information has been successfully updated as requested. If you did not make this change or have any concerns, please contact our support team immediately.\n\nThank you for keeping your account information current.\n\nBest regards,\nThe Merch Street Team`
        },
        'support-followup': {
            subject: `Following up on your support request`,
            message: `Dear ${customer?.name},\n\nWe wanted to follow up on your recent support request to ensure everything has been resolved to your satisfaction.\n\nIf you have any additional questions or concerns, please don't hesitate to reach out. We're here to help!\n\nThank you for your patience and for being a valued customer.\n\nBest regards,\nThe Merch Street Support Team`
        }
    };

    const handleTemplateChange = (templateId: string) => {
        setEmailData(prev => ({
            ...prev,
            template: templateId,
            subject: templateContent?.[templateId]?.subject || '',
            message: templateContent?.[templateId]?.message || ''
        }));
    };

    const handleSend = async () => {
        if (!emailData?.subject?.trim() || !emailData?.message?.trim()) {
            return;
        }

        setIsSending(true);
        try {
            await onSend({
                ...emailData,
                recipientEmail: customer?.email,
                recipientName: customer?.name
            });
            onClose();
            setEmailData({
                template: '',
                subject: '',
                message: '',
                priority: 'normal',
                sendCopy: false
            });
        } catch (error) {
            console.error('Failed to send email:', error);
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center p-4 bg-black/50 z-1300">
            <div className="bg-card rounded-lg border border-border shadow-modal w-full max-w-2xl max-h-[90vh] flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-border">
                    <div>
                        <h2 className="text-xl font-semibold text-foreground">Send Email</h2>
                        <p className="text-sm text-muted-foreground">To: {customer?.name} ({customer?.email})</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={onClose}>
                        <DynamicIcon name="x" size={20} />
                    </Button>
                </div>

                {/* Content */}
                <div className="flex-1 p-6 space-y-6 overflow-y-auto">
                    {/* Template Selection */}
                    <div>
                        <Label>Email Template</Label>
                        <Select value={emailData.template} onValueChange={handleTemplateChange}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a template" />
                            </SelectTrigger>
                            <SelectContent>
                                {emailTemplates.map((template) => (
                                    <SelectItem key={template.value} value={template.value}>{template.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Email Settings */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <Label>Priority</Label>
                            <Select value={emailData.priority} onValueChange={(value: string) => setEmailData(prev => ({ ...prev, priority: value }))}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a priority" />
                                </SelectTrigger>
                                <SelectContent>
                                    {priorityOptions.map((option) => (
                                        <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex items-end">
                            <Label className="flex items-center space-x-2 cursor-pointer">
                                <Checkbox
                                    checked={emailData?.sendCopy}
                                    onCheckedChange={(e: boolean) => setEmailData(prev => ({ ...prev, sendCopy: e }))}
                                    className="rounded border-border"
                                />
                                <span className="text-sm text-foreground">Send copy to myself</span>
                            </Label>
                        </div>
                    </div>

                    {/* Subject */}
                    <div>
                        <Label>Subject</Label>
                        <Input
                            placeholder="Enter email subject"
                            value={emailData?.subject}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmailData(prev => ({ ...prev, subject: e?.target?.value }))}
                            required
                        />
                    </div>

                    {/* Message */}
                    <div>
                        <Label>Message</Label>
                        <Textarea
                            placeholder="Enter your message here..."
                            value={emailData?.message}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setEmailData(prev => ({ ...prev, message: e?.target?.value }))}
                            rows={12}
                            className="w-full px-3 py-2 text-sm border rounded-lg resize-none border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            required
                        />
                        <p className="mt-1 text-xs text-muted-foreground">
                            {emailData?.message?.length} characters
                        </p>
                    </div>

                    {/* Email Preview */}
                    {(emailData?.subject || emailData?.message) && (
                        <div className="p-4 border rounded-lg border-border bg-muted/30">
                            <h3 className="flex items-center mb-3 space-x-2 font-medium text-foreground">
                                <DynamicIcon name="eye" size={16} />
                                <span>Email Preview</span>
                            </h3>
                            <div className="space-y-2 text-sm">
                                <div>
                                    <span className="text-muted-foreground">To:</span>
                                    <span className="ml-2 text-foreground">{customer?.name} &lt;{customer?.email}&gt;</span>
                                </div>
                                <div>
                                    <span className="text-muted-foreground">Subject:</span>
                                    <span className="ml-2 text-foreground">{emailData?.subject || 'No subject'}</span>
                                </div>
                                <div>
                                    <span className="text-muted-foreground">Priority:</span>
                                    <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${emailData?.priority === 'urgent' ? 'bg-error text-error-foreground' :
                                        emailData?.priority === 'high' ? 'bg-warning text-warning-foreground' :
                                            emailData?.priority === 'low' ? 'bg-muted text-muted-foreground' :
                                                'bg-primary text-primary-foreground'
                                        }`}>
                                        {emailData?.priority}
                                    </span>
                                </div>
                                <div className="pt-2 border-t border-border">
                                    <span className="text-muted-foreground">Message:</span>
                                    <div className="p-3 mt-1 whitespace-pre-wrap border rounded bg-background text-foreground">
                                        {emailData?.message || 'No message content'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between p-6 border-t border-border">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <DynamicIcon name="info" size={16} />
                        <span>Email will be sent immediately</span>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Button variant="ghost" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button
                            variant="default"
                            onClick={handleSend}
                            disabled={!emailData?.subject?.trim() || !emailData?.message?.trim()}
                        >
                            <DynamicIcon name={isSending ? 'loader-circle' : 'send'} size={16} className={isSending ? 'animate-spin' : ''} />
                            Send Email
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmailModal;


