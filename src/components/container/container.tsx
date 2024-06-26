import React from "react";
import { UniqueIdentifier } from "@dnd-kit/core";
import { GripVertical } from "lucide-react";
import { Button } from "..";

type ContainerProps = {
  id: UniqueIdentifier;
  children: React.ReactNode;
  title?: string;
  description?: string;
  onAddItem?: () => void;
};
export function Container({ children, title }: ContainerProps) {
  return (
    <div className="w-full h-full border bg-gray-50 border-gray-300 rounded-lg flex flex-col gap-y-4">
      <div className="">
        <div className="flex items-center bg-white rounded-md-b justify-between rounded-t-lg border-b border-gray-300 p-4">
          <h1 className="text-gray-800 text-base font-medium">{title}</h1>{" "}
          <button className="hover:shadow-xl">
            <GripVertical size={16} className="text-gray-400 cursor-grab" />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-y-4 p-4">{children}</div>
      <div className="p-4">
        <Button
          transparent={true}
          onClick={() => {}}
          label="Add Item"
          fullWidth={true}
        />
      </div>
    </div>
  );
}
