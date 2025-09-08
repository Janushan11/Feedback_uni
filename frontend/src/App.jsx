import { useState } from 'react'
import AdminDashboard from '@/pages/AdminDashboard'
import CustomerDashboard from '@/pages/CustomerDashboard'
import Analytics from '@/pages/Analytics'
import FeedbackCard from '@/components/FeedbackCard'

function App() {
	const [view, setView] = useState('customer')

	const demoFeedback = {
		feedbackId: 101,
		userName: 'Demo User',
		targetType: 'product',
		targetId: 'PRD999',
		rating: 4,
		comments: 'Great product quality and fast shipping! Highly recommended.',
		status: 'pending',
		createdAt: new Date().toISOString()
	}

	return (
		<div>
			<div style={{ padding: 12, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
				<button onClick={() => setView('admin')} style={{ border: '1px solid #ccc', padding: '6px 10px', borderRadius: 6 }}>Admin</button>
				<button onClick={() => setView('customer')} style={{ border: '1px solid #ccc', padding: '6px 10px', borderRadius: 6 }}>Customer</button>
				<button onClick={() => setView('analytics')} style={{ border: '1px solid #ccc', padding: '6px 10px', borderRadius: 6 }}>Analytics</button>
				<button onClick={() => setView('card')} style={{ border: '1px solid #ccc', padding: '6px 10px', borderRadius: 6 }}>FeedbackCard</button>
			</div>
			{view === 'admin' && <AdminDashboard />}
			{view === 'customer' && <CustomerDashboard />}
			{view === 'analytics' && <Analytics />}
			{view === 'card' && (
				<div style={{ padding: 16, maxWidth: 720, margin: '0 auto' }}>
					<FeedbackCard feedback={demoFeedback} showAdminActions={true} onApprove={() => alert('Approved')} onReject={() => alert('Rejected')} onFlag={() => alert('Flagged')} onEdit={() => alert('Edit')} onDelete={() => alert('Delete')} />
				</div>
			)}
		</div>
	)
}

export default App
