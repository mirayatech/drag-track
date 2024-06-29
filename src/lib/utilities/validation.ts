import { UniqueIdentifier } from "@dnd-kit/core";
import { ContainerType } from "..";

export const isContainerNameEmpty = (containerName: string): boolean => {
  return containerName.trim() === "";
};

export const isItemNameEmpty = (itemName: string): boolean => {
  return itemName.trim() === "";
};

export const isEditingContainerNameChanged = (
  editingContainerName: string,
  editingContainer: UniqueIdentifier | null,
  containers: ContainerType[]
): boolean => {
  return (
    editingContainerName.trim() !== "" &&
    containers.some(
      (container) =>
        container.id === editingContainer &&
        container.title !== editingContainerName.trim()
    )
  );
};

export const isEditingItemNameChanged = (
  editingItemName: string,
  editingItem: UniqueIdentifier | null,
  containers: ContainerType[]
): boolean => {
  return (
    editingItemName.trim() !== "" &&
    containers.some((container) =>
      container.items.some(
        (item) =>
          item.id === editingItem && item.title !== editingItemName.trim()
      )
    )
  );
};
