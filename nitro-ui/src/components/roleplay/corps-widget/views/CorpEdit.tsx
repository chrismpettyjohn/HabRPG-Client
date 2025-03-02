import { Text } from "../../../../common";
import { useCorpById } from "../../../../hooks/roleplay/useCorpById";
import { CorpDTO, CorpEditor } from "./CorpEditor";
import { LoadingIcon } from "../../../loading-icon/LoadingIcon";

export interface CorpEditProps {
  corpId: number;
}

export function CorpEdit({ corpId }: CorpEditProps) {
  const corp = useCorpById(corpId);

  async function onUpdate(dto: CorpDTO) {}

  if (!corp) {
    return <LoadingIcon>Loading corp {corpId}</LoadingIcon>;
  }

  return (
    <>
      <Text bold fontSize={3}>
        Edit Corp
      </Text>
      <CorpEditor defaultDTO={corp} onSave={onUpdate} />
    </>
  );
}
