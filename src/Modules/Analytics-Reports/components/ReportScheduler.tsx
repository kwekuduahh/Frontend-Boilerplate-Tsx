import React, { useState } from 'react';
import { Button } from '@/_Shared/Components/Ui/button';
import { Input } from '@/_Shared/Components/Ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/_Shared/Components/Ui/select';
import { Checkbox } from '@/_Shared/Components/Ui/checkbox';
import { DynamicIcon, dynamicIconImports } from 'lucide-react/dynamic';
import { Label } from '@/_Shared/Components/Ui/label';

interface Schedule {
    id: number;
    name: string;
    frequency: string;
    recipients: string[];
    format: string;
    nextRun: string;
    active: boolean;
    reportType: string;
}

interface NewSchedule {
    name: string;
    frequency: string;
    recipients: string;
    format: string;
    reportType: string;
    time: string;
}

interface SelectOption {
    value: string;
    label: string;
}

const ReportScheduler: React.FC = () => {
    const [schedules, setSchedules] = useState<Schedule[]>([
        {
            id: 1,
            name: "Weekly Sales Report",
            frequency: "weekly",
            recipients: ["admin@merchstreet.com", "sales@merchstreet.com"],
            format: "pdf",
            nextRun: "2025-01-20T09:00:00",
            active: true,
            reportType: "sales"
        },
        {
            id: 2,
            name: "Monthly Financial Summary",
            frequency: "monthly",
            recipients: ["finance@merchstreet.com", "ceo@merchstreet.com"],
            format: "excel",
            nextRun: "2025-02-01T08:00:00",
            active: true,
            reportType: "financial"
        },
        {
            id: 3,
            name: "Daily Inventory Alert",
            frequency: "daily",
            recipients: ["inventory@merchstreet.com"],
            format: "csv",
            nextRun: "2025-01-14T07:00:00",
            active: false,
            reportType: "inventory"
        }
    ]);

    const [showCreateForm, setShowCreateForm] = useState(false);
    const [newSchedule, setNewSchedule] = useState<NewSchedule>({
        name: '',
        frequency: 'weekly',
        recipients: '',
        format: 'pdf',
        reportType: 'sales',
        time: '09:00'
    });

    const frequencyOptions: SelectOption[] = [
        { value: 'daily', label: 'Daily' },
        { value: 'weekly', label: 'Weekly' },
        { value: 'monthly', label: 'Monthly' },
        { value: 'quarterly', label: 'Quarterly' }
    ];

    const formatOptions: SelectOption[] = [
        { value: 'pdf', label: 'PDF' },
        { value: 'excel', label: 'Excel' },
        { value: 'csv', label: 'CSV' }
    ];

    const reportTypeOptions: SelectOption[] = [
        { value: 'sales', label: 'Sales Report' },
        { value: 'financial', label: 'Financial Summary' },
        { value: 'inventory', label: 'Inventory Report' },
        { value: 'customer', label: 'Customer Analytics' },
        { value: 'product', label: 'Product Performance' }
    ];

    const toggleSchedule = (id: number) => {
        setSchedules(schedules.map(schedule =>
            schedule.id === id
                ? { ...schedule, active: !schedule.active }
                : schedule
        ));
    };

    const deleteSchedule = (id: number) => {
        setSchedules(schedules.filter(schedule => schedule.id !== id));
    };

    const handleCreateSchedule = () => {
        const schedule: Schedule = {
            id: Date.now(),
            name: newSchedule.name,
            frequency: newSchedule.frequency,
            recipients: newSchedule.recipients.split(',').map(email => email.trim()),
            format: newSchedule.format,
            reportType: newSchedule.reportType,
            nextRun: new Date().toISOString(),
            active: true
        };

        setSchedules([...schedules, schedule]);
        setNewSchedule({
            name: '',
            frequency: 'weekly',
            recipients: '',
            format: 'pdf',
            reportType: 'sales',
            time: '09:00'
        });
        setShowCreateForm(false);
    };

    const formatNextRun = (dateString: string): string => {
        return new Date(dateString).toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getFrequencyIcon = (frequency: string): keyof typeof dynamicIconImports => {
        switch (frequency) {
            case 'daily': return 'calendar';
            case 'weekly': return 'calendar-days';
            case 'monthly': return 'calendar-range';
            case 'quarterly': return 'calendar-clock';
            default: return 'calendar';
        }
    };

    const getReportTypeColor = (type: string): string => {
        switch (type) {
            case 'sales': return 'bg-primary/10 text-primary';
            case 'financial': return 'bg-success/10 text-success';
            case 'inventory': return 'bg-warning/10 text-warning';
            case 'customer': return 'bg-accent/10 text-accent';
            case 'product': return 'bg-secondary/10 text-secondary';
            default: return 'bg-muted text-muted-foreground';
        }
    };

    return (
        <div className="border rounded-lg bg-card border-border shadow-card">
            <div className="p-6 border-b border-border">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-card-foreground">Scheduled Reports</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Automate report delivery to your team
                        </p>
                    </div>
                    <Button
                        onClick={() => setShowCreateForm(true)}
                    >
                        <DynamicIcon name="plus" size={16} />
                        New Schedule
                    </Button>
                </div>
            </div>
            <div className="p-6">
                {/* Create Form */}
                {showCreateForm && (
                    <div className="p-6 mb-6 rounded-lg bg-muted/30">
                        <h4 className="mb-4 text-lg font-semibold text-card-foreground">Create New Schedule</h4>
                        <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="schedule-name">Schedule Name</Label>
                                <Input
                                    id="schedule-name"
                                    placeholder="e.g., Weekly Sales Report"
                                    value={newSchedule.name}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewSchedule({ ...newSchedule, name: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Report Type</Label>
                                <Select onValueChange={(value) => setNewSchedule({ ...newSchedule, reportType: value })} value={newSchedule.reportType}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select report type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {reportTypeOptions.map((option) => (
                                            <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Frequency</Label>
                                <Select onValueChange={(value) => setNewSchedule({ ...newSchedule, frequency: value })} value={newSchedule.frequency}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select frequency" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {frequencyOptions.map((option) => (
                                            <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Format</Label>
                                <Select onValueChange={(value) => setNewSchedule({ ...newSchedule, format: value })} value={newSchedule.format}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select format" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {formatOptions.map((option) => (
                                            <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="recipients">Recipients</Label>
                                <Input
                                    id="recipients"
                                    placeholder="email1@example.com, email2@example.com"
                                    value={newSchedule.recipients}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewSchedule({ ...newSchedule, recipients: e.target.value })}
                                    className="md:col-span-2"
                                />
                                <p className="text-sm text-muted-foreground">Separate multiple emails with commas</p>
                            </div>

                            <div className="flex items-center space-x-3">
                                <Button onClick={handleCreateSchedule}>
                                    Create Schedule
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => setShowCreateForm(false)}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Schedules List */}
                <div className="space-y-4">
                    {schedules.map((schedule) => (
                        <div
                            key={schedule.id}
                            className="p-4 border rounded-lg border-border hover:shadow-card transition-smooth"
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center mb-2 space-x-3">
                                        <h4 className="font-semibold text-card-foreground">{schedule.name}</h4>
                                        <span className={`px-2 py-1 text-xs rounded-full font-medium ${getReportTypeColor(schedule.reportType)}`}>
                                            {reportTypeOptions.find(opt => opt.value === schedule.reportType)?.label}
                                        </span>
                                        <div className={`flex items-center space-x-1 ${schedule.active ? 'text-success' : 'text-muted-foreground'}`}>
                                            <div className={`w-2 h-2 rounded-full ${schedule.active ? 'bg-success' : 'bg-muted-foreground'}`} />
                                            <span className="text-xs">{schedule.active ? 'Active' : 'Inactive'}</span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-3">
                                        <div className="flex items-center space-x-2">
                                            <DynamicIcon name={getFrequencyIcon(schedule.frequency)} size={16} className="text-muted-foreground" />
                                            <span className="text-muted-foreground">
                                                {frequencyOptions.find(opt => opt.value === schedule.frequency)?.label}
                                            </span>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <DynamicIcon name="clock" size={16} className="text-muted-foreground" />
                                            <span className="text-muted-foreground">
                                                Next: {formatNextRun(schedule.nextRun)}
                                            </span>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <DynamicIcon name="file-text" size={16} className="text-muted-foreground" />
                                            <span className="uppercase text-muted-foreground">
                                                {schedule.format}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="mt-3">
                                        <div className="flex items-center mb-1 space-x-2">
                                            <DynamicIcon name="mail" size={16} className="text-muted-foreground" />
                                            <span className="text-sm text-muted-foreground">Recipients:</span>
                                        </div>
                                        <div className="flex flex-wrap gap-1">
                                            {schedule.recipients.map((email, index) => (
                                                <span
                                                    key={index}
                                                    className="px-2 py-1 text-xs rounded bg-muted text-muted-foreground"
                                                >
                                                    {email}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between ml-4 space-x-2">
                                    <Label htmlFor="active" className="flex items-center space-x-2">
                                        <Checkbox
                                            id="active"
                                            checked={schedule.active}
                                            onChange={() => toggleSchedule(schedule.id)}
                                        />Active</Label>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => deleteSchedule(schedule.id)}
                                        className="text-error hover:text-error hover:bg-error/10"
                                    >
                                        <DynamicIcon name="trash-2" size={16} />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {schedules.length === 0 && (
                    <div className="py-12 text-center">
                        <DynamicIcon name="calendar-x" size={48} className="mx-auto mb-4 text-muted-foreground" />
                        <h4 className="mb-2 text-lg font-medium text-card-foreground">No Scheduled Reports</h4>
                        <p className="mb-4 text-muted-foreground">
                            Create your first automated report to get started
                        </p>
                        <Button onClick={() => setShowCreateForm(true)}>
                            <DynamicIcon name="plus" size={16} />
                            Create Schedule
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReportScheduler;

