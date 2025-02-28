import { Text } from "../../../../common";
import { useCorpById } from "../../../../hooks/roleplay/useCorpById";
import { CorpDTO, CorpEditor } from "./CorpEditor";

export interface CorpEditProps {
  corpId: number;
}

export function CorpEdit({ corpId }: CorpEditProps) {
  const corp = useCorpById(corpId);

  async function onUpdate(dto: CorpDTO) {}

  if (!corp) {
    return null;
  }

  return (
    <>
      <Text bold fontSize={3}>
        Edit Corp
      </Text>
      <br />
      <CorpEditor defaultDTO={corp} onSave={onUpdate} />
    </>
  );
}
