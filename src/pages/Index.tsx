import { useState } from "react";
import { TrendingDown, AlertCircle, ChevronDown, ChevronUp, ArrowLeftRight, Wallet, Receipt } from "lucide-react";
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
  const settledDebts = mockDebts.filter((d) => d.status === "settled");
  const totalDebt = pendingDebts.reduce((sum, d) => sum + d.perPersonTotal, 0);
  const displayedDebts = showAllDebts ? pendingDebts : pendingDebts.slice(0, 5);

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-gradient-to-b from-primary to-primary/90 text-primary-foreground">
        <div className="mx-auto max-w-lg px-4 pt-4 pb-5">
          {/* Top bar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-primary-foreground/20 text-sm font-bold ring-2 ring-primary-foreground/30">
                {mockCurrentUser.image ? (
                  <img src={mockCurrentUser.image} alt={mockCurrentUser.name} className="h-full w-full object-cover" />
                ) : (
                  <span className="text-primary-foreground">{mockCurrentUser.name[0]}</span>
                )}
              </div>
              <div>
                <h1 className="text-lg font-bold">RodBus</h1>
                <p className="text-xs text-primary-foreground/70">
                  สวัสดี, {mockCurrentUser.name}
                </p>
              </div>
            </div>
            <button
              onClick={toggleRole}
              className="flex items-center gap-1.5 rounded-lg bg-primary-foreground/15 px-2.5 py-1.5 text-xs font-medium text-primary-foreground/90 backdrop-blur-sm transition-colors hover:bg-primary-foreground/25"
            >
              <ArrowLeftRight className="h-3.5 w-3.5" />
              {role}
            </button>
          </div>

          {/* Debt hero */}
          <div className="mt-4 rounded-2xl bg-primary-foreground/10 p-4 backdrop-blur-sm">
            <p className="text-xs font-medium text-primary-foreground/70">Your Pending Debt</p>
            <div className="mt-1 flex items-end justify-between">
              <p className="text-3xl font-black tracking-tight">
                {formatBaht(totalDebt)}
              </p>
              <div className="flex items-center gap-1.5 rounded-full bg-primary-foreground/10 px-2.5 py-1 text-xs font-medium text-primary-foreground/80">
                <TrendingDown className="h-3.5 w-3.5" />
                {pendingDebts.length} pending
              </div>
            </div>
          </div>

          {/* Quick stats */}
          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2 rounded-xl bg-primary-foreground/10 px-3 py-2">
              <Wallet className="h-4 w-4 text-primary-foreground/60" />
              <div>
                <p className="text-xs text-primary-foreground/60">Settled</p>
                <p className="text-sm font-bold">{settledDebts.length} trips</p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-primary-foreground/10 px-3 py-2">
              <Receipt className="h-4 w-4 text-primary-foreground/60" />
              <div>
                <p className="text-xs text-primary-foreground/60">This month</p>
                <p className="text-sm font-bold">{mockTrips.length} trips</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-lg space-y-4 p-4">
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
