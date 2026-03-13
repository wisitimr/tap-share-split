import { useState } from "react";
import { TrendingDown, AlertCircle, ChevronDown, ChevronUp, ArrowLeftRight } from "lucide-react";
import BreakdownCard from "@/components/BreakdownCard";
import RecentTrips from "@/components/RecentTrips";
import BottomNav from "@/components/BottomNav";
import { useRole } from "@/context/RoleContext";
import {
  mockDebts,
  mockTrips,
  mockCurrentUser,
  formatBaht,
} from "@/lib/mockData";

const Dashboard = () => {
  const { role, toggleRole } = useRole();
  const isAdmin = role === "ADMIN";
  const [showAllDebts, setShowAllDebts] = useState(false);

  const pendingDebts = mockDebts.filter((d) => d.status === "pending");
  const totalDebt = pendingDebts.reduce((sum, d) => sum + d.perPersonTotal, 0);
  const displayedDebts = showAllDebts ? pendingDebts : pendingDebts.slice(0, 5);

  return (
    <div className="min-h-screen pb-24">
      {/* Header with integrated debt summary */}
      <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur-md">
        <div className="mx-auto max-w-lg px-4 pt-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-primary/10 text-sm font-bold text-primary">
                {mockCurrentUser.image ? (
                  <img src={mockCurrentUser.image} alt={mockCurrentUser.name} className="h-full w-full object-cover" />
                ) : (
                  mockCurrentUser.name[0]
                )}
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">RodBus</h1>
                <p className="text-xs text-muted-foreground">
                  สวัสดี, {mockCurrentUser.name}
                </p>
              </div>
            </div>
            <button
              onClick={toggleRole}
              className="flex items-center gap-1.5 rounded-lg border border-border bg-muted px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent"
            >
              <ArrowLeftRight className="h-3.5 w-3.5" />
              {role}
            </button>
          </div>

          {/* Debt summary inline */}
          <div className="mt-3 flex items-center justify-between rounded-xl bg-debt/5 px-4 py-3 mb-3">
            <div>
              <p className="text-xs font-medium text-muted-foreground">Your Pending Debt</p>
              <p className="text-2xl font-black tracking-tight text-debt">
                {formatBaht(totalDebt)}
              </p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-debt/10">
                <TrendingDown className="h-5 w-5 text-debt" />
              </div>
              <p className="text-xs text-muted-foreground">
                {pendingDebts.length} pending
              </p>
            </div>
          </div>
        </div>
      </header>

        {/* Debt Breakdown */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Debt Breakdown
          </h3>
          {displayedDebts.map((entry) => (
            <BreakdownCard key={entry.id} entry={entry} />
          ))}
          {pendingDebts.length > 5 && (
            <button
              onClick={() => setShowAllDebts(!showAllDebts)}
              className="flex w-full items-center justify-center gap-1 rounded-xl border border-border bg-card py-2.5 text-sm font-medium text-primary transition-colors hover:bg-accent"
            >
              {showAllDebts ? (
                <>Show Less <ChevronUp className="h-4 w-4" /></>
              ) : (
                <>Load More ({pendingDebts.length - 5} more) <ChevronDown className="h-4 w-4" /></>
              )}
            </button>
          )}
        </div>

        {/* Recent Trips */}
        <RecentTrips trips={mockTrips} />


        {/* Zero debt state */}
        {pendingDebts.length === 0 && (
          <div className="animate-scale-in rounded-2xl border border-settled/20 bg-card p-6 text-center">
            <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-settled/10">
              <AlertCircle className="h-8 w-8 text-settled" />
            </div>
            <p className="font-semibold text-settled">No Pending Debts!</p>
            <p className="mt-1 text-sm text-muted-foreground">You're all settled up 🎉</p>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default Dashboard;
