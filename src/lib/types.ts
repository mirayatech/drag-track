import { UniqueIdentifier } from "@dnd-kit/core";

export type DNDType = {
  id: UniqueIdentifier;
  title: string;
  items: {
    id: UniqueIdentifier;
    title: string;
  }[];
};

export type ItemType = {
  id: UniqueIdentifier;
  title: string;
};

export type ContainerType = {
  id: UniqueIdentifier;
  title: string;
  items: ItemType[];
};
