// Mock data and types for the RodBus app

export type UserRole = "PENDING" | "USER" | "ADMIN";

export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: UserRole;
}

export interface Car {
  id: string;
  name: string;
  licensePlate: string;
  defaultGasCost: number;
  ownerId: string;
}

export interface TripCost {
  id: string;
  carId: string;
  date: string;
  gasCost: number;
  parkingCost: number;
  label?: string;
  headcount: number;
  riders: string[];
}

export interface Trip {
  id: string;
  userId: string;
  carId: string;
  date: string;
  tappedAt: string;
  tripNumber: number;
}

export interface DebtEntry {
  id: string;
  date: string;
  carName: string;
  licensePlate: string;
  gasCost: number;
  parkingCost: number;
  headcount: number;
  riders: string[];
  perPersonGas: number;
  perPersonParking: number;
  perPersonTotal: number;
  status: "pending" | "settled";
  tripNumber?: number;
}

export interface Payment {
  id: string;
  userId: string;
  userName: string;
  carName: string;
  amount: number;
  note: string;
  date: string;
}

export interface UserDebt {
  userId: string;
  userName: string;
  totalDebt: number;
  entries: DebtEntry[];
}

// Format Thai Baht
export const formatBaht = (amount: number): string => {
  return `฿${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

// Format date (CE)
export const formatDateBE = (dateStr: string): string => {
  const date = new Date(dateStr);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
};

export const formatTimeBE = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
};

// Mock data
export const mockCurrentUser: User = {
  id: "u4",
  name: "Sombat",
  email: "sombat@example.com",
  role: "ADMIN",
};

export const mockCars: Car[] = [
  { id: "c1", name: "Toyota HiAce", licensePlate: "กก-1234", defaultGasCost: 200, ownerId: "u4" },
  { id: "c2", name: "Nissan Urvan", licensePlate: "ขข-5678", defaultGasCost: 180, ownerId: "u4" },
];

export const mockDebts: DebtEntry[] = [
  {
    id: "d1", date: "2026-03-10", carName: "Toyota HiAce", licensePlate: "กก-1234",
    gasCost: 200, parkingCost: 100, headcount: 4,
    riders: ["Somchai", "Somying", "Somsri", "Sombat (Driver)"],
    perPersonGas: 50, perPersonParking: 25, perPersonTotal: 75, status: "pending", tripNumber: 1,
  },
  {
    id: "d2", date: "2026-03-11", carName: "Toyota HiAce", licensePlate: "กก-1234",
    gasCost: 150, parkingCost: 75, headcount: 3,
    riders: ["Somchai", "Somying", "Sombat (Driver)"],
    perPersonGas: 50, perPersonParking: 25, perPersonTotal: 75, status: "pending", tripNumber: 1,
  },
  {
    id: "d3", date: "2026-03-12", carName: "Nissan Urvan", licensePlate: "ขข-5678",
    gasCost: 180, parkingCost: 0, headcount: 4,
    riders: ["Somchai", "Noi", "Lek", "Sombat (Driver)"],
    perPersonGas: 45, perPersonParking: 0, perPersonTotal: 45, status: "pending", tripNumber: 1,
  },
  {
    id: "d4", date: "2026-03-13", carName: "Toyota HiAce", licensePlate: "กก-1234",
    gasCost: 200, parkingCost: 60, headcount: 5,
    riders: ["Somchai", "Somying", "Somsri", "Noi", "Sombat (Driver)"],
    perPersonGas: 40, perPersonParking: 12, perPersonTotal: 52, status: "pending", tripNumber: 1,
  },
  {
    id: "d4b", date: "2026-03-08", carName: "Nissan Urvan", licensePlate: "ขข-5678",
    gasCost: 180, parkingCost: 40, headcount: 3,
    riders: ["Somchai", "Lek", "Sombat (Driver)"],
    perPersonGas: 60, perPersonParking: 13.33, perPersonTotal: 73.33, status: "pending", tripNumber: 1,
  },
  {
    id: "d4c", date: "2026-03-06", carName: "Toyota HiAce", licensePlate: "กก-1234",
    gasCost: 200, parkingCost: 0, headcount: 4,
    riders: ["Somchai", "Somying", "Noi", "Sombat (Driver)"],
    perPersonGas: 50, perPersonParking: 0, perPersonTotal: 50, status: "pending", tripNumber: 2,
  },
  {
    id: "d4d", date: "2026-03-04", carName: "Nissan Urvan", licensePlate: "ขข-5678",
    gasCost: 180, parkingCost: 60, headcount: 5,
    riders: ["Somchai", "Somying", "Somsri", "Noi", "Sombat (Driver)"],
    perPersonGas: 36, perPersonParking: 12, perPersonTotal: 48, status: "pending",
  },
  {
    id: "d5", date: "2026-03-05", carName: "Toyota HiAce", licensePlate: "กก-1234",
    gasCost: 200, parkingCost: 50, headcount: 5,
    riders: ["Somchai", "Somying", "Somsri", "Noi", "Sombat (Driver)"],
    perPersonGas: 40, perPersonParking: 10, perPersonTotal: 50, status: "settled",
  },
  {
    id: "d6", date: "2026-03-03", carName: "Nissan Urvan", licensePlate: "ขข-5678",
    gasCost: 180, parkingCost: 40, headcount: 4,
    riders: ["Somchai", "Somying", "Lek", "Sombat (Driver)"],
    perPersonGas: 45, perPersonParking: 10, perPersonTotal: 55, status: "settled",
  },
  {
    id: "d7", date: "2026-03-07", carName: "Toyota HiAce", licensePlate: "กก-1234",
    gasCost: 200, parkingCost: 0, headcount: 3,
    riders: ["Somchai", "Somsri", "Sombat (Driver)"],
    perPersonGas: 66.67, perPersonParking: 0, perPersonTotal: 66.67, status: "settled",
  },
];

export const mockTrips: Trip[] = [
  { id: "t1", userId: "u1", carId: "c1", date: "2026-03-13", tappedAt: "2026-03-13T07:25:00", tripNumber: 1 },
  { id: "t1b", userId: "u1", carId: "c1", date: "2026-03-13", tappedAt: "2026-03-13T17:40:00", tripNumber: 2 },
  { id: "t2", userId: "u1", carId: "c1", date: "2026-03-12", tappedAt: "2026-03-12T07:32:00", tripNumber: 1 },
  { id: "t3", userId: "u1", carId: "c1", date: "2026-03-11", tappedAt: "2026-03-11T07:28:00", tripNumber: 1 },
  { id: "t3b", userId: "u1", carId: "c2", date: "2026-03-11", tappedAt: "2026-03-11T18:05:00", tripNumber: 2 },
  { id: "t4", userId: "u1", carId: "c1", date: "2026-03-10", tappedAt: "2026-03-10T07:35:00", tripNumber: 1 },
  { id: "t5", userId: "u1", carId: "c2", date: "2026-03-09", tappedAt: "2026-03-09T07:22:00", tripNumber: 1 },
  { id: "t6", userId: "u1", carId: "c1", date: "2026-03-07", tappedAt: "2026-03-07T07:30:00", tripNumber: 1 },
  { id: "t7", userId: "u1", carId: "c1", date: "2026-03-05", tappedAt: "2026-03-05T07:18:00", tripNumber: 1 },
  { id: "t8", userId: "u1", carId: "c2", date: "2026-03-03", tappedAt: "2026-03-03T07:40:00", tripNumber: 1 },
];

export const mockPayments: Payment[] = [
  { id: "p1", userId: "u1", userName: "Somchai", carName: "Toyota HiAce", amount: 100, note: "Cash payment", date: "2026-03-09" },
  { id: "p2", userId: "u2", userName: "Somying", carName: "Toyota HiAce", amount: 150, note: "Bank transfer", date: "2026-03-10" },
  { id: "p3", userId: "u3", userName: "Somsri", carName: "Toyota HiAce", amount: 66.67, note: "PromptPay", date: "2026-03-08" },
  { id: "p4", userId: "u1", userName: "Somchai", carName: "Nissan Urvan", amount: 55, note: "Cash", date: "2026-03-06" },
];

export const mockUserDebts: UserDebt[] = [
  { userId: "u1", userName: "Somchai", totalDebt: 247, entries: mockDebts.filter(d => d.status === "pending") },
  { userId: "u2", userName: "Somying", totalDebt: 202, entries: mockDebts.filter(d => d.status === "pending").slice(0, 3) },
  { userId: "u3", userName: "Somsri", totalDebt: 127, entries: mockDebts.filter(d => d.status === "pending").slice(0, 2) },
  { userId: "u5", userName: "Noi", totalDebt: 97, entries: mockDebts.filter(d => d.status === "pending").slice(2, 4) },
];

export const mockAllUsers: User[] = [
  { id: "u1", name: "Somchai", email: "somchai@example.com", role: "USER" },
  { id: "u2", name: "Somying", email: "somying@example.com", role: "USER" },
  { id: "u3", name: "Somsri", email: "somsri@example.com", role: "USER" },
  { id: "u4", name: "Sombat", email: "sombat@example.com", role: "ADMIN" },
  { id: "u5", name: "Noi", email: "noi@example.com", role: "PENDING" },
  { id: "u6", name: "Lek", email: "lek@example.com", role: "PENDING" },
];
