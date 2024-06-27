import { UniqueIdentifier } from "@dnd-kit/core";
import { ContainerType } from "../../types";

export function onDeleteItem(
  editingItem: UniqueIdentifier | null,
  containers: ContainerType[],
  setContainers: (containers: ContainerType[]) => void,
  setEditingItem: (id: UniqueIdentifier | null) => void,
  setShowEditItemModal: (show: boolean) => void
) {
  if (!editingItem) return;
  const container = containers.find((container) =>
    container.items.find((item) => item.id === editingItem)
  );
  if (!container) return;
  container.items = container.items.filter((item) => item.id !== editingItem);
  setContainers([...containers]);
  setEditingItem(null);
  setShowEditItemModal(false);
}
