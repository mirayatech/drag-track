export function onAddContainer(
  containerName: string,
  setContainerName: (name: string) => void,
  setShowAddContainerModal: (show: boolean) => void,
  addContainer: (name: string) => void
) {
  if (!containerName) return;
  addContainer(containerName);
  setContainerName("");
  setShowAddContainerModal(false);
}
