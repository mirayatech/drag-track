import { UniqueIdentifier } from "@dnd-kit/core";
import { ContainerType } from "../../types";
import { findValueOfItems } from "../findValueOfItems";

export function findItemTitle(
  containers: ContainerType[],
  id: UniqueIdentifier | undefined
) {
  const container = findValueOfItems(containers, id, "item");
  if (!container) return "";
  const item = container.items.find((item) => item.id === id);
  if (!item) return "";
  return item.title;
}
