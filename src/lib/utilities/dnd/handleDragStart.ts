import { DragStartEvent, UniqueIdentifier } from "@dnd-kit/core";

export function handleDragStart(
  event: DragStartEvent,
  setActiveId: (id: UniqueIdentifier) => void
) {
  const { active } = event;
  const { id } = active;
  setActiveId(id);
}
