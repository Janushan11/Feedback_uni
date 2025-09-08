import React, { useState } from 'react';
import FeedbackCard from '@/components/FeedbackCard';
import StarRating from '@/components/StarRating';
import { Plus, MessageSquare, Star as StarIcon, Package, Wrench, Filter, AlertCircle } from 'lucide-react';

// Minimal UI stubs
const Card = ({ children, className = '' }) => (
	<div className={`rounded-lg border border-border bg-card text-card-foreground card-animation ${className}`}>{children}</div>
);
const CardHeader = ({ children, className = '' }) => (
	<div className={`flex flex-col space-y-1.5 p-6 ${className}`}>{children}</div>
);
const CardTitle = ({ children, className = '' }) => (
	<h3 className={`text-lg font-semibold leading-none tracking-tight ${className}`}>{children}</h3>
);
const CardContent = ({ children, className = '' }) => (
	<div className={`p-6 pt-0 ${className}`}>{children}</div>
);
const Tabs = ({ children, value, onValueChange, className = '' }) => (
	<div className={className} data-tabs-value={value}>{children}</div>
);
const TabsList = ({ children, className = '' }) => (
	<div className={`inline-grid gap-2 ${className}`}>{children}</div>
);
const TabsTrigger = ({ children, value, onClick, className = '' }) => (
	<button onClick={onClick} className={`tabs-trigger rounded-md border border-border px-3 py-1.5 text-sm ${className}`}>{children}</button>
);
const TabsContent = ({ children, value, activeValue, className = '' }) => (
	<div className={className} hidden={activeValue !== value}>{children}</div>
);
const Select = ({ children }) => <div className="relative inline-block">{children}</div>;
const SelectTrigger = ({ children, className = '' }) => (
	<button className={`rounded-md border border-border px-3 py-2 text-sm ${className}`}>{children}</button>
);
const SelectContent = ({ children }) => <div className="select-content mt-2 rounded-md border bg-popover p-2">{children}</div>;
const SelectItem = ({ children, onClick }) => <div onClick={onClick} className="px-2 py-1.5 text-sm hover:bg-accent/30 rounded-md cursor-pointer">{children}</div>;
const SelectValue = ({ placeholder }) => <span className="text-muted-foreground">{placeholder}</span>;
const Badge = ({ children, className = '' }) => <span className={`inline-flex items-center rounded-md border px-2 py-1 text-xs font-medium ${className}`}>{children}</span>;
const Input = ({ className = '', ...props }) => (
	<input className={`w-full rounded-md border border-border bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 ${className}`} {...props} />
);
const Label = ({ children, htmlFor }) => <label htmlFor={htmlFor} className="text-sm font-medium text-muted-foreground">{children}</label>;
const Textarea = ({ className = '', ...props }) => (
	<textarea className={`w-full rounded-md border border-border bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 ${className}`} {...props} />
);
const Button = ({ children, className = '', style, ...props }) => (
	<button className={`button inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm ${className}`} style={style} {...props}>{children}</button>
);
const Avatar = ({ children }) => <div className="h-9 w-9 rounded-full bg-muted inline-flex items-center justify-center">{children}</div>;
const AvatarFallback = ({ children, className = '' }) => <div className={`text-xs font-medium ${className}`}>{children}</div>;

// Simple modal
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
                <h1 className="text-xl font-semibold">Customer Dashboard</h1>
                <p className="text-sm text-muted-foreground">Manage your feedback and reviews</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button onClick={() => setShowComplaintModal(true)} style={{ background: 'linear-gradient(45deg, #ea580c, #f59e0b)' }}>
                <AlertCircle className="w-4 h-4" />
                New Complaint
              </Button>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback className="bg-primary/10 text-primary">JD</AvatarFallback>
                </Avatar>
                <div className="text-right">
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-xs text-muted-foreground">Customer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full max-w-2xl grid-cols-3">
            <TabsTrigger value="leave-feedback" onClick={() => setActiveTab('leave-feedback')} className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Leave Feedback
            </TabsTrigger>
            <TabsTrigger value="my-reviews" onClick={() => setActiveTab('my-reviews')} className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              My Reviews
            </TabsTrigger>
            <TabsTrigger value="my-complaints" onClick={() => setActiveTab('my-complaints')} className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              My Complaints
            </TabsTrigger>
          </TabsList>

          <TabsContent value="leave-feedback" activeValue={activeTab}>
            <Card className="max-w-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <StarIcon className="w-5 h-5 text-primary" />
                  Submit New Feedback
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitFeedback} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="target-type">Feedback Type *</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select feedback type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem onClick={() => updateForm('targetType', 'repair')}>
                            <div className="flex items-center gap-2">
                              <Wrench className="w-4 h-4" />
                              Repair Service
                            </div>
                          </SelectItem>
                          <SelectItem onClick={() => updateForm('targetType', 'product')}>
                            <div className="flex items-center gap-2">
                              <Package className="w-4 h-4" />
                              Product Purchase
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="target-id">{feedbackForm.targetType === 'repair' ? 'Repair ID' : 'Product ID'} *</Label>
                      <Input id="target-id" placeholder={feedbackForm.targetType === 'repair' ? 'Enter repair ID (e.g., RPR001)' : 'Enter product ID (e.g., PRD123)'} value={feedbackForm.targetId} onChange={(e) => updateForm('targetId', e.target.value)} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Rating *</Label>
                    <div className="flex items-center gap-3">
                      <StarRating rating={feedbackForm.rating} onRatingChange={(rating) => updateForm('rating', rating)} size="lg" />
                      <span className="text-sm text-muted-foreground">
                        {feedbackForm.rating > 0 ? `${feedbackForm.rating} out of 5 stars` : 'Click to rate'}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="comments">Comments</Label>
                    <Textarea id="comments" placeholder="Share your experience..." value={feedbackForm.comments} onChange={(e) => updateForm('comments', e.target.value)} rows={4} />
                  </div>

                  <Button type="submit" className="w-full" style={{ background: 'linear-gradient(45deg, #0f766e, #14b8a6)' }}>
                    <Plus className="w-4 h-4" />
                    Submit Feedback
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="my-reviews" activeValue={activeTab}>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold">My Reviews</h2>
                  <p className="text-muted-foreground">View and track your submitted feedback</p>
                </div>
                
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-muted-foreground" />
                  <Select>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem onClick={() => setFilter('all')}>All Reviews</SelectItem>
                      <SelectItem onClick={() => setFilter('repair')}>Repair Reviews</SelectItem>
                      <SelectItem onClick={() => setFilter('product')}>Product Reviews</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Total Reviews</p>
                        <p className="text-2xl font-bold">{userFeedbacks.length}</p>
                      </div>
                      <MessageSquare className="w-8 h-8 text-primary/60" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Average Rating</p>
                        <p className="text-2xl font-bold">{(userFeedbacks.reduce((s,f)=>s+f.rating,0)/userFeedbacks.length).toFixed(1)}</p>
                      </div>
                      <StarIcon className="w-8 h-8 text-yellow-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Pending Reviews</p>
                        <p className="text-2xl font-bold">{userFeedbacks.filter(f=>f.status==='pending').length}</p>
                      </div>
                      <Badge className="text-yellow-600">Pending</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                {filteredFeedbacks.length > 0 ? (
                  filteredFeedbacks.map((feedback) => (
                    <FeedbackCard key={feedback.feedbackId} feedback={feedback} showAdminActions={false} />
                  ))
                ) : (
                  <Card>
                    <CardContent className="pt-8 pb-8 text-center">
                      <MessageSquare className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">No reviews found</h3>
                      <p className="text-muted-foreground mb-4">
                        {filter === 'all' ? "You haven't submitted any reviews yet." : `No ${filter} reviews found.`}
                      </p>
                      <Button onClick={() => setActiveTab('leave-feedback')} className="border">
                        <Plus className="w-4 h-4" />
                        Leave Your First Review
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="my-complaints" activeValue={activeTab}>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold">My Complaints</h2>
                  <p className="text-muted-foreground">Track complaint status and admin replies</p>
                </div>
                <Button onClick={() => setShowComplaintModal(true)} style={{ background: 'linear-gradient(45deg, #ea580c, #f59e0b)' }}>
                  <AlertCircle className="w-4 h-4" />
                  New Complaint
                </Button>
              </div>

              <div className="space-y-3">
                {userComplaints.length ? userComplaints.map(c => (
                  <Card key={c.complaintId}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">{c.subject}</CardTitle>
                        <Badge className={c.status === 'replied' ? 'text-green-400' : 'text-yellow-600'}>
                          {c.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">{c.description}</p>
                      {c.adminReply ? (
                        <div className="rounded-md border border-border p-3 bg-muted/20">
                          <p className="text-xs text-muted-foreground mb-1">Admin Reply</p>
                          <p className="text-sm">{c.adminReply}</p>
                        </div>
                      ) : (
                        <p className="text-xs text-muted-foreground">Awaiting reply…</p>
                      )}
                    </CardContent>
                  </Card>
                )) : (
                  <Card>
                    <CardContent className="pt-8 pb-8 text-center">
                      <AlertCircle className="w-10 h-10 text-muted-foreground/50 mx-auto mb-3" />
                      <p className="text-muted-foreground">No complaints yet.</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Modal open={showComplaintModal} onClose={() => setShowComplaintModal(false)} title="Submit Complaint">
        <form onSubmit={submitComplaint} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="complaint-subject">Subject *</Label>
            <Input id="complaint-subject" value={complaintForm.subject} onChange={(e)=>setComplaintForm(s=>({...s, subject: e.target.value}))} placeholder="Brief subject" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="complaint-desc">Description *</Label>
            <Textarea id="complaint-desc" rows={4} value={complaintForm.description} onChange={(e)=>setComplaintForm(s=>({...s, description: e.target.value}))} placeholder="Explain the issue..." />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" className="border" onClick={()=>setShowComplaintModal(false)}>Cancel</Button>
            <Button type="submit" style={{ background: 'linear-gradient(45deg, #ea580c, #f59e0b)' }}>Submit Complaint</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default CustomerDashboard;
