import { useSortable } from "@dnd-kit/sortable";
import { UniqueIdentifier } from "@dnd-kit/core";
import { EllipsisVertical } from "lucide-react";
import { Button } from "..";
import { useState } from "react";
import { CSS } from "@dnd-kit/utilities";
import { AnimatePresence } from "framer-motion";
import Menu from "../menu/menu";
import clsx from "clsx";

type ContainerProps = {
  id: UniqueIdentifier;
  children: React.ReactNode;
  title?: string;
  description?: string;
  onAddItem?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
};

export function Container({
  id,
  children,
  title,
  onAddItem,
  onEdit,
  onDelete,
}: ContainerProps) {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const {
    attributes,
    setNodeRef,
    listeners,
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
        "w-full h-full border bg-slate-100 border-slate-200 rounded-lg flex flex-col ",
        isDragging && "opacity-50"
      )}
    >
      <div className="flex items-center justify-between rounded-t-lg pb-1">
        <h1
          className="text-slate-700 text-base font-semibold flex-1 cursor-grab p-4"
          {...listeners}
        >
          {title}
        </h1>
        <div className="relative">
          <button
            className="text-slate-500 hover:text-gray-900 transition-colors pr-2 "
            onClick={() => setMenuOpen(!isMenuOpen)}
          >
            <EllipsisVertical size={17} />
          </button>
          <AnimatePresence>
            {isMenuOpen && (
              <Menu
                setMenuOpen={setMenuOpen}
                isMenuOpen={isMenuOpen}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
      <div className="pb-2 px-3 mb-auto">{children}</div>
      <div className="px-4 pb-2 mt-auto">
        <Button
          variant="ghost"
          onClick={onAddItem}
          label="Add Item"
          fullWidth={true}
        />
      </div>
    </div>
  );
}
