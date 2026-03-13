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

const History = () => {
  const [tab, setTab] = useState<Tab>("trips");

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
        {tab === "trips" && <TripsTab />}
        {tab === "payments" && <PaymentsTab />}
        {tab === "summary" && <SummaryTab />}
      </main>

      <BottomNav />
    </div>
  );
};

const TripsTab = () => {
  const { role } = useRole();
  const isAdmin = role === "ADMIN";
  
  // Admin sees all trips, user sees only their own
  const trips = isAdmin ? mockTrips : mockTrips.filter(t => t.userId === mockCurrentUser.id);
  
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

const PaymentsTab = () => (
  <div className="space-y-2">
    {mockPayments.map((payment) => (
      <div key={payment.id} className="rounded-xl border border-border bg-card p-4 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-foreground">{payment.carName}</p>
            <p className="text-xs text-muted-foreground">
              Paid: {formatDateBE(payment.date)}
            </p>
          </div>
          <span className="text-lg font-bold text-settled">{formatBaht(payment.amount)}</span>
        </div>
        {payment.note && (
          <p className="mt-1 text-xs text-muted-foreground">📝 {payment.note}</p>
        )}
      </div>
    ))}
  </div>
);

const SummaryTab = () => {
  const [expanded, setExpanded] = useState<string | null>(null);

  const totalAll = mockDebts.reduce((sum, d) => sum + d.perPersonTotal, 0);
  const pendingTotal = mockDebts.filter(d => d.status === "pending").reduce((sum, d) => sum + d.perPersonTotal, 0);
  const settledTotal = mockDebts.filter(d => d.status === "settled").reduce((sum, d) => sum + d.perPersonTotal, 0);

  const months = [{ key: "2026-03", label: "March 2026", total: totalAll, pending: pendingTotal, settled: settledTotal }];

  return (
    <div className="space-y-3">
      {months.map((month) => (
        <div key={month.key} className="rounded-2xl border border-border bg-card p-4 shadow-sm">
          <button
            onClick={() => setExpanded(expanded === month.key ? null : month.key)}
            className="flex w-full items-center justify-between"
          >
            <div className="text-left">
              <p className="font-semibold text-foreground">{month.label}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Per person total: <span className="font-bold text-foreground">{formatBaht(month.total)}</span>
              </p>
              <div className="mt-0.5 flex gap-3 text-xs">
                <span className="text-debt">Pending: {formatBaht(month.pending)}</span>
                <span className="text-settled">Settled: {formatBaht(month.settled)}</span>
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
