import { useState } from "react";
import { Button, Container, Input, Items, Modal } from "./components";
import { useContainerStore } from "./lib";
import {
  DndContext,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";

export default function App() {
  const [containerName, setContainerName] = useState("");
  const { containers, addContainer } = useContainerStore();
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [showAddContainerModal, setShowAddContainerModal] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentContainerId, setCurrentContainerId] =
    useState<UniqueIdentifier>();

  const onAddContainer = () => {
    if (!containerName) return;
    addContainer(containerName);
    setContainerName("");
    setShowAddContainerModal(false);
  };

  function findValueOfItems(id: UniqueIdentifier | undefined, type: string) {
    if (type === "container") {
      return containers.find((item) => item.id === id);
    }
    if (type === "item") {
      return containers.find((container) =>
        container.items.find((item) => item.id === id)
      );
    }
  }

  const findItemTitle = (id: UniqueIdentifier | undefined) => {
    const container = findValueOfItems(id, "item");
    if (!container) return "";
    const item = container.items.find((item) => item.id === id);
    if (!item) return "";
    return item.title;
  };

  const findContainerTitle = (id: UniqueIdentifier | undefined) => {
    const container = findValueOfItems(id, "container");
    if (!container) return "";
    return container.title;
  };

  const findContainerItems = (id: UniqueIdentifier | undefined) => {
    const container = findValueOfItems(id, "container");
    if (!container) return [];
    return container.items;
  };

  // ✨ DND Handlers
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    const { id } = active;
    setActiveId(id);
  }

  return (
    <div className="mx-auto max-w-7xl">
      <Modal
        showModal={showAddContainerModal}
        setShowModal={setShowAddContainerModal}
      >
        <div className="flex flex-col w-full items-start gap-y-4">
          <h1 className="text-gray-800 text-2xl font-bold text-center mx-auto">
            Add Container
          </h1>
          <Input
            type="text"
            placeholder="Container Title"
            name="containername"
            value={containerName}
            onChange={(event) => setContainerName(event.target.value)}
          />
          <Button
            fullWidth={true}
            label="Add container"
            onClick={onAddContainer}
          />
        </div>
      </Modal>

      <div className="flex items-center justify-between gap-y-2">
        <h1 className="text-gray-800 text-3xl font-bold">DragTrack</h1>
        <Button
          onClick={() => setShowAddContainerModal(true)}
          label="Add Container"
        />
      </div>
      {/* 📦 Containers */}
      <div className="mt-10">
        <div className="grid grid-cols-3 gap-6">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragMove={() => {}}
            onDragEnd={() => {}}
          >
            <SortableContext items={containers.map((item) => item.id)}>
              {containers.map((container) => (
                <Container
                  id={container.id}
                  title={container.title}
                  key={container.id}
                  onAddItem={() => {
                    setShowAddItemModal(true);
                    setCurrentContainerId(container.id);
                  }}
                >
                  children
                </Container>
              ))}
            </SortableContext>
            <DragOverlay adjustScale={false}>
              {/* 🐡 Drag Overlay For item Item */}
              {activeId && activeId.toString().includes("item") && (
                <Items id={activeId} title={findItemTitle(activeId)} />
              )}
              {/* 🐙 Drag Overlay For Container */}
              {activeId && activeId.toString().includes("container") && (
                <Container id={activeId} title={findContainerTitle(activeId)}>
                  {findContainerItems(activeId).map((item) => (
                    <Items key={item.id} title={item.title} id={item.id} />
                  ))}
                </Container>
              )}
            </DragOverlay>
          </DndContext>
        </div>
      </div>
    </div>
  );
}
