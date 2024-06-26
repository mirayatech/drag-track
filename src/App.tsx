import { useState } from "react";
import { Button, Container, Input, Modal } from "./components";
import { DNDType } from "./lib";

export default function App() {
  const [containerName, setContainerName] = useState("");
  const [containers, setContainers] = useState<DNDType[]>([]);
  const [showAddContainerModal, setShowAddContainerModal] = useState(false);

  const onAddContainer = () => {
    if (!containerName) return;
    const id = `container-${Math.random() * 1000}`;
    setContainers([
      ...containers,
      {
        id,
        title: containerName,
        items: [],
      },
    ]);
    setContainerName("");
    setShowAddContainerModal(false);
    console.log(containers);
  };

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
            onChange={(e) => setContainerName(e.target.value)}
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
          {containers.map((container) => (
            <Container
              id={container.id}
              title={container.title}
              key={container.id}
            >
              children
            </Container>
          ))}
        </div>
      </div>
    </div>
  );
}
