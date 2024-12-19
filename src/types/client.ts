export interface Client {
  id: string;
  name: string;
  emails: string[];
  phoneNumbers: string[];
  notes: string;
  familyMembers: string[];
  anniversaries: string[];
  closedTransactions: Transaction[];
  openTransactions: Transaction[];
  tags: string[];
  status: "active" | "inactive";
  createdAt: string;
}

export interface Tag {
  id: string;
  name: string;
  color: string;
}

export interface Transaction {
  id: string;
  title: string;
  date: string;
  amount: number;
  status: "open" | "closed";
}

export interface Showing {
  id: string;
  title: string;
  address: string;
  date: string;
  time: string;
  clientId: string;
  lat: number;
  lng: number;
}

export interface ShowingGroup {
  id: string;
  date: string;
  showings: Showing[];
}
