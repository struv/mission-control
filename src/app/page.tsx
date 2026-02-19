import Header from '@/components/Header';
import QuickStats from '@/components/QuickStats';
import OfficeView from '@/components/OfficeView';
import TasksBoard from '@/components/TasksBoard';
import CronCalendar from '@/components/CronCalendar';
import ActivityFeed from '@/components/ActivityFeed';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        {/* Quick Stats */}
        <QuickStats />

        {/* Two column layout */}
        <div className="grid grid-cols-3 gap-6">
          {/* Main content - 2 cols */}
          <div className="col-span-2 space-y-6">
            <TasksBoard />
            <CronCalendar />
          </div>

          {/* Sidebar - 1 col */}
          <div className="space-y-6">
            <OfficeView />
            <ActivityFeed />
          </div>
        </div>
      </main>
    </div>
  );
}
