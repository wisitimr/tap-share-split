import { useState } from "react";
import { ChevronDown, ChevronUp, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import BreakdownCard from "@/components/BreakdownCard";
import { type UserDebt, formatBaht } from "@/lib/mockData";

interface DebtSettlementProps {
  userDebts: UserDebt[];
}

const DebtSettlement = ({ userDebts }: DebtSettlementProps) => {
  const [expandedUser, setExpandedUser] = useState<string | null>(null);
  const [confirmingUser, setConfirmingUser] = useState<string | null>(null);

  const sorted = [...userDebts].sort((a, b) => b.totalDebt - a.totalDebt);

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        Pending Debts by User
      </h3>
      <div className="space-y-2">
        {sorted.map((ud) => (
          <div key={ud.userId} className="rounded-2xl border border-border bg-card p-4 shadow-sm animate-fade-in">
            <button
              onClick={() => setExpandedUser(expandedUser === ud.userId ? null : ud.userId)}
              className="flex w-full items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-debt/10 text-sm font-bold text-debt">
                  {ud.userName[0]}
                </div>
                <div className="text-left">
                  <p className="font-semibold text-foreground">{ud.userName}</p>
                  <p className="text-xs text-muted-foreground">{ud.entries.length} pending items</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-debt">{formatBaht(ud.totalDebt)}</span>
                {expandedUser === ud.userId ? (
                  <ChevronUp className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
            </button>

            {expandedUser === ud.userId && (
              <div className="mt-3 space-y-2 animate-fade-in">
                {ud.entries.map(entry => (
                  <BreakdownCard key={entry.id} entry={entry} showStatus={false} />
                ))}

                {confirmingUser === ud.userId ? (
                  <div className="rounded-xl border-2 border-success bg-success/5 p-3 text-center">
                    <p className="mb-2 text-sm font-semibold text-foreground">
                      Confirm settlement of {formatBaht(ud.totalDebt)} for {ud.userName}?
                    </p>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => setConfirmingUser(null)}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="success"
                        size="sm"
                        className="flex-1"
                        onClick={() => setConfirmingUser(null)}
                      >
                        <CheckCircle2 className="h-4 w-4" /> Confirm
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button
                    variant="success"
                    size="touch"
                    className="w-full"
                    onClick={() => setConfirmingUser(ud.userId)}
                  >
                    <CheckCircle2 className="h-4 w-4" /> Mark as Settled
                  </Button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DebtSettlement;
