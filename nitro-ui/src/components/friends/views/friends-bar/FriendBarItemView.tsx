import { DiceValueMessageEvent, MouseEventType } from "@nitrots/nitro-renderer";
import { FC, useEffect, useRef, useState } from "react";
import { GetUserProfile, LocalizeText, MessengerFriend, OpenMessengerChat } from "../../../../api";
import { Base, LayoutAvatarImageView, LayoutBadgeImageView, Text } from "../../../../common";
import { useFriends } from "../../../../hooks";

export const FriendBarItemView: FC<{ friend: MessengerFriend }> = (props) => {
  const { friend = null } = props;
  const [isVisible, setVisible] = useState(false);
  const { followFriend = null } = useFriends();
  const elementRef = useRef<HTMLDivElement>();

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const element = elementRef.current;

      if (!element) return;

      if (event.target !== element && !element.contains(event.target as Node)) {
        setVisible(false);
      }
    };

    document.addEventListener(MouseEventType.MOUSE_CLICK, onClick);

    return () => document.removeEventListener(MouseEventType.MOUSE_CLICK, onClick);
  }, []);

  if (!friend) {
    return (
      <div ref={elementRef} className="friend-bar-item">
        <div className="avatar">
          <LayoutAvatarImageView headOnly figure="hr-170-39.hd-3092-1.ch-3185-1198.lg-3078-1336.sh-800001536-1198.wa-2007-62.ca-1809-62" direction={2} />
        </div>
        <Text bold variant="white">
          {LocalizeText("friend.bar.find.title")}
        </Text>
      </div>
    );
  }

  return (
    <div
      ref={elementRef}
      className={"btn btn-success friend-bar-item " + (isVisible ? "friend-bar-item-active" : "")}
      onClick={(event) => setVisible((prevValue) => !prevValue)}
    >
      <div className={`friend-bar-item-head position-absolute ${friend.id > 0 ? "avatar" : "group"}`}>
        {friend.id > 0 && <LayoutAvatarImageView headOnly={true} figure={friend.figure} direction={2} />}
        {friend.id <= 0 && <LayoutBadgeImageView isGroup={true} badgeCode={friend.figure} />}
      </div>
      <div className="text-truncate">{friend.name}</div>
      {isVisible && (
        <div className="d-flex justify-content-between">
          <Base className="nitro-friends-spritesheet icon-friendbar-chat cursor-pointer" onClick={(event) => OpenMessengerChat(friend.id)} />
          {friend.followingAllowed && (
            <Base className="nitro-friends-spritesheet icon-friendbar-visit cursor-pointer" onClick={(event) => followFriend(friend)} />
          )}
          <Base className="nitro-friends-spritesheet icon-profile cursor-pointer" onClick={(event) => GetUserProfile(friend.id)} />
        </div>
      )}
    </div>
  );
};
