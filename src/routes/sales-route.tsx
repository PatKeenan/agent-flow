import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./_root-route";
import { useState } from "react";
import { Plus } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PageHeader } from "@/components/PageHeader";

export const salesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/sales",
  component: SalesTracker,
});

type Transaction = {
  id: string;
  date: string;
  type: "sale" | "rental" | "purchase" | "referral";
  propertyAddress: string;
  clientName: string;
  transactionValue: number;
  commissionRate: number;
  commissionEarned: number;
  status: "pending" | "completed" | "cancelled";
};

function SalesTracker() {
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "1",
      date: "2024-03-15",
      type: "sale",
      propertyAddress: "123 Main St",
      clientName: "John Smith",
      transactionValue: 500000,
      commissionRate: 2.5,
      commissionEarned: 12500,
      status: "completed",
    },
    // Add more sample transactions as needed
  ]);

  const [isAddingTransaction, setIsAddingTransaction] = useState(false);

  const totalCommissions = transactions.reduce(
    (sum, t) => sum + (t.status === "completed" ? t.commissionEarned : 0),
    0
  );

  const pendingCommissions = transactions.reduce(
    (sum, t) => sum + (t.status === "pending" ? t.commissionEarned : 0),
    0
  );

  const stats = [
    {
      title: "Total Commissions",
      value: `$${totalCommissions.toLocaleString()}`,
      description: "Total earned commissions",
    },
    {
      title: "Pending Commissions",
      value: `$${pendingCommissions.toLocaleString()}`,
      description: "Commissions awaiting completion",
    },
    {
      title: "Total Transactions",
      value: transactions.length.toString(),
      description: "Number of transactions",
    },
  ];

  return (
    <div className="flex-1 overflow-auto bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <PageHeader title="Sales Tracker">
          <Dialog
            open={isAddingTransaction}
            onOpenChange={setIsAddingTransaction}
          >
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Transaction
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Transaction</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="type">Transaction Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sale">Sale</SelectItem>
                      <SelectItem value="rental">Rental</SelectItem>
                      <SelectItem value="purchase">Purchase</SelectItem>
                      <SelectItem value="referral">Referral</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="address">Property Address</Label>
                  <Input id="address" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="client">Client Name</Label>
                  <Input id="client" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="value">Transaction Value</Label>
                  <Input id="value" type="number" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="commission">Commission Rate (%)</Label>
                  <Input id="commission" type="number" step="0.1" />
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={() => setIsAddingTransaction(false)}
                >
                  Cancel
                </Button>
                <Button>Save Transaction</Button>
              </div>
            </DialogContent>
          </Dialog>
        </PageHeader>

        <div className="grid gap-4 md:grid-cols-3">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Transactions</CardTitle>
            <CardDescription>
              A list of all your real estate transactions and commissions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Property</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead className="text-right">Value</TableHead>
                  <TableHead className="text-right">Commission</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>
                      {new Date(transaction.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="capitalize">
                      {transaction.type}
                    </TableCell>
                    <TableCell>{transaction.propertyAddress}</TableCell>
                    <TableCell>{transaction.clientName}</TableCell>
                    <TableCell className="text-right">
                      ${transaction.transactionValue.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      ${transaction.commissionEarned.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <div
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                        ${
                          transaction.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : transaction.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {transaction.status}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
