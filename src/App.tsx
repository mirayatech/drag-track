import { useState } from "react";
import { Button, Container, Input, Items, Modal } from "./components";
import { useContainerStore } from "./lib";
import {
  DndContext,
  DragEndEvent,
  DragMoveEvent,
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
  arrayMove,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";

export default function App() {
  const [containerName, setContainerName] = useState("");
  const { containers, setContainers, addContainer } = useContainerStore();
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [showAddContainerModal, setShowAddContainerModal] = useState(false);
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [showEditContainerModal, setShowEditContainerModal] = useState(false);
  const [currentContainerId, setCurrentContainerId] =
    useState<UniqueIdentifier>();
  const [itemName, setItemName] = useState("");
  const [editingContainer, setEditingContainer] =
    useState<UniqueIdentifier | null>(null);
  const [editingContainerName, setEditingContainerName] = useState("");

  const [showEditItemModal, setShowEditItemModal] = useState(false);
  const [editingItem, setEditingItem] = useState<UniqueIdentifier | null>(null);
  const [editingItemName, setEditingItemName] = useState("");

  const onAddContainer = () => {
    if (!containerName) return;
    addContainer(containerName);
    setContainerName("");
    setShowAddContainerModal(false);
  };

  const onAddItem = () => {
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
  };

  const onDeleteContainer = (id: UniqueIdentifier) => {
    setContainers(containers.filter((container) => container.id !== id));
  };

  const onEditContainer = () => {
    if (!editingContainerName || !editingContainer) return;
    const container = containers.find((item) => item.id === editingContainer);
    if (!container) return;
    container.title = editingContainerName;
    setContainers([...containers]);
    setEditingContainer(null);
    setEditingContainerName("");
    setShowEditContainerModal(false);
  };

  const onDeleteItem = () => {
    if (!editingItem) return;
    const container = containers.find((container) =>
      container.items.find((item) => item.id === editingItem)
    );
    if (!container) return;
    container.items = container.items.filter((item) => item.id !== editingItem);
    setContainers([...containers]);
    setEditingItem(null);
    setShowEditItemModal(false);
  };

  const onEditItem = () => {
    if (!editingItemName || !editingItem) return;
    const container = containers.find((container) =>
      container.items.find((item) => item.id === editingItem)
    );
    if (!container) return;
    const item = container.items.find((item) => item.id === editingItem);
    if (!item) return;
    item.title = editingItemName;
    setContainers([...containers]);
    setEditingItem(null);
    setShowEditItemModal(false);
  };

  const openEditModal = (id: UniqueIdentifier, title: string) => {
    setEditingContainer(id);
    setEditingContainerName(title);
    setShowEditContainerModal(true);
  };

  const openEditItemModal = (id: UniqueIdentifier, title: string) => {
    setEditingItem(id);
    setEditingItemName(title);
    setShowEditItemModal(true);
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

  const handleDragMove = (event: DragMoveEvent) => {
    const { active, over } = event;

    // Handle Items Sorting
    if (
      active.id.toString().includes("item") &&
      over?.id.toString().includes("item") &&
      active &&
      over &&
      active.id !== over.id
    ) {
      const activeContainer = findValueOfItems(active.id, "item");
      const overContainer = findValueOfItems(over.id, "item");

      if (!activeContainer || !overContainer) return;

      // Find the index of the active and over container
      const activeContainerIndex = containers.findIndex(
        (container) => container.id === activeContainer.id
      );

      const overContainerIndex = containers.findIndex(
        (container) => container.id === overContainer.id
      );

      // Find the index of the active and over item
      const activeitemIndex = activeContainer.items.findIndex(
        (item) => item.id === active.id
      );
      const overitemIndex = overContainer.items.findIndex(
        (item) => item.id === over.id
      );
      // In the same container
      if (activeContainerIndex === overContainerIndex) {
        const newItems = [...containers];
        newItems[activeContainerIndex].items = arrayMove(
          newItems[activeContainerIndex].items,
          activeitemIndex,
          overitemIndex
        );

        setContainers(newItems);
      } else {
        // In different containers
        const newItems = [...containers];
        const [removeditem] = newItems[activeContainerIndex].items.splice(
          activeitemIndex,
          1
        );
        newItems[overContainerIndex].items.splice(
          overitemIndex,
          0,
          removeditem
        );
        setContainers(newItems);
      }
    }

    // Handling Item Drop Into a Container
    if (
      active.id.toString().includes("item") &&
      over?.id.toString().includes("container") &&
      active &&
      over &&
      active.id !== over.id
    ) {
      const activeContainer = findValueOfItems(active.id, "item");
      const overContainer = findValueOfItems(over.id, "container");

      if (!activeContainer || !overContainer) return;

      // Find the index of the active and over container
      const activeContainerIndex = containers.findIndex(
        (container) => container.id === activeContainer.id
      );
      const overContainerIndex = containers.findIndex(
        (container) => container.id === overContainer.id
      );

      // Find the index of the active and over item
      const activeitemIndex = activeContainer.items.findIndex(
        (item) => item.id === active.id
      );

      // Remove the active item from the active container and add it to the over container
      const newItems = [...containers];
      const [removeditem] = newItems[activeContainerIndex].items.splice(
        activeitemIndex,
        1
      );
      newItems[overContainerIndex].items.push(removeditem);
      setContainers(newItems);
    }
  };

  // This is the function that handles the sorting of the containers and items when the user is done dragging.
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    // Handling Container Sorting
    if (
      active.id.toString().includes("container") &&
      over?.id.toString().includes("container") &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the index of the active and over container
      const activeContainerIndex = containers.findIndex(
        (container) => container.id === active.id
      );
      const overContainerIndex = containers.findIndex(
        (container) => container.id === over.id
      );
      // Swap the active and over container
      let newItems = [...containers];
      newItems = arrayMove(newItems, activeContainerIndex, overContainerIndex);
      setContainers(newItems);
    }

    // Handling item Sorting
    if (
      active.id.toString().includes("item") &&
      over?.id.toString().includes("item") &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the active and over container
      const activeContainer = findValueOfItems(active.id, "item");
      const overContainer = findValueOfItems(over.id, "item");

      // If the active or over container is not found, return
      if (!activeContainer || !overContainer) return;
      // Find the index of the active and over container
      const activeContainerIndex = containers.findIndex(
        (container) => container.id === activeContainer.id
      );
      const overContainerIndex = containers.findIndex(
        (container) => container.id === overContainer.id
      );
      // Find the index of the active and over item
      const activeitemIndex = activeContainer.items.findIndex(
        (item) => item.id === active.id
      );
      const overitemIndex = overContainer.items.findIndex(
        (item) => item.id === over.id
      );

      // In the same container
      if (activeContainerIndex === overContainerIndex) {
        const newItems = [...containers];
        newItems[activeContainerIndex].items = arrayMove(
          newItems[activeContainerIndex].items,
          activeitemIndex,
          overitemIndex
        );
        setContainers(newItems);
      } else {
        // In different containers
        const newItems = [...containers];
        const [removeditem] = newItems[activeContainerIndex].items.splice(
          activeitemIndex,
          1
        );
        newItems[overContainerIndex].items.splice(
          overitemIndex,
          0,
          removeditem
        );
        setContainers(newItems);
      }
    }
    // Handling item dropping into Container
    if (
      active.id.toString().includes("item") &&
      over?.id.toString().includes("container") &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the active and over container
      const activeContainer = findValueOfItems(active.id, "item");
      const overContainer = findValueOfItems(over.id, "container");

      // If the active or over container is not found, return
      if (!activeContainer || !overContainer) return;
      // Find the index of the active and over container
      const activeContainerIndex = containers.findIndex(
        (container) => container.id === activeContainer.id
      );
      const overContainerIndex = containers.findIndex(
        (container) => container.id === overContainer.id
      );
      // Find the index of the active and over item
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
    setActiveId(null);
  }

  return (
    <div className="mx-auto max-w-7xl">
      {/* 📦 Container Modal */}
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
      {/* 📂 Item Modal */}
      <Modal showModal={showAddItemModal} setShowModal={setShowAddItemModal}>
        <div className="flex flex-col w-full items-start gap-y-4">
          <h1 className="text-gray-800 text-2xl font-bold text-center mx-auto">
            Add Item
          </h1>
          <Input
            type="text"
            placeholder="Item Title"
            name="itemname"
            value={itemName}
            onChange={(event) => setItemName(event.target.value)}
          />
          <Button fullWidth={true} label="Add Item" onClick={onAddItem} />
        </div>
      </Modal>
      {/* 📦 Edit Container Modal */}
      <Modal
        showModal={showEditContainerModal}
        setShowModal={setShowEditContainerModal}
      >
        <div className="flex flex-col w-full items-start gap-y-4">
          <h1 className="text-gray-800 text-2xl font-bold text-center mx-auto">
            Edit Container
          </h1>
          <Input
            type="text"
            placeholder="Container Title"
            name="containername"
            value={editingContainerName}
            onChange={(event) => setEditingContainerName(event.target.value)}
          />
          <Button
            fullWidth={true}
            label="Edit container"
            onClick={onEditContainer}
          />
        </div>
      </Modal>
      {/* 📂 Edit Item Modal */}
      <Modal showModal={showEditItemModal} setShowModal={setShowEditItemModal}>
        <div className="flex flex-col w-full items-start gap-y-4">
          <h1 className="text-gray-800 text-2xl font-bold text-center mx-auto">
            Edit Item
          </h1>
          <Input
            type="text"
            placeholder="Item Title"
            name="itemname"
            value={editingItemName}
            onChange={(event) => setEditingItemName(event.target.value)}
          />
          <div className="flex justify-between w-full gap-3">
            <Button
              bgLight={true}
              fullWidth={true}
              variant="ghost"
              label="Cancel"
              onClick={() => setShowEditItemModal(false)}
            />
            <Button fullWidth={true} label="Save" onClick={onEditItem} />
          </div>
        </div>
      </Modal>
      {/* header */}
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
            onDragMove={handleDragMove}
            onDragEnd={handleDragEnd}
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
                  onEdit={() => openEditModal(container.id, container.title)}
                  onDelete={() => onDeleteContainer(container.id)}
                >
                  <SortableContext
                    items={container.items.map((item) => item.id)}
                  >
                    <div className="flex items-start flex-col gap-y-2">
                      {container.items.map((item) => (
                        <Items
                          title={item.title}
                          id={item.id}
                          key={item.id}
                          onEdit={() => openEditItemModal(item.id, item.title)}
                          onDelete={onDeleteItem}
                        />
                      ))}
                    </div>
                  </SortableContext>
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
