import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Client, Tag, Transaction } from "@/types/client";

interface AddClientDialogProps {
  tags: Tag[];
  onAddClient: (client: Omit<Client, "id" | "createdAt">) => void;
}

export function AddClientDialog({ tags, onAddClient }: AddClientDialogProps) {
  const [emails, setEmails] = useState<string[]>([""]);
  const [phoneNumbers, setPhoneNumbers] = useState<string[]>([""]);
  const [familyMembers, setFamilyMembers] = useState<string[]>([""]);
  const [anniversaries, setAnniversaries] = useState<string[]>([""]);
  const [openTransactions, setOpenTransactions] = useState<
    Omit<Transaction, "id">[]
  >([]);
  const [closedTransactions, setClosedTransactions] = useState<
    Omit<Transaction, "id">[]
  >([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    onAddClient({
      name: formData.get("name") as string,
      emails: emails.filter((email) => email !== ""),
      phoneNumbers: phoneNumbers.filter((phone) => phone !== ""),
      notes: formData.get("notes") as string,
      familyMembers: familyMembers.filter((member) => member !== ""),
      anniversaries: anniversaries.filter((anniversary) => anniversary !== ""),
      closedTransactions: closedTransactions.map((t) => ({
        ...t,
        id: Math.random().toString(36).substr(2, 9),
      })),
      openTransactions: openTransactions.map((t) => ({
        ...t,
        id: Math.random().toString(36).substr(2, 9),
      })),
      tags: [formData.get("tag") as string],
      status: "active",
    });

    const form = e.currentTarget;
    form.reset();
    setEmails([""]);
    setPhoneNumbers([""]);
    setFamilyMembers([""]);
    setAnniversaries([""]);
    setOpenTransactions([]);
    setClosedTransactions([]);
  };

  const handleArrayChange = (
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    index: number,
    value: string
  ) => {
    setter((prev) => {
      const newArray = [...prev];
      newArray[index] = value;
      return newArray;
    });
  };

  const handleAddField = (
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setter((prev) => [...prev, ""]);
  };

  const handleRemoveField = (
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    index: number
  ) => {
    setter((prev) => prev.filter((_, i) => i !== index));
  };

  const handleTransactionChange = (
    setter: React.Dispatch<React.SetStateAction<Omit<Transaction, "id">[]>>,
    index: number,
    field: keyof Omit<Transaction, "id">,
    value: string | number
  ) => {
    setter((prev) => {
      const newTransactions = [...prev];
      newTransactions[index] = { ...newTransactions[index], [field]: value };
      return newTransactions;
    });
  };

  const handleAddTransaction = (
    setter: React.Dispatch<React.SetStateAction<Omit<Transaction, "id">[]>>
  ) => {
    setter((prev) => [
      ...prev,
      { title: "", date: "", amount: 0, status: "open" },
    ]);
  };

  const handleRemoveTransaction = (
    setter: React.Dispatch<React.SetStateAction<Omit<Transaction, "id">[]>>,
    index: number
  ) => {
    setter((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4" />
          Add Client
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Client</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" required />
          </div>
          <div className="space-y-2">
            <Label>Emails</Label>
            {emails.map((email, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={email}
                  onChange={(e) =>
                    handleArrayChange(setEmails, index, e.target.value)
                  }
                  type="email"
                />
                {index === emails.length - 1 ? (
                  <Button
                    type="button"
                    onClick={() => handleAddField(setEmails)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={() => handleRemoveField(setEmails, index)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
          <div className="space-y-2">
            <Label>Phone Numbers</Label>
            {phoneNumbers.map((phone, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={phone}
                  onChange={(e) =>
                    handleArrayChange(setPhoneNumbers, index, e.target.value)
                  }
                  type="tel"
                />
                {index === phoneNumbers.length - 1 ? (
                  <Button
                    type="button"
                    onClick={() => handleAddField(setPhoneNumbers)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={() => handleRemoveField(setPhoneNumbers, index)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea id="notes" name="notes" />
          </div>
          <div className="space-y-2">
            <Label>Family Members</Label>
            {familyMembers.map((member, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={member}
                  onChange={(e) =>
                    handleArrayChange(setFamilyMembers, index, e.target.value)
                  }
                />
                {index === familyMembers.length - 1 ? (
                  <Button
                    type="button"
                    onClick={() => handleAddField(setFamilyMembers)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={() => handleRemoveField(setFamilyMembers, index)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
          <div className="space-y-2">
            <Label>Anniversaries</Label>
            {anniversaries.map((anniversary, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={anniversary}
                  onChange={(e) =>
                    handleArrayChange(setAnniversaries, index, e.target.value)
                  }
                  type="date"
                />
                {index === anniversaries.length - 1 ? (
                  <Button
                    type="button"
                    onClick={() => handleAddField(setAnniversaries)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={() => handleRemoveField(setAnniversaries, index)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
          <div className="space-y-2">
            <Label>Open Transactions</Label>
            {openTransactions.map((transaction, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={transaction.title}
                  onChange={(e) =>
                    handleTransactionChange(
                      setOpenTransactions,
                      index,
                      "title",
                      e.target.value
                    )
                  }
                  placeholder="Title"
                />
                <Input
                  value={transaction.date}
                  onChange={(e) =>
                    handleTransactionChange(
                      setOpenTransactions,
                      index,
                      "date",
                      e.target.value
                    )
                  }
                  type="date"
                />
                <Input
                  value={transaction.amount}
                  onChange={(e) =>
                    handleTransactionChange(
                      setOpenTransactions,
                      index,
                      "amount",
                      parseFloat(e.target.value)
                    )
                  }
                  type="number"
                  placeholder="Amount"
                />
                {index === openTransactions.length - 1 ? (
                  <Button
                    type="button"
                    onClick={() => handleAddTransaction(setOpenTransactions)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={() =>
                      handleRemoveTransaction(setOpenTransactions, index)
                    }
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
          <div className="space-y-2">
            <Label>Closed Transactions</Label>
            {closedTransactions.map((transaction, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={transaction.title}
                  onChange={(e) =>
                    handleTransactionChange(
                      setClosedTransactions,
                      index,
                      "title",
                      e.target.value
                    )
                  }
                  placeholder="Title"
                />
                <Input
                  value={transaction.date}
                  onChange={(e) =>
                    handleTransactionChange(
                      setClosedTransactions,
                      index,
                      "date",
                      e.target.value
                    )
                  }
                  type="date"
                />
                <Input
                  value={transaction.amount}
                  onChange={(e) =>
                    handleTransactionChange(
                      setClosedTransactions,
                      index,
                      "amount",
                      parseFloat(e.target.value)
                    )
                  }
                  type="number"
                  placeholder="Amount"
                />
                {index === closedTransactions.length - 1 ? (
                  <Button
                    type="button"
                    onClick={() => handleAddTransaction(setClosedTransactions)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={() =>
                      handleRemoveTransaction(setClosedTransactions, index)
                    }
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
          <div className="space-y-2">
            <Label htmlFor="tag">Tag</Label>
            <Select name="tag">
              <SelectTrigger>
                <SelectValue placeholder="Select a tag" />
              </SelectTrigger>
              <SelectContent>
                {tags.map((tag) => (
                  <SelectItem key={tag.id} value={tag.id}>
                    {tag.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full">
            Add Client
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
