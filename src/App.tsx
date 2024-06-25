import { useState } from "react";
import { Button, Input, Modal } from "./components";

export default function App() {
  const [containerName, setContainerName] = useState("");
  const [showAddContainerModal, setShowAddContainerModal] = useState(false);

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
          <Button fullWidth={true} label="Add container" onClick={() => {}} />
        </div>
      </Modal>

      <div className="flex items-center justify-between gap-y-2">
        <h1 className="text-gray-800 text-3xl font-bold">DragTrack</h1>
        <Button
          onClick={() => setShowAddContainerModal(true)}
          label="Add Container"
        />
      </div>
    </div>
  );
}
