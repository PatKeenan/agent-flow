import { useState } from "react";
import { Download, ArrowUpDown, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { AddClientDialog } from "@/components/add-client-dialog";
import { TagManager } from "@/components/tag-manager";
import type { Client, Tag } from "@/types/client";
import { ContactDialog } from "./ContactDialog";

export function Clients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [sortField, setSortField] = useState<keyof Client>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [search, setSearch] = useState("");
  const [expandedClient, setExpandedClient] = useState<string | null>(null);

  const handleAddClient = (newClient: Omit<Client, "id" | "createdAt">) => {
    setClients([
      ...clients,
      {
        ...newClient,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString(),
      },
    ]);
  };

  const handleAddTag = (tag: Tag) => {
    setTags([...tags, tag]);
  };

  const handleSort = (field: keyof Client) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedClients = [...clients]
    .filter(
      (client) =>
        client.name.toLowerCase().includes(search.toLowerCase()) ||
        client.emails.some((email) =>
          email.toLowerCase().includes(search.toLowerCase())
        ) ||
        client.phoneNumbers.some((phone) => phone.includes(search))
    )
    .sort((a, b) => {
      if (sortDirection === "asc") {
        return a[sortField] > b[sortField] ? 1 : -1;
      }
      return a[sortField] < b[sortField] ? 1 : -1;
    });

  const exportClients = () => {
    const csv = [
      [
        "Name",
        "Emails",
        "Phone Numbers",
        "Notes",
        "Family Members",
        "Anniversaries",
        "Open Transactions",
        "Closed Transactions",
        "Tags",
        "Status",
        "Created At",
      ],
      ...clients.map((client) => [
        client.name,
        client.emails.join("; "),
        client.phoneNumbers.join("; "),
        client.notes,
        client.familyMembers.join("; "),
        client.anniversaries.join("; "),
        client.openTransactions
          .map((t) => `${t.title} (${t.date}, $${t.amount})`)
          .join("; "),
        client.closedTransactions
          .map((t) => `${t.title} (${t.date}, $${t.amount})`)
          .join("; "),
        client.tags
          .map((tagId) => tags.find((t) => t.id === tagId)?.name)
          .join(", "),
        client.status,
        client.createdAt,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "clients.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const toggleExpandClient = (clientId: string) => {
    setExpandedClient(expandedClient === clientId ? null : clientId);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Clients</h1>
        <div className="flex gap-2">
          <TagManager tags={tags} onAddTag={handleAddTag} />
          {/* <AddClientDialog tags={tags} onAddClient={handleAddClient} /> */}
          <ContactDialog />
          <Button variant="outline" onClick={exportClients}>
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>
      <div className="mb-4">
        <Input
          placeholder="Search clients..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="border rounded-lg">
        <Table className="bg-white">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[30px]"></TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort("name")}>
                  Name
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>Emails</TableHead>
              <TableHead>Phone Numbers</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort("status")}>
                  Status
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort("createdAt")}>
                  Created At
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedClients.map((client) => (
              <>
                <TableRow key={client.id}>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleExpandClient(client.id)}
                    >
                      {expandedClient === client.id ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                  </TableCell>
                  <TableCell>{client.name}</TableCell>
                  <TableCell>{client.emails.join(", ")}</TableCell>
                  <TableCell>{client.phoneNumbers.join(", ")}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {client.tags.map((tagId) => {
                        const tag = tags.find((t) => t.id === tagId);
                        return tag ? (
                          <Badge
                            key={tag.id}
                            style={{ backgroundColor: tag.color }}
                          >
                            {tag.name}
                          </Badge>
                        ) : null;
                      })}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        client.status === "active" ? "default" : "secondary"
                      }
                    >
                      {client.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(client.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
                {expandedClient === client.id && (
                  <TableRow>
                    <TableCell colSpan={7}>
                      <div className="p-4 space-y-4">
                        <div>
                          <h3 className="font-semibold">Notes</h3>
                          <p>{client.notes}</p>
                        </div>
                        <div>
                          <h3 className="font-semibold">Family Members</h3>
                          <ul>
                            {client.familyMembers.map((member, index) => (
                              <li key={index}>{member}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h3 className="font-semibold">Anniversaries</h3>
                          <ul>
                            {client.anniversaries.map((anniversary, index) => (
                              <li key={index}>
                                {new Date(anniversary).toLocaleDateString()}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h3 className="font-semibold">Open Transactions</h3>
                          <ul>
                            {client.openTransactions.map(
                              (transaction, index) => (
                                <li key={index}>
                                  {transaction.title} -{" "}
                                  {new Date(
                                    transaction.date
                                  ).toLocaleDateString()}{" "}
                                  - ${transaction.amount}
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                        <div>
                          <h3 className="font-semibold">Closed Transactions</h3>
                          <ul>
                            {client.closedTransactions.map(
                              (transaction, index) => (
                                <li key={index}>
                                  {transaction.title} -{" "}
                                  {new Date(
                                    transaction.date
                                  ).toLocaleDateString()}{" "}
                                  - ${transaction.amount}
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </>
            ))}
            {sortedClients.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  No clients found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
