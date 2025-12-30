import { Calendar, Plus, PartyPopper } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const HolidaysPage = () => {
  const upcomingHolidays = [
    { name: "New Year's Day", date: 'January 1, 2025' },
    { name: 'Martin Luther King Jr. Day', date: 'January 20, 2025' },
    { name: "Presidents' Day", date: 'February 17, 2025' },
    { name: 'Memorial Day', date: 'May 26, 2025' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Holidays</h1>
          <p className="text-muted-foreground">Manage company holidays and time off</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add Holiday
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-0 shadow-md">
          <CardHeader className="pb-2">
            <CardDescription>Total Holidays</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingHolidays.length}</div>
            <p className="text-xs text-muted-foreground mt-1">This year</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardHeader className="pb-2">
            <CardDescription>Next Holiday</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{upcomingHolidays[0]?.name}</div>
            <p className="text-xs text-muted-foreground mt-1">{upcomingHolidays[0]?.date}</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardHeader className="pb-2">
            <CardDescription>Remaining</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{upcomingHolidays.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Holidays left</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle>Upcoming Holidays</CardTitle>
          <CardDescription>Company-wide holidays for this year</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {upcomingHolidays.map((holiday, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <PartyPopper className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{holiday.name}</p>
                    <p className="text-sm text-muted-foreground">{holiday.date}</p>
                  </div>
                </div>
                <Calendar className="w-5 h-5 text-muted-foreground" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HolidaysPage;
