import { UniqueIdentifier } from "@dnd-kit/core";

export function openEditItemModal(
  setEditingItem: (id: UniqueIdentifier | null) => void,
  setEditingItemName: (name: string) => void,
  setShowEditItemModal: (show: boolean) => void,
  id: UniqueIdentifier,
  title: string
) {
  setEditingItem(id);
  setEditingItemName(title);
  setShowEditItemModal(true);
}
