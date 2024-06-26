import { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Grip } from "lucide-react";
import clsx from "clsx";

type ItemsType = {
  id: UniqueIdentifier;
  title: string;
};

export function Items({ id, title }: ItemsType) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: id,
    data: {
      type: "item",
    },
  });
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
      }}
      className={clsx(
        "p-4 pr-3 bg-white shadow rounded-md w-full border  border-200 hover:border-gray-200",
        isDragging && "opacity-50"
      )}
    >
      <div className="flex items-center justify-between">
        {title}
        <button
          className="hover:bg-gray-100 p-2 rounded-md transition-colors cursor-grab"
          {...listeners}
        >
          <Grip size={16} className="text-gray-400" />
        </button>
      </div>
    </div>
  );
}
