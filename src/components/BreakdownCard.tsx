import { useState } from "react";
import { ChevronDown, ChevronUp, Users, Fuel, ParkingCircle } from "lucide-react";
import { type DebtEntry, formatBaht, formatDateBE } from "@/lib/mockData";

interface BreakdownCardProps {
  entry: DebtEntry;
  showStatus?: boolean;
}

const BreakdownCard = ({ entry, showStatus = true }: BreakdownCardProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="animate-fade-in rounded-2xl border border-border bg-card p-4 shadow-sm transition-shadow hover:shadow-md">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between gap-2 text-left"
      >
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">
              {formatDateBE(entry.date)}
            </span>
            {showStatus && (
              <span
                className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${
                  entry.status === "settled"
                    ? "bg-settled/10 text-settled"
                    : "bg-debt/10 text-debt"
                }`}
              >
                {entry.status === "settled" ? "Settled" : "Pending"}
              </span>
            )}
          </div>
          <p className="mt-0.5 font-semibold text-foreground">
            {entry.carName}{" "}
            <span className="text-sm font-normal text-muted-foreground">({entry.licensePlate})</span>
            {entry.tripNumber && (
              <span className="ml-1.5 text-xs font-medium text-primary">Trip #{entry.tripNumber}</span>
            )}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-lg font-bold ${entry.status === "settled" ? "text-settled" : "text-debt"}`}>
            {formatBaht(entry.perPersonTotal)}
          </span>
          {expanded ? (
            <ChevronUp className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          )}
        </div>
      </button>

      {expanded && (
        <div className="mt-3 animate-fade-in space-y-2 rounded-xl bg-accent/50 p-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            <span className="font-medium">{entry.headcount} people</span>
          </div>
          <div className="ml-6 space-y-0.5 text-xs text-muted-foreground">
            {entry.riders.map((r, i) => (
              <span key={i}>
                {r}{i < entry.riders.length - 1 ? ", " : ""}
              </span>
            ))}
          </div>

          <div className="mt-2 space-y-1.5 border-t border-border/50 pt-2">
            <div className="flex items-center gap-2 text-sm">
              <Fuel className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground">Gas</span>
              <span className="ml-auto font-mono text-foreground">
                {formatBaht(entry.gasCost)} / {entry.headcount} = <strong>{formatBaht(entry.perPersonGas)}</strong>
              </span>
            </div>
            {entry.parkingCost > 0 && (
              <div className="flex items-center gap-2 text-sm">
                <ParkingCircle className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">Parking</span>
                <span className="ml-auto font-mono text-foreground">
                  {formatBaht(entry.parkingCost)} / {entry.headcount} = <strong>{formatBaht(entry.perPersonParking)}</strong>
                </span>
              </div>
            )}
          </div>

          <div className="border-t border-border/50 pt-2">
            <div className="flex items-center justify-between text-sm font-bold">
              <span>Total</span>
              <span className="font-mono">
                {formatBaht(entry.gasCost + entry.parkingCost)} / {entry.headcount} = {formatBaht(entry.perPersonTotal)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BreakdownCard;
