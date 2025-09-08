import React, { useState } from 'react';
import { Download, TrendingUp, Users, Calendar, Star as StarIcon, Package, Wrench, AlertCircle } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Minimal UI stubs
const Card = ({ children, className = '' }) => (
	<div className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}>{children}</div>
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
const Button = ({ children, className = '', ...props }) => (
	<button className={`inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm ${className}`} {...props}>{children}</button>
);
const Avatar = ({ children }) => <div className="h-8 w-8 rounded-full bg-muted inline-flex items-center justify-center">{children}</div>;
const AvatarFallback = ({ children, className = '' }) => <div className={`text-xs font-medium ${className}`}>{children}</div>;
const Tabs = ({ children, defaultValue = 'trends', className = '' }) => {
	const [value, setValue] = useState(defaultValue);
	return (
		<div className={className} data-tabs-value={value}>
			{React.Children.map(children, (child) => React.cloneElement(child, { tabsValue: value, setTabsValue: setValue }))}
		</div>
	);
};
const TabsList = ({ children, className = '' }) => (
	<div className={`inline-grid gap-2 ${className}`}>{children}</div>
);
const TabsTrigger = ({ children, value, tabsValue, setTabsValue, className = '' }) => (
	<button onClick={() => setTabsValue(value)} className={`rounded-md border px-3 py-1.5 text-sm ${tabsValue === value ? 'bg-accent/20' : ''} ${className}`}>{children}</button>
);
const TabsContent = ({ children, value, tabsValue, className = '' }) => (
	<div className={className} hidden={tabsValue !== value}>{children}</div>
);
const Select = ({ children }) => <div className="relative inline-block">{children}</div>;
const SelectTrigger = ({ children, className = '' }) => (
	<button className={`rounded-md border px-3 py-1.5 text-sm ${className}`}>{children}</button>
);
const SelectContent = ({ children }) => <div className="mt-2 rounded-md border bg-popover p-2">{children}</div>;
const SelectItem = ({ children, onClick }) => <div onClick={onClick} className="px-2 py-1.5 text-sm hover:bg-accent/30 rounded-md cursor-pointer">{children}</div>;
const SelectValue = () => <span className="text-muted-foreground">Select</span>;
const Badge = ({ children, className = '' }) => <span className={`inline-flex items-center rounded-md border px-2 py-1 text-xs font-medium ${className}`}>{children}</span>;

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('30d');

  const overviewStats = {
    totalReviews: 1247,
    avgRating: 4.2,
    satisfactionRate: 87,
    responseTime: '2.3 hours',
    trendsData: [
      { month: 'Jan', reviews: 98, avgRating: 4.1 },
      { month: 'Feb', reviews: 112, avgRating: 4.0 },
      { month: 'Mar', reviews: 134, avgRating: 4.2 },
      { month: 'Apr', reviews: 156, avgRating: 4.3 },
      { month: 'May', reviews: 189, avgRating: 4.4 },
      { month: 'Jun', reviews: 203, avgRating: 4.2 },
    ]
  };

  const ratingDistribution = [
    { rating: '5 Stars', count: 523, percentage: 42 },
    { rating: '4 Stars', count: 374, percentage: 30 },
    { rating: '3 Stars', count: 187, percentage: 15 },
    { rating: '2 Stars', count: 99, percentage: 8 },
    { rating: '1 Star', count: 64, percentage: 5 },
  ];

  const serviceComparison = [
    { service: 'Laptop Repair', avgRating: 4.5, totalReviews: 342, satisfaction: 91 },
    { service: 'Phone Repair', avgRating: 4.2, totalReviews: 289, satisfaction: 85 },
    { service: 'Desktop Repair', avgRating: 4.3, totalReviews: 156, satisfaction: 88 },
    { service: 'RAM Modules', avgRating: 4.6, totalReviews: 234, satisfaction: 93 },
    { service: 'Storage Devices', avgRating: 4.4, totalReviews: 198, satisfaction: 89 },
    { service: 'Graphics Cards', avgRating: 4.1, totalReviews: 128, satisfaction: 82 },
  ];

  const monthlyTrends = [
    { month: 'Jan', repairs: 45, products: 53, total: 98 },
    { month: 'Feb', repairs: 52, products: 60, total: 112 },
    { month: 'Mar', repairs: 61, products: 73, total: 134 },
    { month: 'Apr', repairs: 71, products: 85, total: 156 },
    { month: 'May', repairs: 89, products: 100, total: 189 },
    { month: 'Jun', repairs: 95, products: 108, total: 203 },
  ];

  const pieChartColors = ['hsl(var(--primary))', 'hsl(var(--accent))', 'hsl(var(--warning))', 'hsl(var(--destructive))', 'hsl(var(--muted))'];

  const handleExportReport = () => {
    console.log('Exporting analytics report...');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-semibold">Analytics & Reports</h1>
                <p className="text-sm text-muted-foreground">Feedback insights and trends</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Select>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem onClick={() => setTimeRange('7d')}>Last 7 days</SelectItem>
                  <SelectItem onClick={() => setTimeRange('30d')}>Last 30 days</SelectItem>
                  <SelectItem onClick={() => setTimeRange('90d')}>Last 90 days</SelectItem>
                  <SelectItem onClick={() => setTimeRange('1y')}>Last year</SelectItem>
                </SelectContent>
              </Select>
              
              <Button onClick={handleExportReport} className="border" size="sm">
                <Download className="w-4 h-4" />
                Export
              </Button>
              
              <Avatar>
                <AvatarFallback className="bg-primary/10 text-primary">AD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Reviews</p>
                  <p className="text-3xl font-bold">{overviewStats.totalReviews.toLocaleString()}</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +12% from last month
                  </p>
                </div>
                <Users className="w-8 h-8 text-primary/60" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Average Rating</p>
                  <div className="flex items-center gap-1">
                    <p className="text-3xl font-bold">{overviewStats.avgRating}</p>
                    <StarIcon className="w-5 h-5 text-yellow-500" />
                  </div>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +0.3 from last month
                  </p>
                </div>
                <StarIcon className="w-8 h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Satisfaction Rate</p>
                  <p className="text-3xl font-bold">{overviewStats.satisfactionRate}%</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    +5% from last month
                  </p>
                </div>
                <AlertCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg Response Time</p>
                  <p className="text-3xl font-bold">{overviewStats.responseTime}</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    15min faster
                  </p>
                </div>
                <Calendar className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="trends" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="ratings">Ratings</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
          </TabsList>

          <TabsContent value="trends" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Review Trends (Last 6 Months)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={overviewStats.trendsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="reviews" stroke="#3b82f6" strokeWidth={3} name="Total Reviews" />
                      <Line type="monotone" dataKey="avgRating" stroke="#f59e0b" strokeWidth={3} name="Avg Rating" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart className="w-5 h-5" />
                    Repair vs Product Reviews
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={monthlyTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="repairs" fill="#3b82f6" name="Repairs" />
                      <Bar dataKey="products" fill="#10b981" name="Products" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="ratings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <StarIcon className="w-5 h-5" />
                    Rating Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie data={ratingDistribution} cx="50%" cy="50%" labelLine={false} label={({ rating, percentage }) => `${rating}: ${percentage}%`} outerRadius={100} fill="#8884d8" dataKey="count">
                        {ratingDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#6b7280"][index % 5]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    Rating Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {ratingDistribution.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1">
                          <Badge className="w-24 justify-center">{item.rating}</Badge>
                          <div className="flex-1 bg-muted rounded-full h-2">
                            <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${item.percentage}%` }} />
                          </div>
                        </div>
                        <div className="text-right w-20">
                          <p className="font-medium">{item.count}</p>
                          <p className="text-xs text-muted-foreground">{item.percentage}%</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="services" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Service Performance Comparison
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {serviceComparison.map((service, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-medium flex items-center gap-2">
                          {service.service.includes('Repair') ? <Wrench className="w-4 h-4 text-blue-500" /> : <Package className="w-4 h-4 text-green-500" />}
                          {service.service}
                        </h3>
                        <Badge className={service.satisfaction >= 90 ? 'text-green-600' : service.satisfaction >= 85 ? 'text-yellow-600' : 'text-red-600'}>
                          {service.satisfaction}% Satisfied
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center">
                          <p className="text-2xl font-bold flex items-center justify-center gap-1">
                            {service.avgRating}
                            <StarIcon className="w-4 h-4 text-yellow-500" />
                          </p>
                          <p className="text-xs text-muted-foreground">Average Rating</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold">{service.totalReviews}</p>
                          <p className="text-xs text-muted-foreground">Total Reviews</p>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <div className="flex-1 bg-muted rounded-full h-2">
                              <div className={`${service.satisfaction >= 90 ? 'bg-green-500' : service.satisfaction >= 85 ? 'bg-yellow-500' : 'bg-red-500'} h-2 rounded-full`} style={{ width: `${service.satisfaction}%` }} />
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground">Satisfaction Rate</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Analytics;
