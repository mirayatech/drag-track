import { UniqueIdentifier } from "@dnd-kit/core";
import { ContainerType } from "../../types";

export function onEditContainer(
  editingContainerName: string,
  editingContainer: UniqueIdentifier | null,
  containers: ContainerType[],
  setContainers: (containers: ContainerType[]) => void,
  setEditingContainer: (id: UniqueIdentifier | null) => void,
  setEditingContainerName: (name: string) => void,
  setShowEditContainerModal: (show: boolean) => void
) {
  if (!editingContainerName || !editingContainer) return;
  const container = containers.find((item) => item.id === editingContainer);
  if (!container) return;
  container.title = editingContainerName;
  setContainers([...containers]);
  setEditingContainer(null);
  setEditingContainerName("");
  setShowEditContainerModal(false);
}
