import { useSortable } from "@dnd-kit/sortable";
import { GripVertical } from "lucide-react";
import { CSS } from "@dnd-kit/utilities";
import clsx from "clsx";

import { UniqueIdentifier } from "@dnd-kit/core";
import { Button } from "..";

type ContainerProps = {
  id: UniqueIdentifier;
  children: React.ReactNode;
  title?: string;
  description?: string;
  onAddItem?: () => void;
};
export function Container({ id, children, title, onAddItem }: ContainerProps) {
  const {
    attributes,
    setNodeRef,
    // listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: id,
    data: {
      type: "container",
    },
  });
  return (
    <div
      {...attributes}
      ref={setNodeRef}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
      }}
      className={clsx(
        "w-full h-full border bg-gray-50 border-gray-300 rounded-lg flex flex-col gap-y-4",
        isDragging && "opacity-50"
      )}
    >
      <div>
        <div className="flex items-center bg-white rounded-md-b justify-between rounded-t-lg border-b border-gray-300 p-4">
          <h1 className="text-gray-800 text-base font-medium">{title}</h1>
          <button className="hover:shadow-xl">
            <GripVertical size={16} className="text-gray-400 cursor-grab" />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-y-4 p-4">{children}</div>
      <div className="p-4">
        <Button
          // variant="ghost"
          onClick={onAddItem}
          transparent={true}
          label=" Add Item"
          fullWidth={true}
        />
      </div>
    </div>
  );
}
