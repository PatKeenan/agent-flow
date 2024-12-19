"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
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
import type { Tag } from "@/types/client";

export function TagManager({
  tags,
  onAddTag,
}: {
  tags: Tag[];
  onAddTag: (tag: Tag) => void;
}) {
  const [newTag, setNewTag] = useState("");
  const [color, setColor] = useState("#4F46E5");

  const handleAddTag = () => {
    if (newTag) {
      onAddTag({
        id: Math.random().toString(36).substr(2, 9),
        name: newTag,
        color: color,
      });
      setNewTag("");
      setColor("#4F46E5");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="h-4 w-4" />
          Manage Tags
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Manage Tags</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Current Tags</Label>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge key={tag.id} style={{ backgroundColor: tag.color }}>
                  {tag.name}
                </Badge>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label>Add New Tag</Label>
            <div className="flex gap-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Enter tag name"
              />
              <Input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-20"
              />
            </div>
            <Button onClick={handleAddTag} className="w-full">
              Add Tag
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
