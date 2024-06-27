import { UniqueIdentifier } from "@dnd-kit/core";
import { ContainerType } from "..";

export function findValueOfItems(
  containers: ContainerType[],
  id: UniqueIdentifier | undefined,
  type: string
) {
  if (type === "container") {
    return containers.find((item) => item.id === id);
  }
  if (type === "item") {
    return containers.find((container) =>
      container.items.find((item) => item.id === id)
    );
  }
}
