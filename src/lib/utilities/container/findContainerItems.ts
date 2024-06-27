import { UniqueIdentifier } from "@dnd-kit/core";
import { ContainerType } from "../..";
import { findValueOfItems } from "../findValueOfItems";

export function findContainerItems(
  containers: ContainerType[],
  id: UniqueIdentifier | undefined
) {
  const container = findValueOfItems(containers, id, "container");
  if (!container) return [];
  return container.items;
}
