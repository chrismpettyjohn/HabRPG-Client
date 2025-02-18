import { GetGuestRoomResultEvent, NavigatorSearchComposer } from "@nitrots/nitro-renderer";
import { FC, useState } from "react";
import { CreateLinkEvent, LocalizeText, SendMessageComposer } from "../../../../api";
import { Base, Column, Flex, Text } from "../../../../common";
import { useMessageEvent, useRoom } from "../../../../hooks";

export const RoomToolsWidgetView: FC<{}> = (props) => {
  const [roomName, setRoomName] = useState<string>(null);
  const [roomOwner, setRoomOwner] = useState<string>(null);
  const [roomTags, setRoomTags] = useState<string[]>(null);
  const { roomSession = null } = useRoom();

  const handleToolClick = (action: string, value?: string) => {
    switch (action) {
      case "settings":
        CreateLinkEvent("navigator/toggle-room-info");
        return;
      case "chat_history":
        CreateLinkEvent("chat-history/toggle");
        return;
      case "toggle_room_link":
        CreateLinkEvent("navigator/toggle-room-link");
        return;
      case "navigator_search_tag":
        CreateLinkEvent(`navigator/search/${value}`);
        SendMessageComposer(new NavigatorSearchComposer("hotel_view", `tag:${value}`));
        return;
    }
  };

  useMessageEvent<GetGuestRoomResultEvent>(GetGuestRoomResultEvent, (event) => {
    const parser = event.getParser();

    if (!parser.roomEnter || parser.data.roomId !== roomSession.roomId) return;

    if (roomName !== parser.data.roomName) setRoomName(parser.data.roomName);
    if (roomOwner !== parser.data.ownerName) setRoomOwner(parser.data.ownerName);
    if (roomTags !== parser.data.tags) setRoomTags(parser.data.tags);
  });

  return (
    <Flex className="nitro-room-tools-container" gap={2}>
      <Column center className="nitro-room-tools p-2">
        <Base pointer title={LocalizeText("room.settings.button.text")} className="icon icon-cog" onClick={() => handleToolClick("settings")} />
        <Base pointer title={LocalizeText("room.chathistory.button.text")} onClick={() => handleToolClick("chat_history")} className="icon icon-chat-history" />
      </Column>
      <Column justifyContent="center">
        <Column center>
          <Column className="nitro-room-tools-info rounded py-2 px-3">
            <Column gap={1}>
              <Text wrap variant="white" fontSize={4}>
                {roomName}
              </Text>
            </Column>
            {roomTags && roomTags.length > 0 && (
              <Flex gap={2}>
                {roomTags.map((tag, index) => (
                  <Text
                    key={index}
                    small
                    pointer
                    variant="white"
                    className="rounded bg-primary p-1"
                    onClick={() => handleToolClick("navigator_search_tag", tag)}
                  >
                    #{tag}
                  </Text>
                ))}
              </Flex>
            )}
          </Column>
        </Column>
      </Column>
    </Flex>
  );
};
