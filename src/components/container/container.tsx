import { useSortable } from "@dnd-kit/sortable";
import { UniqueIdentifier } from "@dnd-kit/core";
import { EllipsisVertical } from "lucide-react";
import { Button } from "..";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Menu from "../menu/menu";

type ContainerProps = {
  id: UniqueIdentifier;
  children: React.ReactNode;
  title?: string;
  description?: string;
  onAddItem?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
};

export function Container({ id, children, title, onAddItem }: ContainerProps) {
  const { attributes, setNodeRef } = useSortable({
    id: id,
    data: {
      type: "container",
    },
  });

  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <div
      {...attributes}
      ref={setNodeRef}
      className="cursor-default w-full h-full border bg-gray-50 border-gray-300 rounded-lg flex flex-col"
    >
      <div>
        <div className="flex items-center bg-white justify-between rounded-t-lg border-b border-gray-300 p-4 pr-2">
          <h1 className="text-gray-800 text-base font-medium">{title}</h1>
          <div className="relative">
            <button
              className="text-gray-600 hover:text-gray-900 transition-colors"
              onClick={() => setMenuOpen(!isMenuOpen)}
            >
              <EllipsisVertical size={17} />
            </button>
            <AnimatePresence>
              {isMenuOpen && (
                <Menu setMenuOpen={setMenuOpen} isMenuOpen={isMenuOpen} />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <div className="py-4 pb-2 px-3 mb-auto">{children}</div>
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
