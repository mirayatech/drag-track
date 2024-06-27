import { UniqueIdentifier } from "@dnd-kit/core";
import { ContainerType } from "../../types";

export function onDeleteContainer(
  id: UniqueIdentifier,
  containers: ContainerType[],
  setContainers: (containers: ContainerType[]) => void
) {
  setContainers(containers.filter((container) => container.id !== id));
}
