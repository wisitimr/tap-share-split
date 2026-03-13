import { useState } from "react";
import { TrendingDown, AlertCircle, ChevronDown, ChevronUp, Bus } from "lucide-react";
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
  const [visibleCount, setVisibleCount] = useState(5);

  const pendingDebts = mockDebts.filter((d) => d.status === "pending");
  const settledDebts = mockDebts.filter((d) => d.status === "settled");
  const totalDebt = pendingDebts.reduce((sum, d) => sum + d.perPersonTotal, 0);
  const grandTotal = pendingDebts.reduce((sum, d) => sum + d.gasCost + d.parkingCost, 0);
  const displayedDebts = pendingDebts.slice(0, visibleCount);
  const hasMore = visibleCount < pendingDebts.length;

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-gradient-to-b from-[hsl(220,20%,14%)] to-[hsl(220,18%,18%)] text-white">
        <div className="mx-auto max-w-lg px-4 pt-4 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bus className="h-6 w-6" />
              <h1 className="text-lg font-bold">RodBus</h1>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-white/15 text-sm font-bold ring-2 ring-white/20">
                {mockCurrentUser.image ? (
                  <img src={mockCurrentUser.image} alt={mockCurrentUser.name} className="h-full w-full object-cover" />
                ) : (
                  <span className="text-white">{mockCurrentUser.name[0]}</span>
                )}
              </div>
              <button
                onClick={toggleRole}
                className="rounded-md bg-white/10 px-2 py-0.5 text-[10px] font-medium text-white/70 transition-colors hover:bg-white/20"
              >
                {role}
              </button>
            </div>
          </div>
          <p className="mt-2 text-sm text-white/60">Welcome, {mockCurrentUser.name}</p>
        </div>
      </header>

      <main className="mx-auto max-w-lg space-y-4 p-4">
        {/* Total Debt Card */}
        <div className="animate-scale-in rounded-2xl border border-debt/20 bg-card p-5 shadow-lg shadow-debt/5">
          <div className="flex items-start justify-between">
            <div>
              {isAdmin && (
                <div className="mb-2">
                  <p className="text-xs font-medium text-muted-foreground">Grand Total</p>
                  <p className="text-2xl font-black tracking-tight text-foreground">
                    {formatBaht(grandTotal)}
                  </p>
                </div>
              )}
              <p className="text-sm font-medium text-muted-foreground">Your Pending Debt</p>
              <p className="mt-1 text-4xl font-black tracking-tight text-debt">
                {formatBaht(totalDebt)}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {pendingDebts.length} pending {pendingDebts.length === 1 ? "item" : "items"}
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-debt/10">
              <TrendingDown className="h-6 w-6 text-debt" />
            </div>
          </div>
        </div>
        {/* Debt Breakdown */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Debt Breakdown
          </h3>
          {displayedDebts.map((entry) => (
            <BreakdownCard key={entry.id} entry={entry} />
          ))}
          {hasMore && (
            <button
              onClick={() => setVisibleCount((c) => c + 5)}
              className="flex w-full items-center justify-center gap-1 rounded-xl border border-border bg-card py-2.5 text-sm font-medium text-primary transition-colors hover:bg-accent"
            >
              Load More <ChevronDown className="h-4 w-4" />
            </button>
          )}
          {visibleCount > 5 && (
            <button
              onClick={() => setVisibleCount(5)}
              className="flex w-full items-center justify-center gap-1 rounded-xl border border-border bg-card py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent"
            >
              Show Less <ChevronUp className="h-4 w-4" />
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
