import { useState } from "react";
import { useRole } from "@/context/RoleContext";
import BottomNav from "@/components/BottomNav";
import BreakdownCard from "@/components/BreakdownCard";
import {
  mockDebts,
  mockTrips,
  mockPayments,
  mockCars,
  mockCurrentUser,
  mockAllUsers,
  formatBaht,
  formatDateBE,
  formatTimeBE,
} from "@/lib/mockData";
import { Bus, Clock, CreditCard, BarChart3, ChevronDown, ChevronUp } from "lucide-react";

type Tab = "trips" | "payments" | "summary";
type ViewMode = "all" | "mine";

const History = () => {
  const [tab, setTab] = useState<Tab>("trips");
  const { role } = useRole();
  const isAdmin = role === "ADMIN";
  const [viewMode, setViewMode] = useState<ViewMode>("all");

  const tabs: { key: Tab; label: string; icon: typeof Bus }[] = [
    { key: "trips", label: "Trips", icon: Bus },
    { key: "payments", label: "Payments", icon: CreditCard },
    { key: "summary", label: "Summary", icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen pb-24">
      <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-lg items-center gap-2 px-4 py-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
            <Clock className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">History</h1>
            <p className="text-xs text-muted-foreground">Trips, payments & summary</p>
          </div>
        </div>
        {isAdmin && (
          <div className="mx-auto flex max-w-lg px-4 pt-2">
            <div className="flex rounded-lg border border-border bg-muted/50 p-0.5">
              <button
                onClick={() => setViewMode("all")}
                className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                  viewMode === "all"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setViewMode("mine")}
                className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                  viewMode === "mine"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                My Data
              </button>
            </div>
          </div>
        )}
        <div className="mx-auto flex max-w-lg gap-0 px-4 pt-2">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex flex-1 items-center justify-center gap-1.5 border-b-2 pb-2.5 pt-1 text-sm font-medium transition-colors ${
                tab === t.key
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <t.icon className="h-4 w-4" />
              {t.label}
            </button>
          ))}
        </div>
      </header>

      <main className="mx-auto max-w-lg space-y-3 p-4">
        {tab === "trips" && <TripsTab viewMine={!isAdmin || viewMode === "mine"} />}
        {tab === "payments" && <PaymentsTab viewMine={!isAdmin || viewMode === "mine"} />}
        {tab === "summary" && <SummaryTab viewMine={!isAdmin || viewMode === "mine"} />}
      </main>

      <BottomNav />
    </div>
  );
};

const TripsTab = ({ viewMine }: { viewMine: boolean }) => {
  const { role } = useRole();
  const isAdmin = role === "ADMIN";
  
  const trips = viewMine ? mockTrips.filter(t => t.userId === mockCurrentUser.id) : mockTrips;
  
  const grouped = trips.reduce((acc, trip) => {
    if (!acc[trip.date]) acc[trip.date] = [];
    acc[trip.date].push(trip);
    return acc;
  }, {} as Record<string, typeof mockTrips>);

  const getUserName = (userId: string) => {
    const user = mockAllUsers.find(u => u.id === userId);
    return user?.name || "Unknown";
  };

  return (
    <div className="space-y-4">
      {Object.entries(grouped).map(([date, trips]) => (
        <div key={date}>
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {formatDateBE(date)}
          </h3>
          <div className="space-y-2">
            {trips.map((trip) => {
              const car = mockCars.find((c) => c.id === trip.carId);
              return (
                <div key={trip.id} className="flex items-center gap-3 rounded-xl border border-border bg-card p-3 animate-fade-in">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Bus className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground">{car?.name || "Unknown"}</p>
                    <p className="text-xs text-muted-foreground">
                      {car?.licensePlate}
                      {isAdmin && <span className="ml-1">· {getUserName(trip.userId)}</span>}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {formatTimeBE(trip.tappedAt)}
                    </div>
                    <p className="text-xs font-medium text-primary">Trip #{trip.tripNumber}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

const PaymentsTab = ({ viewMine }: { viewMine: boolean }) => {
  const payments = viewMine ? mockPayments.filter(p => p.userId === mockCurrentUser.id) : mockPayments;
  return (
  <div className="space-y-2">
    {payments.map((payment) => (
      <div key={payment.id} className="flex items-center gap-2.5 rounded-xl border border-border bg-card p-3 animate-fade-in">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-settled/10">
          <CreditCard className="h-4 w-4 text-settled" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-foreground truncate">{payment.userName}</p>
            <span className="text-sm font-bold text-settled">{formatBaht(payment.amount)}</span>
          </div>
          <p className="text-[11px] text-muted-foreground">{payment.carName} · Paid {formatDateBE(payment.date)}</p>
          {payment.note && (
            <p className="text-[11px] text-muted-foreground truncate">📝 {payment.note}</p>
          )}
        </div>
      </div>
    ))}
  </div>
  );
};

const SummaryTab = ({ viewMine }: { viewMine: boolean }) => {
  const [expanded, setExpanded] = useState<string | null>(null);
  const { role } = useRole();
  const isAdmin = role === "ADMIN" && !viewMine;

  const totalAll = mockDebts.reduce((sum, d) => sum + d.perPersonTotal, 0);
  const pendingTotal = mockDebts.filter(d => d.status === "pending").reduce((sum, d) => sum + d.perPersonTotal, 0);
  const settledTotal = mockDebts.filter(d => d.status === "settled").reduce((sum, d) => sum + d.perPersonTotal, 0);

  // Admin: total cost across all users (gas + parking before splitting)
  const totalGrossAll = mockDebts.reduce((sum, d) => sum + d.gasCost + d.parkingCost, 0);
  const pendingGrossAll = mockDebts.filter(d => d.status === "pending").reduce((sum, d) => sum + d.gasCost + d.parkingCost, 0);

  const months = [{ key: "2026-03", label: "March 2026", total: totalAll, pending: pendingTotal, settled: settledTotal, grossTotal: totalGrossAll, grossPending: pendingGrossAll }];

  return (
    <div className="space-y-3">
      {months.map((month) => (
        <div key={month.key} className="rounded-2xl border border-border bg-card p-4 shadow-sm">
          <button
            onClick={() => setExpanded(expanded === month.key ? null : month.key)}
            className="flex w-full items-center justify-between"
          >
            <div className="flex-1 text-left">
              <p className="font-semibold text-foreground">{month.label}</p>
              {isAdmin && (
                <p className="mt-1 text-xs text-muted-foreground">
                  Grand Total: <span className="font-bold text-foreground">{formatBaht(month.grossTotal)}</span>
                </p>
              )}
              <div className="mt-0.5 flex items-center gap-3 text-xs">
                <span className="text-debt">Pending: {formatBaht(month.pending)}</span>
                <span className="text-settled">Settled: {formatBaht(month.settled)}</span>
                <span className="ml-auto text-muted-foreground">Total: <span className="font-bold text-foreground">{formatBaht(month.total)}</span></span>
              </div>
            </div>
            {expanded === month.key ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            )}
          </button>

          {expanded === month.key && (
            <div className="mt-3 space-y-2 animate-fade-in">
              {mockDebts.map((entry) => (
                <BreakdownCard key={entry.id} entry={entry} />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default History;
