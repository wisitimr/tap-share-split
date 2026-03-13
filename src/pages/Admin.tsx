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
  QrCode,
  ShieldCheck,
  Trash2,
  Plus,
  Download,
  Fuel,
  Copy,
  Check,
  Pencil,
  UserRoundCog,
} from "lucide-react";

type AdminTab = "users" | "cars" | "qr";

const roleBadge: Record<UserRole, { label: string; className: string }> = {
  PENDING: { label: "Pending", className: "bg-warning/10 text-warning" },
  USER: { label: "User", className: "bg-settled/10 text-settled" },
  ADMIN: { label: "Admin", className: "bg-debt/10 text-debt" },
};

const Admin = () => {
  const [tab, setTab] = useState<AdminTab>("users");

  const tabs: { key: AdminTab; label: string; icon: typeof Users }[] = [
    { key: "users", label: "Users", icon: Users },
    { key: "cars", label: "Cars", icon: Car },
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
        {tab === "qr" && <QRTab />}
      </main>

      <BottomNav />
    </div>
  );
};

const UsersTab = () => {
  const [roleMenu, setRoleMenu] = useState<string | null>(null);
  const pending = mockAllUsers.filter((u) => u.role === "PENDING");
  const others = mockAllUsers.filter((u) => u.role !== "PENDING");
  const roleOptions: UserRole[] = ["USER", "ADMIN"];

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
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground truncate">{user.name}</p>
                <p className="text-xs text-muted-foreground truncate">{user.email}</p>
              </div>
              <div className="flex gap-1.5">
                <Button size="sm" variant="success">
                  <ShieldCheck className="h-4 w-4" /> Approve
                </Button>
                <button className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-debt/10 hover:text-debt">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
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
            <div key={user.id} className="relative flex items-center gap-3 rounded-xl border border-border bg-card p-3 animate-fade-in">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                {user.name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-foreground truncate">{user.name}</p>
                  <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${badge.className}`}>
                    {badge.label}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground truncate">{user.email}</p>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => setRoleMenu(roleMenu === user.id ? null : user.id)}
                  className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  title="Change role"
                >
                  <UserRoundCog className="h-4 w-4" />
                </button>
                <button className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-debt/10 hover:text-debt" title="Remove user">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              {roleMenu === user.id && (
                <div className="absolute right-12 top-12 z-10 rounded-xl border border-border bg-card p-1.5 shadow-lg animate-fade-in">
                  {roleOptions.map((role) => (
                    <button
                      key={role}
                      onClick={() => setRoleMenu(null)}
                      className={`block w-full rounded-lg px-3 py-1.5 text-left text-sm font-medium transition-colors hover:bg-accent ${
                        user.role === role ? "text-primary" : "text-foreground"
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const CarsTab = () => {
  const [editingGas, setEditingGas] = useState<string | null>(null);
  const [gasValue, setGasValue] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCarName, setNewCarName] = useState("");
  const [newCarPlate, setNewCarPlate] = useState("");
  const [newCarGas, setNewCarGas] = useState("200");

  const handleAddCar = () => {
    // Mock: just close form
    setShowAddForm(false);
    setNewCarName("");
    setNewCarPlate("");
    setNewCarGas("200");
  };

  return (
    <div className="space-y-3">
      {showAddForm ? (
        <div className="rounded-xl border-2 border-primary/30 bg-card p-4 space-y-3 animate-fade-in">
          <h3 className="text-sm font-semibold text-foreground">Add New Car</h3>
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">
              Car Name <span className="text-debt">*</span>
            </label>
            <input
              type="text"
              value={newCarName}
              onChange={(e) => setNewCarName(e.target.value)}
              placeholder="e.g. Toyota HiAce"
              className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm"
              autoFocus
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">
              License Plate <span className="text-xs font-normal text-muted-foreground/60">(optional)</span>
            </label>
            <input
              type="text"
              value={newCarPlate}
              onChange={(e) => setNewCarPlate(e.target.value)}
              placeholder="e.g. กก-1234"
              className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">
              Default Gas Cost (฿) <span className="text-debt">*</span>
            </label>
            <input
              type="number"
              value={newCarGas}
              onChange={(e) => setNewCarGas(e.target.value)}
              className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm"
            />
          </div>
          <div className="flex gap-2">
            <Button
              size="touch"
              className="flex-1"
              onClick={handleAddCar}
              disabled={!newCarName}
            >
              <Plus className="h-4 w-4" /> Add
            </Button>
            <Button size="touch" variant="outline" className="flex-1" onClick={() => setShowAddForm(false)}>
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <Button size="touch" className="w-full" onClick={() => setShowAddForm(true)}>
          <Plus className="h-4 w-4" /> Add New Car
        </Button>
      )}
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
          <div className="mt-2 flex items-center gap-2 rounded-lg bg-muted/40 px-2.5 py-2 text-xs text-muted-foreground">
            <Fuel className="h-3 w-3 shrink-0" />
            <span>Gas:</span>
            {editingGas === car.id ? (
              <div className="flex flex-1 items-center gap-1.5">
                <div className="relative">
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">฿</span>
                  <input
                    type="number"
                    value={gasValue}
                    onChange={(e) => setGasValue(e.target.value)}
                    className="w-20 rounded-lg border border-primary/30 bg-background py-1 pl-6 pr-2 text-xs font-bold text-foreground focus:outline-none focus:ring-1 focus:ring-primary/30"
                    autoFocus
                  />
                </div>
                <button
                  onClick={() => setEditingGas(null)}
                  className="rounded-md bg-primary px-2 py-1 text-xs font-semibold text-primary-foreground"
                >
                  <Check className="h-3 w-3" />
                </button>
                <button
                  onClick={() => setEditingGas(null)}
                  className="rounded-md px-1.5 py-1 text-xs text-muted-foreground hover:text-foreground"
                >
                  ✕
                </button>
              </div>
            ) : (
              <>
                <span className="font-bold text-foreground">{formatBaht(car.defaultGasCost)}</span>
                <button
                  onClick={() => { setEditingGas(car.id); setGasValue(car.defaultGasCost.toString()); }}
                  className="ml-auto rounded-md p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  <Pencil className="h-3 w-3" />
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

const QRTab = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (carId: string) => {
    const url = `https://rodbus.app/tap/${carId}`;
    await navigator.clipboard.writeText(url);
    setCopiedId(carId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-4">
      {mockCars.map((car) => (
        <div key={car.id} className="rounded-2xl border border-border bg-card p-5 text-center animate-fade-in">
          <p className="font-semibold text-foreground">{car.name}</p>
          <p className="text-sm text-muted-foreground">{car.licensePlate}</p>
          <div className="mx-auto my-4 flex h-48 w-48 items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted">
            <QrCode className="h-24 w-24 text-muted-foreground/50" />
          </div>
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-lg bg-muted px-3 py-2">
            <p className="text-xs text-muted-foreground select-all">
              https://rodbus.app/tap/{car.id}
            </p>
            <button
              onClick={() => handleCopy(car.id)}
              className="shrink-0 rounded-md p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              title="Copy link"
            >
              {copiedId === car.id ? (
                <Check className="h-3.5 w-3.5 text-settled" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
            </button>
          </div>
          <Button variant="outline" size="touch" className="w-full">
            <Download className="h-4 w-4" /> Download QR
          </Button>
        </div>
      ))}
    </div>
  );
};

export default Admin;
