import { CorpDataEvent } from "@nitrots/nitro-renderer";
import { useMessageEvent } from "../../../../hooks";
import { CorpDTO, CorpEditor } from "./CorpEditor";
import { CreateLinkEvent } from "../../../../api";
import { Text } from "../../../../common";

export function CorpCreate() {
  function onCreate(dto: CorpDTO) {}

  useMessageEvent(CorpDataEvent, (event: CorpDataEvent) => {
    CreateLinkEvent(`corps/edit/${event.getParser().data.id}`);
  });

  return (
    <>
      <Text bold fontSize={3}>
        Create Corp
      </Text>
      <br />
      <CorpEditor onSave={onCreate} />
    </>
  );
}
