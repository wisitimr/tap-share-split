import { useState } from "react";
import BottomNav from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import {
  mockAllUsers,
  mockCars,
  formatBaht,
  type UserRole,
} from "@/lib/mockData";
import {
  Users,
  Car,
  CalendarOff,
  QrCode,
  Shield,
  ShieldCheck,
  Clock,
  Trash2,
  Plus,
  Download,
} from "lucide-react";

type AdminTab = "users" | "cars" | "dates" | "qr";

const roleBadge: Record<UserRole, { label: string; className: string }> = {
  PENDING: { label: "Pending", className: "bg-warning/10 text-warning" },
  USER: { label: "User", className: "bg-success/10 text-success" },
  ADMIN: { label: "Admin", className: "bg-debt/10 text-debt" },
};

const Admin = () => {
  const [tab, setTab] = useState<AdminTab>("users");

  const tabs: { key: AdminTab; label: string; icon: typeof Users }[] = [
    { key: "users", label: "Users", icon: Users },
    { key: "cars", label: "Cars", icon: Car },
    { key: "dates", label: "Dates", icon: CalendarOff },
    { key: "qr", label: "QR", icon: QrCode },
  ];

  return (
    <div className="min-h-screen pb-24">
      <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur-md">
        <div className="mx-auto max-w-lg px-4 pt-3">
          <h1 className="text-lg font-bold text-foreground">Admin Panel</h1>
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

      <main className="mx-auto max-w-lg p-4">
        {tab === "users" && <UsersTab />}
        {tab === "cars" && <CarsTab />}
        {tab === "dates" && <DatesTab />}
        {tab === "qr" && <QRTab />}
      </main>

      <BottomNav />
    </div>
  );
};

const UsersTab = () => {
  const pending = mockAllUsers.filter((u) => u.role === "PENDING");
  const others = mockAllUsers.filter((u) => u.role !== "PENDING");

  return (
    <div className="space-y-4">
      {pending.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-warning">
            Pending Approval ({pending.length})
          </h3>
          {pending.map((user) => (
            <div key={user.id} className="flex items-center gap-3 rounded-xl border-2 border-warning/30 bg-warning/5 p-3 animate-fade-in">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-warning/20 text-sm font-bold text-warning">
                {user.name[0]}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-foreground">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
              <Button size="sm" variant="success">
                <ShieldCheck className="h-4 w-4" /> Approve
              </Button>
            </div>
          ))}
        </div>
      )}

      <div className="space-y-2">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          All Users ({others.length})
        </h3>
        {others.map((user) => {
          const badge = roleBadge[user.role];
          return (
            <div key={user.id} className="flex items-center gap-3 rounded-xl border border-border bg-card p-3 animate-fade-in">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                {user.name[0]}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-foreground">{user.name}</p>
                  <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${badge.className}`}>
                    {badge.label}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const CarsTab = () => (
  <div className="space-y-3">
    <Button size="touch" className="w-full">
      <Plus className="h-4 w-4" /> Add New Car
    </Button>
    {mockCars.map((car) => (
      <div key={car.id} className="rounded-xl border border-border bg-card p-4 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-foreground">{car.name}</p>
            <p className="text-sm text-muted-foreground">{car.licensePlate}</p>
          </div>
          <button className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-debt/10 hover:text-debt">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-2 flex items-center gap-2 rounded-lg bg-accent/50 px-2.5 py-1.5 text-xs text-muted-foreground">
          <span>Default gas cost:</span>
          <span className="font-bold text-foreground">{formatBaht(car.defaultGasCost)}</span>
        </div>
      </div>
    ))}
  </div>
);

const DatesTab = () => {
  const disabledDates = [
    { date: "2026-03-15", reason: "Public Holiday - Makha Bucha" },
    { date: "2026-04-13", reason: "Songkran Festival" },
  ];

  return (
    <div className="space-y-3">
      <Button size="touch" className="w-full">
        <Plus className="h-4 w-4" /> Add Disabled Date
      </Button>
      {disabledDates.map((d) => (
        <div key={d.date} className="flex items-center gap-3 rounded-xl border border-border bg-card p-3 animate-fade-in">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-debt/10">
            <CalendarOff className="h-5 w-5 text-debt" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground">{d.date}</p>
            <p className="text-xs text-muted-foreground">{d.reason}</p>
          </div>
          <button className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-debt/10 hover:text-debt">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
};

const QRTab = () => (
  <div className="space-y-4">
    {mockCars.map((car) => (
      <div key={car.id} className="rounded-2xl border border-border bg-card p-5 text-center animate-fade-in">
        <p className="font-semibold text-foreground">{car.name}</p>
        <p className="text-sm text-muted-foreground">{car.licensePlate}</p>
        <div className="mx-auto my-4 flex h-48 w-48 items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted">
          <QrCode className="h-24 w-24 text-muted-foreground/50" />
        </div>
        <p className="mb-3 text-xs text-muted-foreground break-all">
          https://rodbus.app/tap/{car.id}
        </p>
        <Button variant="outline" size="touch" className="w-full">
          <Download className="h-4 w-4" /> Download QR Code
        </Button>
      </div>
    ))}
  </div>
);

export default Admin;
