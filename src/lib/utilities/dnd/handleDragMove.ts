import { DragMoveEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { ContainerType } from "../..";
import { findValueOfItems } from "../findValueOfItems";

export function handleDragMove(
  event: DragMoveEvent,
  containers: ContainerType[],
  setContainers: (containers: ContainerType[]) => void
) {
  const { active, over } = event;

  if (
    active.id.toString().includes("item") &&
    over?.id.toString().includes("item") &&
    active &&
    over &&
    active.id !== over.id
  ) {
    const activeContainer = findValueOfItems(containers, active.id, "item");
    const overContainer = findValueOfItems(containers, over.id, "item");

    if (!activeContainer || !overContainer) return;

    const activeContainerIndex = containers.findIndex(
      (container) => container.id === activeContainer.id
    );

    const overContainerIndex = containers.findIndex(
      (container) => container.id === overContainer.id
    );

    const activeitemIndex = activeContainer.items.findIndex(
      (item) => item.id === active.id
    );
    const overitemIndex = overContainer.items.findIndex(
      (item) => item.id === over.id
    );

    if (activeContainerIndex === overContainerIndex) {
      const newItems = [...containers];
      newItems[activeContainerIndex].items = arrayMove(
        newItems[activeContainerIndex].items,
        activeitemIndex,
        overitemIndex
      );

      setContainers(newItems);
    } else {
      const newItems = [...containers];
      const [removeditem] = newItems[activeContainerIndex].items.splice(
        activeitemIndex,
        1
      );
      newItems[overContainerIndex].items.splice(overitemIndex, 0, removeditem);
      setContainers(newItems);
    }
  }

  if (
    active.id.toString().includes("item") &&
    over?.id.toString().includes("container") &&
    active &&
    over &&
    active.id !== over.id
  ) {
    const activeContainer = findValueOfItems(containers, active.id, "item");
    const overContainer = findValueOfItems(containers, over.id, "container");

    if (!activeContainer || !overContainer) return;

    const activeContainerIndex = containers.findIndex(
      (container) => container.id === activeContainer.id
    );
    const overContainerIndex = containers.findIndex(
      (container) => container.id === overContainer.id
    );

    const activeitemIndex = activeContainer.items.findIndex(
      (item) => item.id === active.id
    );

    const newItems = [...containers];
    const [removeditem] = newItems[activeContainerIndex].items.splice(
      activeitemIndex,
      1
    );
    newItems[overContainerIndex].items.push(removeditem);
    setContainers(newItems);
  }
}
