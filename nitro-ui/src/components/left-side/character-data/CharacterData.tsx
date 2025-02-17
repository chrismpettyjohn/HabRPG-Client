import { useSessionInfo } from "../../../hooks";
import { CharacterContainer } from "./character-container/CharacterContainer";

export function CharacterData() {
  const { userInfo } = useSessionInfo();
  if (!userInfo?.userId) return null;
  return (
    <>
      <CharacterContainer userId={userInfo.userId} />
    </>
  );
}
