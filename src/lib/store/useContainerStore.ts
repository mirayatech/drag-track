import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DNDType } from "..";

type ContainerState = {
  containers: DNDType[];
  setContainers: (containers: DNDType[]) => void;
  addContainer: (title: string) => void;
};

export const useContainerStore = create<ContainerState>()(
  persist(
    (set) => ({
      containers: [],
      setContainers: (containers) => set({ containers }),
      addContainer: (title: string) =>
        set((state) => ({
          containers: [
            ...state.containers,
            {
              id: `container-${Math.random() * 1000}`,
              title,
              items: [],
            },
          ],
        })),
    }),
    {
      name: "container-storage",
    }
  )
);
