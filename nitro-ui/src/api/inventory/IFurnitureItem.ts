import { IObjectData } from "@nitrots/nitro-renderer";

export interface IFurnitureItem {
  id: number;
  ref: number;
  type: number;
  stuffData: IObjectData;
  extra: number;
  category: number;
  consumable: boolean;
  recyclable: boolean;
  isTradable: boolean;
  isGroupable: boolean;
  sellable: boolean;
  locked: boolean;
  isWallItem: boolean;
}
