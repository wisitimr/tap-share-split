import { createContext, useContext, useState, type ReactNode } from "react";
import type { UserRole } from "@/lib/mockData";

interface RoleContextType {
  role: UserRole;
  toggleRole: () => void;
}

const RoleContext = createContext<RoleContextType>({ role: "ADMIN", toggleRole: () => {} });

export const useRole = () => useContext(RoleContext);

export const RoleProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<UserRole>("ADMIN");
  const toggleRole = () => setRole((r) => (r === "ADMIN" ? "USER" : "ADMIN"));
  return (
    <RoleContext.Provider value={{ role, toggleRole }}>
      {children}
    </RoleContext.Provider>
  );
};
