import { NavLink, useLocation } from "react-router-dom";
import { Home, Clock, Settings } from "lucide-react";
import { mockCurrentUser } from "@/lib/mockData";

const BottomNav = () => {
  const location = useLocation();
  const isAdmin = mockCurrentUser.role === "ADMIN";

  const navItems = [
    { to: "/", icon: Home, label: "Dashboard" },
    { to: "/history", icon: Clock, label: "History" },
    ...(isAdmin ? [{ to: "/admin", icon: Settings, label: "Admin" }] : []),
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur-md safe-area-bottom">
      <div className="mx-auto flex max-w-lg items-center justify-around px-2 py-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={`flex min-h-[44px] min-w-[44px] flex-col items-center justify-center gap-0.5 rounded-xl px-3 py-1.5 text-xs font-medium transition-colors ${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <item.icon className={`h-5 w-5 ${isActive ? "stroke-[2.5]" : ""}`} />
              <span>{item.label}</span>
              {isActive && (
                <div className="mt-0.5 h-1 w-5 rounded-full bg-primary" />
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
