import React, { useState } from 'react';
import FeedbackCard from '@/components/FeedbackCard';
import { Download, Users, Star as StarIcon, Clock, CheckCircle, XCircle, TrendingUp, Filter, Search, AlertTriangle, AlertCircle, Reply, CheckSquare } from 'lucide-react';

// Minimal UI stubs
const Card = ({ children, className = '' }) => (
	<div className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}>{children}</div>
);
const CardContent = ({ children, className = '' }) => (
	<div className={`p-6 ${className}`}>{children}</div>
);
const CardHeader = ({ children, className = '' }) => (
	<div className={`flex flex-col space-y-1.5 p-6 ${className}`}>{children}</div>
);
const CardTitle = ({ children, className = '' }) => (
	<h3 className={`text-lg font-semibold leading-none tracking-tight ${className}`}>{children}</h3>
);
const Tabs = ({ children, value, onValueChange, className = '' }) => (
	<div className={className}>{children}</div>
);
const TabsList = ({ children, className = '' }) => (
	<div className={`inline-grid gap-2 ${className}`}>{children}</div>
);
const TabsTrigger = ({ children, value, className = '', onClick }) => (
	<button className={`rounded-md border px-3 py-1.5 text-sm ${className}`} onClick={onClick}>{children}</button>
);
const TabsContent = ({ children }) => <div>{children}</div>;
const Select = ({ children }) => <div className="relative inline-block">{children}</div>;
const SelectTrigger = ({ children, className = '' }) => (
	<button className={`rounded-md border px-3 py-1.5 text-sm ${className}`}>{children}</button>
);
const SelectContent = ({ children }) => <div className="mt-2 rounded-md border bg-popover p-2">{children}</div>;
const SelectItem = ({ children, onClick }) => <div onClick={onClick} className="px-2 py-1.5 text-sm hover:bg-accent/30 rounded-md cursor-pointer">{children}</div>;
const SelectValue = ({ placeholder }) => <span className="text-muted-foreground">{placeholder}</span>;
const Input = ({ className = '', ...props }) => (
	<input className={`w-full rounded-md border px-3 py-2 text-sm ${className}`} {...props} />
);
const Button = ({ children, className = '', ...props }) => (
	<button className={`inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm ${className}`} {...props}>{children}</button>
);
const Avatar = ({ children }) => <div className="h-8 w-8 rounded-full bg-muted inline-flex items-center justify-center">{children}</div>;
const AvatarFallback = ({ children, className = '' }) => <div className={`text-xs font-medium ${className}`}>{children}</div>;

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [typeFilter, setTypeFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const allFeedbacks = [
    { feedbackId: 1, userName: 'John Doe', targetType: 'repair', targetId: 'RPR001', rating: 5, comments: 'Excellent repair service! My laptop is working perfectly now. The technician was very professional and explained everything clearly.', status: 'pending', createdAt: '2024-01-15T10:30:00Z' },
    { feedbackId: 2, userName: 'Jane Smith', targetType: 'product', targetId: 'PRD123', rating: 4, comments: 'Good quality RAM module. Installation was smooth and performance improved significantly.', status: 'approved', createdAt: '2024-01-14T14:20:00Z' },
    { feedbackId: 3, userName: 'Mike Johnson', targetType: 'repair', targetId: 'RPR002', rating: 2, comments: 'Service was delayed and communication was poor. Not satisfied with the experience.', status: 'pending', createdAt: '2024-01-13T09:15:00Z' }
  ];

  const [complaints, setComplaints] = useState([
    { complaintId: 1, userName: 'John Doe', subject: 'Delayed Service', description: 'Repair took longer than promised.', status: 'open', adminReply: '', createdAt: '2024-01-09T12:00:00Z' }
  ]);

  const handleApproveFeedback = (feedbackId) => alert(`Approved #${feedbackId}`);
  const handleRejectFeedback = (feedbackId) => alert(`Rejected #${feedbackId}`);
  const handleFlagFeedback = (feedbackId) => alert(`Flagged #${feedbackId}`);
  const handleEditFeedback = (feedbackId) => alert(`Edit #${feedbackId}`);
  const handleDeleteFeedback = (feedbackId) => alert(`Deleted #${feedbackId}`);
  const handleExportReport = () => alert('Export started');

  const replyComplaint = (id) => {
    const text = prompt('Enter reply:');
    if (text) setComplaints(prev => prev.map(c => c.complaintId === id ? { ...c, adminReply: text, status: 'replied' } : c));
  };
  const closeComplaint = (id) => setComplaints(prev => prev.map(c => c.complaintId === id ? { ...c, status: 'closed' } : c));

  const getFilteredFeedbacks = () => {
    let filtered = allFeedbacks;
    if (activeTab !== 'all') filtered = filtered.filter(feedback => feedback.status === activeTab);
    if (typeFilter !== 'all') filtered = filtered.filter(feedback => feedback.targetType === typeFilter);
    if (searchQuery) {
      filtered = filtered.filter(feedback =>
        feedback.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        feedback.comments.toLowerCase().includes(searchQuery.toLowerCase()) ||
        feedback.targetId.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return filtered;
  };

  const filteredFeedbacks = getFilteredFeedbacks();
  const stats = {
    total: allFeedbacks.length,
    pending: allFeedbacks.filter(f => f.status === 'pending').length,
    approved: allFeedbacks.filter(f => f.status === 'approved').length,
    rejected: allFeedbacks.filter(f => f.status === 'rejected').length,
    avgRating: (allFeedbacks.reduce((sum, f) => sum + f.rating, 0) / allFeedbacks.length).toFixed(1)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      <header className="border-b bg-card/50 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-semibold">Admin Dashboard</h1>
                <p className="text-sm text-muted-foreground">Manage feedback and complaints</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button onClick={handleExportReport} className="border">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
              <Avatar>
                <AvatarFallback className="bg-primary/10 text-primary">AD</AvatarFallback>
              </Avatar>
              <div className="text-right">
                <p className="text-sm font-medium">Admin User</p>
                <p className="text-xs text-muted-foreground">Administrator</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <Card><CardContent className="pt-6"><div className="flex items-center justify-between"><div><p className="text-sm text-muted-foreground">Total Reviews</p><p className="text-2xl font-bold">{stats.total}</p></div><Users className="w-8 h-8 text-primary/60" /></div></CardContent></Card>
          <Card><CardContent className="pt-6"><div className="flex items-center justify-between"><div><p className="text-sm text-muted-foreground">Pending</p><p className="text-2xl font-bold text-yellow-600">{stats.pending}</p></div><Clock className="w-8 h-8 text-yellow-600" /></div></CardContent></Card>
          <Card><CardContent className="pt-6"><div className="flex items-center justify-between"><div><p className="text-sm text-muted-foreground">Approved</p><p className="text-2xl font-bold text-green-600">{stats.approved}</p></div><CheckCircle className="w-8 h-8 text-green-600" /></div></CardContent></Card>
          <Card><CardContent className="pt-6"><div className="flex items-center justify-between"><div><p className="text-sm text-muted-foreground">Rejected</p><p className="text-2xl font-bold text-red-600">{stats.rejected}</p></div><XCircle className="w-8 h-8 text-red-600" /></div></CardContent></Card>
          <Card><CardContent className="pt-6"><div className="flex items-center justify-between"><div><p className="text-sm text-muted-foreground">Avg Rating</p><p className="text-2xl font-bold text-yellow-600">{stats.avgRating}</p></div><StarIcon className="w-8 h-8 text-yellow-600" /></div></CardContent></Card>
        </div>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Filters:</span>
                </div>
                <Select>
                  <SelectTrigger className="w-40"><SelectValue placeholder="Type" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem onClick={() => setTypeFilter('all')}>All Types</SelectItem>
                    <SelectItem onClick={() => setTypeFilter('repair')}>Repairs</SelectItem>
                    <SelectItem onClick={() => setTypeFilter('product')}>Products</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="relative w-full lg:w-80">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search by user, comment, or ID..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full max-w-xl grid-cols-4">
            <TabsTrigger value="pending" onClick={() => setActiveTab('pending')} className="flex items-center gap-2"><Clock className="w-4 h-4" />Pending ({stats.pending})</TabsTrigger>
            <TabsTrigger value="approved" onClick={() => setActiveTab('approved')} className="flex items-center gap-2"><CheckCircle className="w-4 h-4" />Approved ({stats.approved})</TabsTrigger>
            <TabsTrigger value="rejected" onClick={() => setActiveTab('rejected')} className="flex items-center gap-2"><XCircle className="w-4 h-4" />Rejected ({stats.rejected})</TabsTrigger>
            <TabsTrigger value="all" onClick={() => setActiveTab('all')} className="flex items-center gap-2"><TrendingUp className="w-4 h-4" />All ({stats.total})</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab}>
            <div className="space-y-4">
              {filteredFeedbacks.length > 0 ? (
                filteredFeedbacks.map((feedback) => (
                  <FeedbackCard
                    key={feedback.feedbackId}
                    feedback={feedback}
                    onApprove={handleApproveFeedback}
                    onReject={handleRejectFeedback}
                    onFlag={handleFlagFeedback}
                    onEdit={handleEditFeedback}
                    onDelete={handleDeleteFeedback}
                    showAdminActions={true}
                  />
                ))
              ) : (
                <Card>
                  <CardContent className="pt-8 pb-8 text-center">
                    <AlertTriangle className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No feedback found</h3>
                    <p className="text-muted-foreground">No {activeTab === 'all' ? '' : activeTab + ' '}feedback available</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2"><AlertCircle className="w-5 h-5" /> Complaint Management</h2>
          <div className="space-y-3">
            {complaints.length ? complaints.map((c) => (
              <Card key={c.complaintId}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{c.subject} • <span className="text-sm text-muted-foreground">{c.userName}</span></CardTitle>
                    <span className={`text-xs px-2 py-1 rounded-md border ${c.status === 'replied' ? 'text-green-400' : c.status === 'closed' ? 'text-red-400' : 'text-yellow-600'}`}>{c.status}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">{c.description}</p>
                  {c.adminReply && (
                    <div className="rounded-md border border-border p-3 bg-muted/20 mb-3">
                      <p className="text-xs text-muted-foreground mb-1">Your Reply</p>
                      <p className="text-sm">{c.adminReply}</p>
                    </div>
                  )}
                  <div className="flex gap-2">
                    <Button onClick={() => replyComplaint(c.complaintId)} className="border"><Reply className="w-4 h-4" /> Reply</Button>
                    <Button onClick={() => closeComplaint(c.complaintId)} className="border"><CheckSquare className="w-4 h-4" /> Close</Button>
                  </div>
                </CardContent>
              </Card>
            )) : (
              <Card><CardContent className="text-center py-8 text-muted-foreground">No complaints</CardContent></Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
