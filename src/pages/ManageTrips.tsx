import { useState } from "react";
import AdminCostEntry from "@/components/AdminCostEntry";
import DebtSettlement from "@/components/DebtSettlement";
import BottomNav from "@/components/BottomNav";
import { mockUserDebts } from "@/lib/mockData";
import { ClipboardList, Plus, Wallet } from "lucide-react";

type ManageTab = "trip" | "debts";

const ManageTrips = () => {
  const [tab, setTab] = useState<ManageTab>("trip");

  const tabs: { key: ManageTab; label: string; icon: typeof Plus }[] = [
    { key: "trip", label: "New Trip", icon: Plus },
    { key: "debts", label: "Settle Debts", icon: Wallet },
  ];

  return (
    <div className="min-h-screen pb-24">
      <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-lg items-center gap-2 px-4 py-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
            <ClipboardList className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">Manage Trips</h1>
            <p className="text-xs text-muted-foreground">Create trips & settle debts</p>
          </div>
        </div>
        <div className="mx-auto flex max-w-lg gap-0 px-4">
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

      <main className="mx-auto max-w-lg space-y-4 p-4">
        {tab === "trip" && <AdminCostEntry />}
        {tab === "debts" && <DebtSettlement userDebts={mockUserDebts} />}
      </main>

      <BottomNav />
    </div>
  );
};

export default ManageTrips;
