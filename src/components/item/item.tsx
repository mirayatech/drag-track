import { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { EllipsisVertical } from "lucide-react";
import clsx from "clsx";
import { useState } from "react";
import Menu from "../menu/menu";
import { AnimatePresence } from "framer-motion";

type ItemsType = {
  id: UniqueIdentifier;
  title: string;
  onEdit?: () => void;
  onDelete?: () => void;
};

export function Items({ id, title, onEdit, onDelete }: ItemsType) {
  const [isMenuOpen, setMenuOpen] = useState(false);

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
        "bg-white shadow rounded-md w-full border  border-200 hover:border-gray-200 flex pr-2 relative",
        isDragging && "opacity-50"
      )}
    >
      <div
        className="flex flex-1 items-center justify-between p-4 pr-3"
        {...listeners}
      >
        {title}
      </div>
      <button
        className="text-gray-600 hover:text-gray-900 transition-colors"
        onClick={() => setMenuOpen(!isMenuOpen)}
      >
        <EllipsisVertical size={17} />
      </button>
      <AnimatePresence>
        {isMenuOpen && (
          <Menu
            extraTop={true}
            setMenuOpen={setMenuOpen}
            isMenuOpen={isMenuOpen}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
