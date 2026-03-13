import { useState } from "react";
import { CheckCircle2, AlertTriangle, XCircle, ShieldOff, UserX, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

type TapState = "confirm" | "success" | "duplicate" | "no-trip" | "disabled" | "owner-tap";

const tapStates = {
  success: {
    icon: CheckCircle2,
    title: "Check-in Successful!",
    subtitle: "Trip #3 recorded",
    color: "text-success",
    bgColor: "bg-success/10",
    borderColor: "border-success/30",
  },
  duplicate: {
    icon: AlertTriangle,
    title: "Already Recorded",
    subtitle: "You already checked in today. Please wait 2 hours.",
    color: "text-warning",
    bgColor: "bg-warning/10",
    borderColor: "border-warning/30",
  },
  "no-trip": {
    icon: XCircle,
    title: "No Trip Available",
    subtitle: "No trip costs recorded for today yet.",
    color: "text-muted-foreground",
    bgColor: "bg-muted",
    borderColor: "border-border",
  },
  disabled: {
    icon: ShieldOff,
    title: "Service Unavailable",
    subtitle: "Service not available today: Public Holiday",
    color: "text-debt",
    bgColor: "bg-debt/10",
    borderColor: "border-debt/30",
  },
  "owner-tap": {
    icon: UserX,
    title: "Owner Self-Tap",
    subtitle: "Car owner does not need to tap.",
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/30",
  },
};

const TapPage = () => {
  const [state, setState] = useState<TapState>("confirm");
  const navigate = useNavigate();

  if (state === "confirm") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-6 pb-24">
        <div className="w-full max-w-sm animate-scale-in text-center">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
            <Smartphone className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Tap to Check In</h1>
          <p className="mt-2 text-muted-foreground">Toyota HiAce (กก-1234)</p>
          <p className="text-sm text-muted-foreground">Mar 13, 2569</p>

          <div className="mt-8 space-y-3">
            <Button size="touch" className="w-full" onClick={() => setState("success")}>
              Confirm Check-In
            </Button>
            <Button size="touch" variant="outline" className="w-full" onClick={() => navigate("/")}>
              Cancel
            </Button>
          </div>

          <div className="mt-6 border-t border-border pt-4">
            <p className="mb-2 text-xs font-medium text-muted-foreground">Preview other states:</p>
            <div className="flex flex-wrap justify-center gap-1.5">
              {(Object.keys(tapStates) as TapState[]).map((s) => (
                <button
                  key={s}
                  onClick={() => setState(s as TapState)}
                  className="rounded-full bg-accent px-2.5 py-1 text-xs font-medium text-accent-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const config = tapStates[state as keyof typeof tapStates];
  const Icon = config.icon;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 pb-24">
      <div className="w-full max-w-sm animate-scale-in text-center">
        <div className={`mx-auto mb-6 flex h-28 w-28 items-center justify-center rounded-full ${config.bgColor} border-2 ${config.borderColor}`}>
          <Icon className={`h-14 w-14 ${config.color}`} />
        </div>
        <h1 className={`text-2xl font-bold ${config.color}`}>{config.title}</h1>
        <p className="mt-2 text-muted-foreground">{config.subtitle}</p>

        <Button
          size="touch"
          variant="outline"
          className="mt-8 w-full"
          onClick={() => navigate("/")}
        >
          Back to Dashboard
        </Button>

        <div className="mt-6 border-t border-border pt-4">
          <p className="mb-2 text-xs font-medium text-muted-foreground">Preview other states:</p>
          <div className="flex flex-wrap justify-center gap-1.5">
            <button
              onClick={() => setState("confirm")}
              className="rounded-full bg-accent px-2.5 py-1 text-xs font-medium text-accent-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              confirm
            </button>
            {(Object.keys(tapStates) as TapState[]).map((s) => (
              <button
                key={s}
                onClick={() => setState(s as TapState)}
                className={`rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
                  state === s
                    ? "bg-primary text-primary-foreground"
                    : "bg-accent text-accent-foreground hover:bg-primary hover:text-primary-foreground"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TapPage;
