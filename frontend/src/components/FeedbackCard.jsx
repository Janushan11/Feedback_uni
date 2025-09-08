import React from 'react';
import StarRating from './StarRating';

export const Card = ({ className = '', children }) => (
	<div className={`rounded-lg border border-border bg-card text-card-foreground card-animation ${className}`}>{children}</div>
);
export const CardHeader = ({ className = '', children }) => (
	<div className={`flex flex-col space-y-1.5 p-6 ${className}`}>{children}</div>
);
export const CardTitle = ({ className = '', children }) => (
	<h3 className={`text-xl font-semibold leading-none tracking-tight ${className}`}>{children}</h3>
);
export const CardContent = ({ className = '', children }) => (
	<div className={`p-6 pt-0 ${className}`}>{children}</div>
);

export const Badge = ({ className = '', children }) => (
	<span className={`inline-flex items-center rounded-md border px-2 py-1 text-xs font-medium ${className}`}>{children}</span>
);
export const Button = ({ className = '', children, ...props }) => (
	<button className={`button inline-flex items-center justify-center whitespace-nowrap rounded-md border border-border px-3 py-1.5 text-sm font-medium ${className}`} {...props}>{children}</button>
);
export const Avatar = ({ className = '', children }) => (
	<div className={`inline-flex h-10 w-10 items-center justify-center rounded-full bg-muted ${className}`}>{children}</div>
);
export const AvatarFallback = ({ className = '', children }) => (
	<div className={`flex h-full w-full items-center justify-center rounded-full ${className}`}>{children}</div>
);

const FeedbackCard = ({ 
  feedback, 
  onApprove, 
  onReject, 
  onFlag, 
  onEdit, 
  onDelete, 
  showAdminActions = false 
}) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'rejected': return 'bg-red-500/10 text-red-400 border-red-500/20';
      case 'pending': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      default: return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  const formatDate = (dateString) => new Date(dateString).toLocaleString();

  return (
    <Card className="w-full hover:shadow-xl">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-primary/10 text-primary font-medium">
                {feedback.userName?.charAt(0)?.toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-base font-medium">{feedback.userName}</CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <StarRating rating={feedback.rating} readonly size="sm" />
                <Badge className={getStatusColor(feedback.status)}>
                  {feedback.status}
                </Badge>
              </div>
            </div>
          </div>
          <span className="text-xs text-muted-foreground">{formatDate(feedback.createdAt)}</span>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <Badge className="text-xs">
              {feedback.targetType === 'repair' ? 'Repair Service' : 'Product'}
            </Badge>
            <span className="text-muted-foreground">
              {feedback.targetType === 'repair' ? `Repair #${feedback.targetId}` : `Product #${feedback.targetId}`}
            </span>
          </div>

          <p className="text-sm leading-relaxed text-foreground/90">{feedback.comments}</p>

          {showAdminActions && (
            <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-border/50">
              {feedback.status === 'pending' && (
                <>
                  <Button onClick={() => onApprove?.(feedback.feedbackId)} className="h-9 border-green-500 text-white hover:opacity-90" style={{ background: 'linear-gradient(45deg, #16a34a, #22c55e)' }}>Approve</Button>
                  <Button onClick={() => onReject?.(feedback.feedbackId)} className="h-9 border-red-500 text-white hover:opacity-90" style={{ background: 'linear-gradient(45deg, #dc2626, #ef4444)' }}>Reject</Button>
                </>
              )}
              <Button onClick={() => onFlag?.(feedback.feedbackId)} className="h-9">Flag</Button>
              <Button onClick={() => onEdit?.(feedback.feedbackId)} className="h-9">Edit</Button>
              <Button onClick={() => onDelete?.(feedback.feedbackId)} className="h-9 border-red-500 text-white hover:opacity-90" style={{ background: 'linear-gradient(45deg, #ef4444, #f87171)' }}>Delete</Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FeedbackCard;
