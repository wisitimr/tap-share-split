import { useState } from "react";
import { TrendingDown, AlertCircle, ChevronDown, ChevronUp, Bus } from "lucide-react";
import BreakdownCard from "@/components/BreakdownCard";
import RecentTrips from "@/components/RecentTrips";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
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
  const [debtOpen, setDebtOpen] = useState(true);
  const [tripsOpen, setTripsOpen] = useState(true);

  const pendingDebts = mockDebts.filter((d) => d.status === "pending");
  const settledDebts = mockDebts.filter((d) => d.status === "settled");
  const totalDebt = pendingDebts.reduce((sum, d) => sum + d.perPersonTotal, 0);
  const grandTotal = pendingDebts.reduce((sum, d) => sum + d.gasCost + d.parkingCost, 0);
  const displayedDebts = pendingDebts.slice(0, visibleCount);
  const hasMore = visibleCount < pendingDebts.length;

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-lg items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
              <Bus className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">RodBus</h1>
              <p className="text-xs text-muted-foreground">Welcome, {mockCurrentUser.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleRole}
              className="rounded-lg border border-border bg-muted px-2 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent"
            >
              {role}
            </button>
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-primary/10 text-sm font-bold text-primary ring-2 ring-primary/20">
              {mockCurrentUser.image ? (
                <img src={mockCurrentUser.image} alt={mockCurrentUser.name} className="h-full w-full object-cover" />
              ) : (
                mockCurrentUser.name[0]
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-lg space-y-4 p-4">
        {/* Total Debt Card */}
        <div className="animate-scale-in rounded-2xl border border-debt/20 bg-card p-5 shadow-lg shadow-debt/5">
          <div className="flex items-start justify-between">
            <div>
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
        <Collapsible open={debtOpen} onOpenChange={setDebtOpen}>
          <CollapsibleTrigger className="flex w-full items-center justify-between py-1">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Debt Breakdown
            </h3>
            {debtOpen ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2 pt-2">
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
          </CollapsibleContent>
        </Collapsible>

        {/* Recent Trips */}
        <Collapsible open={tripsOpen} onOpenChange={setTripsOpen}>
          <CollapsibleTrigger className="flex w-full items-center justify-between py-1">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Recent Trips
            </h3>
            {tripsOpen ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-2">
            <RecentTrips trips={mockTrips} />
          </CollapsibleContent>
        </Collapsible>

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
