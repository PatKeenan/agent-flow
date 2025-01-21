import React, { useState, useEffect } from "react";
import { PlusCircle, X } from "lucide-react";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown, Plus, Tag } from "lucide-react";
import { cn } from "@/lib/utils";

type FieldType =
  | "email"
  | "phone"
  | "transaction"
  | "family"
  | "tag"
  | "anniversary";

interface DynamicField {
  type: FieldType;
  value: string;
  label?: string;
}

interface DefaultField {
  type: FieldType;
  label?: string;
}

type Tag = {
  id: string;
  name: string;
};

const useTagStore = () => {
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    const savedTags = localStorage.getItem("crm-tags");
    if (savedTags) {
      setTags(JSON.parse(savedTags));
    }
  }, []);

  const addTag = (name: string) => {
    const newTag = { id: crypto.randomUUID(), name };
    const updatedTags = [...tags, newTag];
    setTags(updatedTags);
    localStorage.setItem("crm-tags", JSON.stringify(updatedTags));
  };

  const removeTag = (id: string) => {
    const updatedTags = tags.filter((tag) => tag.id !== id);
    setTags(updatedTags);
    localStorage.setItem("crm-tags", JSON.stringify(updatedTags));
  };

  return { tags, addTag, removeTag };
};

export function ContactDialog() {
  const { toast } = useToast();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dynamicFields, setDynamicFields] = useState<
    Record<FieldType, DynamicField[]>
  >({
    email: [],
    phone: [],
    transaction: [],
    family: [],
    tag: [],
    anniversary: [],
  });
  const [defaultFields, setDefaultFields] = useState<DefaultField[]>([]);

  useEffect(() => {
    const savedDefaultFields = localStorage.getItem("defaultContactFields");
    if (savedDefaultFields) {
      setDefaultFields(JSON.parse(savedDefaultFields));
    }
  }, []);

  useEffect(() => {
    const newDynamicFields: Record<FieldType, DynamicField[]> = {
      email: [],
      phone: [],
      transaction: [],
      family: [],
      tag: [],
      anniversary: [],
    };
    defaultFields.forEach((field) => {
      newDynamicFields[field.type].push({ ...field, value: "" });
    });
    setDynamicFields(newDynamicFields);
  }, [defaultFields]);

  const handleAddField = (type: FieldType) => {
    setDynamicFields((prev) => ({
      ...prev,
      [type]: [...prev[type], { type, value: "", label: "" }],
    }));
  };

  const handleRemoveField = (type: FieldType, index: number) => {
    setDynamicFields((prev) => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index),
    }));
  };

  const handleFieldChange = (
    type: FieldType,
    index: number,
    value: string,
    label?: string
  ) => {
    setDynamicFields((prev) => ({
      ...prev,
      [type]: prev[type].map((field, i) =>
        i === index ? { ...field, value, label } : field
      ),
    }));
  };

  const handleSave = () => {
    const allFields = Object.values(dynamicFields).flat();
    console.log("Saving contact:", {
      firstName,
      lastName,
      dynamicFields: allFields,
    });
    setFirstName("");
    setLastName("");
    const newDynamicFields: Record<FieldType, DynamicField[]> = {
      email: [],
      phone: [],
      transaction: [],
      family: [],
      tag: [],
      anniversary: [],
    };
    defaultFields.forEach((field) => {
      newDynamicFields[field.type].push({ ...field, value: "" });
    });
    setDynamicFields(newDynamicFields);
    toast({
      title: "Contact Saved",
      description: "The contact has been successfully added to your CRM.",
    });
  };

  const handleSaveDefaultFields = () => {
    localStorage.setItem("defaultContactFields", JSON.stringify(defaultFields));
    toast({
      title: "Default Fields Saved",
      description: "Your default fields have been updated.",
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add New Contact</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-6">
        <DialogHeader>
          <DialogTitle>Contact Management</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="add-contact">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="add-contact">Add Contact</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="add-contact">
            <div className="grid gap-6 py-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="firstName">First name</Label>
                  <Input
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="John"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lastName">Last name</Label>
                  <Input
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="space-y-6">
                {(Object.keys(dynamicFields) as FieldType[]).map(
                  (fieldType) =>
                    dynamicFields[fieldType].length > 0 && (
                      <div key={fieldType} className="space-y-2">
                        <Label className="text-base font-semibold">
                          {fieldType.charAt(0).toUpperCase() +
                            fieldType.slice(1)}
                        </Label>
                        {dynamicFields[fieldType].map((field, index) => (
                          <DynamicFieldInput
                            key={index}
                            field={field}
                            onRemove={() => handleRemoveField(fieldType, index)}
                            onChange={(value, label) =>
                              handleFieldChange(fieldType, index, value, label)
                            }
                          />
                        ))}
                      </div>
                    )
                )}
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Field
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuItem onSelect={() => handleAddField("email")}>
                    Email
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => handleAddField("phone")}>
                    Phone
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={() => handleAddField("transaction")}
                  >
                    Transaction
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => handleAddField("family")}>
                    Family Member
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => handleAddField("tag")}>
                    Tag
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={() => handleAddField("anniversary")}
                  >
                    Anniversary
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="pt-6">
              <Button onClick={handleSave} className="w-full">
                Save Contact
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="settings">
            <SettingsTab
              defaultFields={defaultFields}
              setDefaultFields={setDefaultFields}
              onSave={handleSaveDefaultFields}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

function DynamicFieldInput({
  field,
  onRemove,
  onChange,
}: {
  field: DynamicField;
  onRemove: () => void;
  onChange: (value: string, label?: string) => void;
}) {
  const { tags, addTag, removeTag } = useTagStore();
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  const getPlaceholder = (type: FieldType) => {
    switch (type) {
      case "email":
        return "Email address";
      case "phone":
        return "Phone number";
      case "transaction":
        return "Transaction details";
      case "family":
        return "Family member name";
      case "tag":
        return "Tag";
      case "anniversary":
        return "Anniversary date";
      default:
        return "";
    }
  };

  if (field.type === "tag") {
    const filteredTags = tags.filter((tag) =>
      tag.name.toLowerCase().includes(inputValue.toLowerCase())
    );

    return (
      <div className="flex items-center gap-2">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between"
            >
              {field.value ? (
                <Tag className="mr-2 h-4 w-4" />
              ) : (
                <Tag className="mr-2 h-4 w-4" />
              )}
              {field.value || "Select or create tag..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[300px] p-0">
            <Command>
              <CommandInput
                placeholder="Search or create tag..."
                value={inputValue}
                onValueChange={setInputValue}
              />
              <CommandList>
                <CommandGroup heading="Available Tags">
                  {filteredTags.length > 0 ? (
                    filteredTags.map((tag) => (
                      <CommandItem
                        key={tag.id}
                        value={tag.name}
                        onSelect={() => {
                          onChange(tag.name);
                          setInputValue("");
                          setOpen(false);
                        }}
                      >
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center">
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                field.value === tag.name
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {tag.name}
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="ml-auto h-8 w-8 p-0"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeTag(tag.id);
                            }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </CommandItem>
                    ))
                  ) : (
                    <CommandItem
                      onSelect={() => {
                        if (inputValue.trim()) {
                          addTag(inputValue.trim());
                          onChange(inputValue.trim());
                          setInputValue("");
                          setOpen(false);
                        }
                      }}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Create tag "{inputValue}"
                    </CommandItem>
                  )}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <Button variant="ghost" size="icon" onClick={onRemove}>
          <X className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {field.type === "email" || field.type === "phone" ? (
        <Select
          value={field.label}
          onValueChange={(value) => onChange(field.value, value)}
        >
          <SelectTrigger className="w-[110px]">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="personal">Personal</SelectItem>
            <SelectItem value="work">Work</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      ) : null}
      <Input
        value={field.value}
        onChange={(e) => onChange(e.target.value, field.label)}
        placeholder={getPlaceholder(field.type)}
      />
      <Button variant="ghost" size="icon" onClick={onRemove}>
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}

function SettingsTab({
  defaultFields,
  setDefaultFields,
  onSave,
}: {
  defaultFields: DefaultField[];
  setDefaultFields: React.Dispatch<React.SetStateAction<DefaultField[]>>;
  onSave: () => void;
}) {
  const addField = (type: FieldType) => {
    setDefaultFields((prev) => [...prev, { type }]);
  };

  const removeField = (index: number) => {
    setDefaultFields((prev) => prev.filter((_, i) => i !== index));
  };

  const updateFieldLabel = (index: number, label: string) => {
    setDefaultFields((prev) =>
      prev.map((field, i) => (i === index ? { ...field, label } : field))
    );
  };

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        Configure the default fields to show when adding a new contact:
      </p>
      {defaultFields.map((field, index) => (
        <div key={index} className="flex items-center space-x-2">
          <Select
            value={field.type}
            onValueChange={(value: FieldType) => {
              setDefaultFields((prev) =>
                prev.map((f, i) =>
                  i === index ? { ...f, type: value as FieldType } : f
                )
              );
            }}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Field Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="email">Email</SelectItem>
              <SelectItem value="phone">Phone</SelectItem>
              <SelectItem value="transaction">Transaction</SelectItem>
              <SelectItem value="family">Family</SelectItem>
              <SelectItem value="tag">Tag</SelectItem>
              <SelectItem value="anniversary">Anniversary</SelectItem>
            </SelectContent>
          </Select>
          {(field.type === "email" || field.type === "phone") && (
            <Select
              value={field.label}
              onValueChange={(value) => updateFieldLabel(index, value)}
            >
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="personal">Personal</SelectItem>
                <SelectItem value="work">Work</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => removeField(index)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-full">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Default Field
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuItem onSelect={() => addField("email")}>
            Email
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => addField("phone")}>
            Phone
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => addField("transaction")}>
            Transaction
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => addField("family")}>
            Family Member
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => addField("tag")}>
            Tag
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => addField("anniversary")}>
            Anniversary
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Button onClick={onSave} className="w-full">
        Save Default Fields
      </Button>
    </div>
  );
}
