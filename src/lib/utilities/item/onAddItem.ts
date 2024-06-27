import { UniqueIdentifier } from "@dnd-kit/core";
import { ContainerType } from "../../types";

export function onAddItem(
  itemName: string,
  setItemName: (name: string) => void,
  setShowAddItemModal: (show: boolean) => void,
  containers: ContainerType[],
  setContainers: (containers: ContainerType[]) => void,
  currentContainerId: UniqueIdentifier | undefined
) {
  if (!itemName) return;
  const id = `item-${Math.random() * 1000}`;
  const container = containers.find((item) => item.id === currentContainerId);
  if (!container) return;
  container.items.push({
    id,
    title: itemName,
  });
  setContainers([...containers]);
  setItemName("");
  setShowAddItemModal(false);
}
