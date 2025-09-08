import React, { useState } from 'react';
import FeedbackCard from '@/components/FeedbackCard';
import StarRating from '@/components/StarRating';
import { Plus, MessageSquare, Star as StarIcon, Package, Wrench, Filter, AlertCircle } from 'lucide-react';

// Reusable UI components (Cards, Tabs, Inputs, etc.)
const Card = ({ children, className = '' }) => (<div className={`rounded-lg border border-border bg-card text-card-foreground card-animation ${className}`}>{children}</div>);
const CardHeader = ({ children, className = '' }) => (<div className={`flex flex-col space-y-1.5 p-6 ${className}`}>{children}</div>);
const CardTitle = ({ children, className = '' }) => (<h3 className={`text-lg font-semibold leading-none tracking-tight ${className}`}>{children}</h3>);
const CardContent = ({ children, className = '' }) => (<div className={`p-6 pt-0 ${className}`}>{children}</div>);
const Tabs = ({ children, value, onValueChange, className = '' }) => (<div className={className} data-tabs-value={value}>{children}</div>);
const TabsList = ({ children, className = '' }) => (<div className={`inline-grid gap-2 ${className}`}>{children}</div>);
const TabsTrigger = ({ children, value, onClick, className = '' }) => (<button onClick={onClick} className={`tabs-trigger rounded-md border border-border px-3 py-1.5 text-sm ${className}`}>{children}</button>);
const TabsContent = ({ children, value, activeValue, className = '' }) => (<div className={className} hidden={activeValue !== value}>{children}</div>);
const Select = ({ children }) => <div className="relative inline-block">{children}</div>;
const SelectTrigger = ({ children, className = '' }) => (<button className={`rounded-md border border-border px-3 py-2 text-sm ${className}`}>{children}</button>);
const SelectContent = ({ children }) => <div className="select-content mt-2 rounded-md border bg-popover p-2">{children}</div>;
const SelectItem = ({ children, onClick }) => <div onClick={onClick} className="px-2 py-1.5 text-sm hover:bg-accent/30 rounded-md cursor-pointer">{children}</div>;
const SelectValue = ({ placeholder }) => <span className="text-muted-foreground">{placeholder}</span>;
const Badge = ({ children, className = '' }) => <span className={`inline-flex items-center rounded-md border px-2 py-1 text-xs font-medium ${className}`}>{children}</span>;
const Input = ({ className = '', ...props }) => (<input className={`w-full rounded-md border border-border bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 ${className}`} {...props} />);
const Label = ({ children, htmlFor }) => <label htmlFor={htmlFor} className="text-sm font-medium text-muted-foreground">{children}</label>;
const Textarea = ({ className = '', ...props }) => (<textarea className={`w-full rounded-md border border-border bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 ${className}`} {...props} />);
const Button = ({ children, className = '', style, ...props }) => (<button className={`button inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm ${className}`} style={style} {...props}>{children}</button>);
const Avatar = ({ children }) => <div className="h-9 w-9 rounded-full bg-muted inline-flex items-center justify-center">{children}</div>;
const AvatarFallback = ({ children, className = '' }) => <div className={`text-xs font-medium ${className}`}>{children}</div>;
const Modal = ({ open, onClose, title, children }) => {
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/60" onClick={onClose} />
            <div className="relative z-10 w-full max-w-lg rounded-lg border border-border bg-card p-4">
                <div className="flex items-center justify-between pb-3 border-b border-border/50">
                    <h3 className="text-lg font-semibold">{title}</h3>
                    <button onClick={onClose} className="rounded-md border border-border px-2 py-1 text-sm">Close</button>
                </div>
                <div className="pt-4">{children}</div>
            </div>
        </div>
    );
};

const CustomerDashboard = () => {
    const [activeTab, setActiveTab] = useState('leave-feedback');
    const [feedbackForm, setFeedbackForm] = useState({ targetType: '', targetId: '', rating: 0, comments: '' });
    const [filter, setFilter] = useState('all');
    const [showComplaintModal, setShowComplaintModal] = useState(false);
    const [complaintForm, setComplaintForm] = useState({ subject: '', description: '' });

    const [userFeedbacks, setUserFeedbacks] = useState([
        { feedbackId: 1, userName: 'John Doe', targetType: 'repair', targetId: 'RPR001', rating: 5, comments: 'Excellent repair service! My laptop is working perfectly now. The technician was very professional and explained everything clearly.', status: 'approved', createdAt: '2024-01-15T10:30:00Z' },
        { feedbackId: 2, userName: 'John Doe', targetType: 'product', targetId: 'PRD123', rating: 4, comments: 'Good quality RAM module. Installation was smooth and performance improved significantly.', status: 'pending', createdAt: '2024-01-10T14:20:00Z' }
    ]);

    const [userComplaints, setUserComplaints] = useState([
        { complaintId: 1, subject: 'Delayed Service', description: 'Repair took longer than promised.', status: 'open', adminReply: '', createdAt: '2024-01-09T12:00:00Z' }
    ]);

    const handleSubmitFeedback = (e) => {
        e.preventDefault();
        if (!feedbackForm.targetType || !feedbackForm.targetId || !feedbackForm.rating) {
            alert('Please fill in all required fields.');
            return;
        }
        const newFeedback = {
            feedbackId: Date.now(),
            userName: 'John Doe',
            targetType: feedbackForm.targetType,
            targetId: feedbackForm.targetId,
            rating: feedbackForm.rating,
            comments: feedbackForm.comments,
            status: 'pending',
            createdAt: new Date().toISOString()
        };
        setUserFeedbacks(prev => [newFeedback, ...prev]);
        alert('Feedback submitted and pending review.');
        setFeedbackForm({ targetType: '', targetId: '', rating: 0, comments: '' });
        setActiveTab('my-reviews');
    };

    const updateForm = (field, value) => setFeedbackForm(prev => ({ ...prev, [field]: value }));

    const submitComplaint = (e) => {
        e.preventDefault();
        if (!complaintForm.subject || !complaintForm.description) {
            alert('Please provide subject and description.');
            return;
        }
        const newComplaint = {
            complaintId: Date.now(),
            subject: complaintForm.subject,
            description: complaintForm.description,
            status: 'open',
            adminReply: '',
            createdAt: new Date().toISOString()
        };
        setUserComplaints(prev => [newComplaint, ...prev]);
        setComplaintForm({ subject: '', description: '' });
        setShowComplaintModal(false);
        setActiveTab('my-complaints');
    };

    const filteredFeedbacks = userFeedbacks.filter(f => (filter === 'all' ? true : f.targetType === filter));

    return (
        <div className="min-h-screen bg-gradient-to-br">
            <header className="border-b border-border/50 bg-card/60 backdrop-blur-md sticky top-0 z-10">
                <div className="container py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
                                <StarIcon className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <h1 className="text-xl font-semibold">
                                    Feedback Management System – Repairs & Products
                                </h1>
                                <p className="text-sm text-muted-foreground">
                                    Manage your reviews, feedback, and complaints
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Button onClick={() => setShowComplaintModal(true)} style={{ background: 'linear-gradient(45deg, #ea580c, #f59e0b)' }}>
                                <AlertCircle className="w-4 h-4" />New Complaint
                            </Button>
                            <div className="flex items-center gap-3">
                                <div className="h-9 w-9 rounded-full bg-muted inline-flex items-center justify-center">JD</div>
                                <div className="text-right">
                                    <p className="text-sm font-medium">John Doe</p>
                                    <p className="text-xs text-muted-foreground">Customer</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Rest of your Tabs + Content stays unchanged */}
            {/* ... */}
        </div>
    );
};

export default CustomerDashboard;
