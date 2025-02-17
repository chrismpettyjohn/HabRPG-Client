import { FC, useRef } from "react";
import { CreateLinkEvent, GetConfiguration, MessengerFriend } from "../../../../api";
import { Flex } from "../../../../common";
import { FriendBarItemView } from "./FriendBarItemView";

const MAX_DISPLAY_COUNT = 5;

export const FriendBarView: FC<{ onlineFriends: MessengerFriend[] }> = (props) => {
  const { onlineFriends = null } = props;
  const elementRef = useRef<HTMLDivElement>();

  return (
    <Flex innerRef={elementRef} alignItems="center" className="friend-bar">
      {Array.from(Array(MAX_DISPLAY_COUNT), (e, i) => (
        <FriendBarItemView key={i} friend={onlineFriends[i] || null} />
      ))}
      <div className="friend-bar-footer" onClick={(event) => CreateLinkEvent("friends/toggle")}>
        <img src={GetConfiguration("image.library.url") + "/users.png"} />
        {onlineFriends?.length ?? 0}
      </div>
    </Flex>
  );
};
