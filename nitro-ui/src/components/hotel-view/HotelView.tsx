import { NitroConfiguration, RoomSessionEvent } from "@nitrots/nitro-renderer";
import { FC, useState } from "react";
import { GetConfiguration } from "../../api";
import { LayoutAvatarImageView } from "../../common";
import { useRoomSessionManagerEvent, useSessionInfo } from "../../hooks";

export const HotelView: FC<{}> = () => {
  const [isVisible, setIsVisible] = useState(true);
  const { userFigure = null } = useSessionInfo();

  useRoomSessionManagerEvent<RoomSessionEvent>([RoomSessionEvent.CREATED, RoomSessionEvent.ENDED], (event) => {
    switch (event.type) {
      case RoomSessionEvent.CREATED:
        setIsVisible(false);
        return;
      case RoomSessionEvent.ENDED:
        setIsVisible(event.openLandingView);
        return;
    }
  });

  if (!isVisible) return null;

  const backgroundColor = GetConfiguration("hotelview")["images"]["background.colour"];
  const background = NitroConfiguration.interpolate(GetConfiguration("hotelview")["images"]["background"]);
  const sun = NitroConfiguration.interpolate(GetConfiguration("hotelview")["images"]["sun"]);
  const left = NitroConfiguration.interpolate(GetConfiguration("hotelview")["images"]["left"]);
  const rightRepeat = NitroConfiguration.interpolate(GetConfiguration("hotelview")["images"]["right.repeat"]);
  const right = NitroConfiguration.interpolate(GetConfiguration("hotelview")["images"]["right"]);

  return (
    <div className="nitro-hotel-view" style={backgroundColor && backgroundColor ? { background: backgroundColor } : {}}>
      <div className="background position-absolute" style={background && background.length ? { backgroundImage: `url(${background})` } : {}} />
      <div className="sun position-absolute" style={sun && sun.length ? { backgroundImage: `url(${sun})` } : {}} />
      <div className="left position-absolute" style={left && left.length ? { backgroundImage: `url(${left})` } : {}} />
      <div className="right-repeat position-absolute" style={rightRepeat && rightRepeat.length ? { backgroundImage: `url(${rightRepeat})` } : {}} />
      <div className="right position-absolute" style={right && right.length ? { backgroundImage: `url(${right})` } : {}} />
      {GetConfiguration("hotelview")["show.avatar"] && (
        <div className="avatar-image">
          <LayoutAvatarImageView figure={userFigure} direction={2} />
        </div>
      )}
    </div>
  );
};
