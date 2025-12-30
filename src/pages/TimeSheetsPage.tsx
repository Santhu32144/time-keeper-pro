import { Clock, Play, Pause, Plus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAppSelector } from '@/store/hooks';

const TimeSheetsPage = () => {
  const { currentUser } = useAppSelector((state) => state.auth);

  const stats = [
    { label: 'Today', value: '4h 30m', change: '+1h 15m' },
    { label: 'This Week', value: '32h 45m', change: '+5h 20m' },
    { label: 'This Month', value: '128h 30m', change: 'On track' },
    { label: 'Projects', value: '5', change: '2 active' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Time Sheets</h1>
          <p className="text-muted-foreground">
            Welcome back, {currentUser?.username}! Track your time efficiently.
          </p>
        </div>
        <Button className="gap-2">
          <Play className="w-4 h-4" />
          Start Timer
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className="border-0 shadow-md">
            <CardHeader className="pb-2">
              <CardDescription className="text-sm font-medium">{stat.label}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Current Timer Card */}
      <Card className="border-0 shadow-md bg-gradient-to-r from-primary/5 to-accent/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            Current Session
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">No active timer</p>
              <p className="text-4xl font-bold text-foreground mt-2">00:00:00</p>
            </div>
            <div className="flex gap-2">
              <Button size="lg" className="gap-2">
                <Play className="w-5 h-5" />
                Start
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Entries */}
      <Card className="border-0 shadow-md">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Entries</CardTitle>
            <CardDescription>Your latest time tracking entries</CardDescription>
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Plus className="w-4 h-4" />
            Add Entry
          </Button>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <Clock className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p>No time entries yet</p>
            <p className="text-sm">Start tracking your time to see entries here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TimeSheetsPage;
