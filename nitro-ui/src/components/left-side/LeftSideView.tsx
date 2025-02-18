import { FC } from "react";
import { Column } from "../../common";
import { CallParamedic } from "./call-paramedic/CallParamedic";
import { CharacterData } from "./character-data/CharacterData";

export const LeftSideView: FC<{}> = (props) => {
  return (
    <div className="nitro-left-side">
      <Column position="relative" gap={1}>
        <CharacterData />
        <CallParamedic />
      </Column>
    </div>
  );
};
