import { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Grip } from "lucide-react";
import clsx from "clsx";

type ItemsType = {
  id: UniqueIdentifier;
  title: string;
  onEdit?: () => void;
};

export function Items({ id, title, onEdit }: ItemsType) {
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
      onClick={onEdit}
      ref={setNodeRef}
      {...attributes}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
      }}
      className={clsx(
        "bg-white shadow rounded-md w-full border border-slate-200 hover:border-gray-200 flex relative items-start p-3",
        isDragging && "opacity-50"
      )}
    >
      <div className="flex flex-1 items-center justify-between text-[15px] pr-5">
        {title}
      </div>
      <button
        className="text-gray-400 hover:text-indigo-500 transition-colors p-1 cursor-grab"
        {...listeners}
      >
        <Grip size={17} />
      </button>
    </div>
  );
}
