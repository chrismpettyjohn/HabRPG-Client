import { RoomEngineObjectEvent, RoomObjectCategory, RoomObjectType } from "@nitrots/nitro-renderer";
import { useRoomEngineEvent, useSessionInfo } from "../../../hooks";
import { CharacterContainer } from "./character-container/CharacterContainer";
import { useState } from "react";
import { GetRoomSession } from "../../../api";
import { Text } from "../../../common";

export function CharacterData() {
  const { userInfo } = useSessionInfo();
  const [target, setTarget] = useState<number>();

  useRoomEngineEvent<RoomEngineObjectEvent>(RoomEngineObjectEvent.SELECTED, (event) => {
    if (event.category !== RoomObjectCategory.UNIT) return;
    const userData = GetRoomSession().userDataManager.getUserDataByIndex(event.objectId);
    if (userData.type !== RoomObjectType.USER) return;
    if (userData.webID === userInfo.userId) return;
    setTarget(userData.webID);
  });

  return (
    <div style={{ alignItems: "center", display: "flex", gap: 12, width: "100%" }}>
      {userInfo?.userId && <CharacterContainer userId={userInfo.userId} />}
      {target && (
        <>
          <Text bold fontSize={3} variant="white">
            vs.
          </Text>
          <CharacterContainer userId={target} onClose={() => setTarget(undefined)} />
        </>
      )}
    </div>
  );
}
