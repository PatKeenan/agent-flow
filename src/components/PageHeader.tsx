import * as React from "react";
import { cn } from "@/lib/utils";

type PageHeaderProps = {
  title: string;
  children?: React.ReactNode;
  className?: string;
};

export const PageHeader = ({ title, children, className }: PageHeaderProps) => {
  return (
    <div className={cn("flex items-center justify-between mb-6", className)}>
      <h1 className="text-2xl font-bold">{title}</h1>
      {children}
    </div>
  );
};
