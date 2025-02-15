import { FC, PropsWithChildren, useRef } from "react";
import { CreateLinkEvent, GetSessionDataManager, GetUserProfile } from "../../api";
import { Base, Flex, LayoutItemCountView } from "../../common";

interface ToolbarMeViewProps {
  useGuideTool: boolean;
  unseenAchievementCount: number;
  onClose(): void;
}

export const ToolbarMeView: FC<PropsWithChildren<ToolbarMeViewProps>> = (props) => {
  const { useGuideTool = false, unseenAchievementCount = 0, onClose = null, children = null, ...rest } = props;
  const elementRef = useRef<HTMLDivElement>();

  return (
    <Flex innerRef={elementRef} alignItems="center" className="nitro-toolbar-me p-2" gap={2} onMouseLeave={onClose}>
      <Base pointer className="navigation-item icon icon-me-achievements" onClick={(event) => CreateLinkEvent("achievements/toggle")}>
        {unseenAchievementCount > 0 && <LayoutItemCountView count={unseenAchievementCount} />}
      </Base>
      <Base pointer className="navigation-item icon icon-me-profile" onClick={(event) => GetUserProfile(GetSessionDataManager().userId)} />
      <Base pointer className="navigation-item icon icon-me-rooms" onClick={(event) => CreateLinkEvent("navigator/search/myworld_view")} />
      <Base pointer className="navigation-item icon icon-me-clothing" onClick={(event) => CreateLinkEvent("avatar-editor/toggle")} />
      <Base pointer className="navigation-item icon icon-me-settings" onClick={(event) => CreateLinkEvent("user-settings/toggle")} />
      {children}
    </Flex>
  );
};
