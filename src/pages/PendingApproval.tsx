import { Clock, Loader2 } from "lucide-react";

const PendingApproval = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 pb-24">
      <div className="w-full max-w-sm animate-scale-in text-center">
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-warning/10 border-2 border-warning/30">
          <Clock className="h-12 w-12 text-warning" />
        </div>
        <h1 className="text-2xl font-bold text-foreground">Awaiting Approval</h1>
        <p className="mt-3 text-muted-foreground">
          Your account is pending admin approval. Once approved, you'll be able to check in and view your trips.
        </p>

        <div className="mt-8 rounded-2xl border border-border bg-card p-4 text-left">
          <h3 className="mb-3 text-sm font-semibold text-foreground">How it works:</h3>
          <ol className="space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">1</span>
              <span>You've signed up — that's done! ✓</span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-warning text-xs font-bold text-warning-foreground">2</span>
              <span>Wait for the driver/admin to approve your account</span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-bold text-muted-foreground">3</span>
              <span>Once approved, tap NFC or scan QR to check in</span>
            </li>
          </ol>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Checking status...</span>
        </div>
      </div>
    </div>
  );
};

export default PendingApproval;
