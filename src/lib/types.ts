import { UniqueIdentifier } from "@dnd-kit/core";

export type DNDType = {
  id: UniqueIdentifier;
  title: string;
  items: {
    id: UniqueIdentifier;
    title: string;
  }[];
};
