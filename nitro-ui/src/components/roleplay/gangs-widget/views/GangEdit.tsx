import { Text } from "../../../../common";
import { useGangById } from "../../../../hooks/roleplay/useGangById";
import { GangDTO, GangEditor } from "./GangEditor";
import { LoadingIcon } from "../../../loading-icon/LoadingIcon";

export interface GangEditProps {
  gangId: number;
}

export function GangEdit({ gangId }: GangEditProps) {
  const gang = useGangById(gangId);

  async function onUpdate(dto: GangDTO) {}

  if (!gang) {
    return <LoadingIcon>Loading gang {gangId}</LoadingIcon>;
  }

  return (
    <>
      <Text bold fontSize={3}>
        Edit Gang
      </Text>
      <GangEditor defaultDTO={gang} onSave={onUpdate} />
    </>
  );
}
