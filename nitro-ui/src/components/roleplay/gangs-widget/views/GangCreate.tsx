import { GangDataEvent } from "@nitrots/nitro-renderer";
import { useMessageEvent } from "../../../../hooks";
import { GangDTO, GangEditor } from "./GangEditor";
import { CreateLinkEvent } from "../../../../api";
import { Text } from "../../../../common";

export function GangCreate() {
  function onCreate(dto: GangDTO) {}

  useMessageEvent(GangDataEvent, (event: GangDataEvent) => {
    CreateLinkEvent(`gangs/edit/${event.getParser().data.id}`);
  });

  return (
    <>
      <Text bold fontSize={3}>
        Create Gang
      </Text>
      <GangEditor onSave={onCreate} />
    </>
  );
}
