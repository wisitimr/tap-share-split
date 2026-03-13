import AdminCostEntry from "@/components/AdminCostEntry";
import DebtSettlement from "@/components/DebtSettlement";
import BottomNav from "@/components/BottomNav";
import { mockUserDebts } from "@/lib/mockData";
import { ClipboardList } from "lucide-react";

const ManageTrips = () => {
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
      </header>

      <main className="mx-auto max-w-lg space-y-4 p-4">
        <AdminCostEntry />
        <DebtSettlement userDebts={mockUserDebts} />
      </main>

      <BottomNav />
    </div>
  );
};

export default ManageTrips;
