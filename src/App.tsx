import { useState } from "react";
import { Button } from "./components";

export default function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showAddContainerModal, setShowAddContainerModal] = useState(false);

  return (
    <div className="mx-auto max-w-7xl py-10">
      <div className="flex items-center justify-between gap-y-2">
        <h1 className="text-gray-800 text-3xl font-bold">DragTrack</h1>
        <Button onClick={() => setShowAddContainerModal(true)} />
      </div>
    </div>
  );
}
