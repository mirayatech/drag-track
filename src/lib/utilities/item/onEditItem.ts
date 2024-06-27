import { UniqueIdentifier } from "@dnd-kit/core";
import { ContainerType } from "../../types";

export function onEditItem(
  editingItemName: string,
  editingItem: UniqueIdentifier | null,
  containers: ContainerType[],
  setContainers: (containers: ContainerType[]) => void,
  setEditingItem: (id: UniqueIdentifier | null) => void,
  setShowEditItemModal: (show: boolean) => void
) {
  if (!editingItemName || !editingItem) return;
  const container = containers.find((container) =>
    container.items.find((item) => item.id === editingItem)
  );
  if (!container) return;
  const item = container.items.find((item) => item.id === editingItem);
  if (!item) return;
  item.title = editingItemName;
  setContainers([...containers]);
  setEditingItem(null);
  setShowEditItemModal(false);
}
