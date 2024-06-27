import { UniqueIdentifier } from "@dnd-kit/core";

export function openEditModal(
  setEditingContainer: (id: UniqueIdentifier | null) => void,
  setEditingContainerName: (name: string) => void,
  setShowEditContainerModal: (show: boolean) => void,
  id: UniqueIdentifier,
  title: string
) {
  setEditingContainer(id);
  setEditingContainerName(title);
  setShowEditContainerModal(true);
}
