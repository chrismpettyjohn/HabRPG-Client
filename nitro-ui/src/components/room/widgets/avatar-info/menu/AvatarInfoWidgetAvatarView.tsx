import {
  CorpDemoteUserComposer,
  CorpFireUserComposer,
  CorpOfferUserJobComposer,
  CorpPromoteUserComposer,
  HealComposer,
  RoomControllerLevel,
  RoomObjectCategory,
  RoomObjectVariable,
  RoomUnitGiveHandItemComposer,
  SetRelationshipStatusComposer,
  TradingOpenComposer,
} from "@nitrots/nitro-renderer";
import { FC, useEffect, useMemo, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import {
  AvatarInfoUser,
  CreateLinkEvent,
  DispatchUiEvent,
  GetOwnRoomObject,
  GetSessionDataManager,
  GetUserProfile,
  LocalizeText,
  MessengerFriend,
  ReportType,
  RoomWidgetUpdateChatInputContentEvent,
  SendMessageComposer,
} from "../../../../../api";
import { Base, Flex } from "../../../../../common";
import { useCharacter, useFriends, useHelp, useRoom, useSessionInfo } from "../../../../../hooks";
import { ContextMenuHeaderView } from "../../context-menu/ContextMenuHeaderView";
import { ContextMenuListItemView } from "../../context-menu/ContextMenuListItemView";
import { ContextMenuView } from "../../context-menu/ContextMenuView";
import { useCorpRoleById } from "../../../../../hooks/roleplay/useCorpRoleById";
import { useCorpRoleListByCorp } from "../../../../../hooks/roleplay/useCorpRoleListByCorp";

interface AvatarInfoWidgetAvatarViewProps {
  avatarInfo: AvatarInfoUser;
  onClose: () => void;
}

const MODE_NORMAL = 0;
const MODE_MODERATE = 1;
const MODE_MODERATE_BAN = 2;
const MODE_MODERATE_MUTE = 3;
const MODE_AMBASSADOR = 4;
const MODE_AMBASSADOR_MUTE = 5;
const MODE_RELATIONSHIP = 6;
const MODE_CORP = 7;

export const AvatarInfoWidgetAvatarView: FC<AvatarInfoWidgetAvatarViewProps> = (props) => {
  const { avatarInfo = null, onClose = null } = props;
  const [mode, setMode] = useState(MODE_NORMAL);
  const { canRequestFriend = null } = useFriends();
  const { report = null } = useHelp();
  const { roomSession = null } = useRoom();
  const { userRespectRemaining = 0, respectUser = null, userInfo } = useSessionInfo();

  const avatarCharacter = useCharacter(avatarInfo?.webID);
  const avatarRole = useCorpRoleById(avatarCharacter?.corpRoleId);

  const avatarCorpRoles = useCorpRoleListByCorp(avatarCharacter?.corpId);

  const myCharacter = useCharacter(userInfo?.userId);
  const myRole = useCorpRoleById(myCharacter?.corpRoleId);

  const isShowGiveRights = useMemo(() => {
    return avatarInfo.amIOwner && avatarInfo.targetRoomControllerLevel < RoomControllerLevel.GUEST && !avatarInfo.isGuildRoom;
  }, [avatarInfo]);

  const isShowRemoveRights = useMemo(() => {
    return avatarInfo.amIOwner && avatarInfo.targetRoomControllerLevel === RoomControllerLevel.GUEST && !avatarInfo.isGuildRoom;
  }, [avatarInfo]);

  const moderateMenuHasContent = useMemo(() => {
    return avatarInfo.canBeKicked || avatarInfo.canBeBanned || avatarInfo.canBeMuted || isShowGiveRights || isShowRemoveRights;
  }, [isShowGiveRights, isShowRemoveRights, avatarInfo]);

  const canGiveHandItem = useMemo(() => {
    let flag = false;

    const roomObject = GetOwnRoomObject();

    if (roomObject) {
      const carryId = roomObject.model.getValue<number>(RoomObjectVariable.FIGURE_CARRY_OBJECT);

      if (carryId > 0 && carryId < 999999) flag = true;
    }

    return flag;
  }, []);

  const processAction = (name: string) => {
    let hideMenu = true;

    if (name) {
      switch (name) {
        case "heal":
          hideMenu = false;
          SendMessageComposer(new HealComposer(avatarInfo?.webID));
          break;
        case "moderate":
          hideMenu = false;
          setMode(MODE_MODERATE);
          break;
        case "ban":
          hideMenu = false;
          setMode(MODE_MODERATE_BAN);
          break;
        case "mute":
          hideMenu = false;
          setMode(MODE_MODERATE_MUTE);
          break;
        case "ambassador":
          hideMenu = false;
          setMode(MODE_AMBASSADOR);
          break;
        case "ambassador_mute":
          hideMenu = false;
          setMode(MODE_AMBASSADOR_MUTE);
          break;
        case "back_moderate":
          hideMenu = false;
          setMode(MODE_MODERATE);
          break;
        case "back_ambassador":
          hideMenu = false;
          setMode(MODE_AMBASSADOR);
          break;
        case "back":
          hideMenu = false;
          setMode(MODE_NORMAL);
          break;
        case "whisper":
          DispatchUiEvent(new RoomWidgetUpdateChatInputContentEvent(RoomWidgetUpdateChatInputContentEvent.WHISPER, avatarInfo.name));
          break;
        case "friend":
          CreateLinkEvent(`friends/request/${avatarInfo.webID}/${avatarInfo.name}`);
          break;
        case "relationship":
          hideMenu = false;
          setMode(MODE_RELATIONSHIP);
          break;
        case "respect": {
          respectUser(avatarInfo.webID);

          if (userRespectRemaining - 1 >= 1) hideMenu = false;
          break;
        }
        case "ignore":
          GetSessionDataManager().ignoreUser(avatarInfo.name);
          break;
        case "unignore":
          GetSessionDataManager().unignoreUser(avatarInfo.name);
          break;
        case "kick":
          roomSession.sendKickMessage(avatarInfo.webID);
          break;
        case "ban_hour":
          roomSession.sendBanMessage(avatarInfo.webID, "RWUAM_BAN_USER_HOUR");
          break;
        case "ban_day":
          roomSession.sendBanMessage(avatarInfo.webID, "RWUAM_BAN_USER_DAY");
          break;
        case "perm_ban":
          roomSession.sendBanMessage(avatarInfo.webID, "RWUAM_BAN_USER_PERM");
          break;
        case "mute_2min":
          roomSession.sendMuteMessage(avatarInfo.webID, 2);
          break;
        case "mute_5min":
          roomSession.sendMuteMessage(avatarInfo.webID, 5);
          break;
        case "mute_10min":
          roomSession.sendMuteMessage(avatarInfo.webID, 10);
          break;
        case "give_rights":
          roomSession.sendGiveRightsMessage(avatarInfo.webID);
          break;
        case "remove_rights":
          roomSession.sendTakeRightsMessage(avatarInfo.webID);
          break;
        case "trade":
          SendMessageComposer(new TradingOpenComposer(avatarInfo.roomIndex));
          break;
        case "report":
          report(ReportType.BULLY, { reportedUserId: avatarInfo.webID });
          break;
        case "pass_hand_item":
          SendMessageComposer(new RoomUnitGiveHandItemComposer(avatarInfo.webID));
          break;
        case "ambassador_alert":
          roomSession.sendAmbassadorAlertMessage(avatarInfo.webID);
          break;
        case "ambassador_kick":
          roomSession.sendKickMessage(avatarInfo.webID);
          break;
        case "ambassador_mute_2min":
          roomSession.sendMuteMessage(avatarInfo.webID, 2);
          break;
        case "ambassador_mute_10min":
          roomSession.sendMuteMessage(avatarInfo.webID, 10);
          break;
        case "ambassador_mute_60min":
          roomSession.sendMuteMessage(avatarInfo.webID, 60);
          break;
        case "ambassador_mute_18hour":
          roomSession.sendMuteMessage(avatarInfo.webID, 1080);
          break;
        case "rship_heart":
          SendMessageComposer(new SetRelationshipStatusComposer(avatarInfo.webID, MessengerFriend.RELATIONSHIP_HEART));
          break;
        case "rship_smile":
          SendMessageComposer(new SetRelationshipStatusComposer(avatarInfo.webID, MessengerFriend.RELATIONSHIP_SMILE));
          break;
        case "rship_bobba":
          SendMessageComposer(new SetRelationshipStatusComposer(avatarInfo.webID, MessengerFriend.RELATIONSHIP_BOBBA));
          break;
        case "rship_none":
          SendMessageComposer(new SetRelationshipStatusComposer(avatarInfo.webID, MessengerFriend.RELATIONSHIP_NONE));
          break;
        case "view_corp":
          setMode(MODE_CORP);
          hideMenu = false;
          break;
      }
    }

    if (hideMenu) onClose();
  };

  useEffect(() => {
    setMode(MODE_NORMAL);
  }, [avatarInfo]);

  return (
    <ContextMenuView objectId={avatarInfo.roomIndex} category={RoomObjectCategory.UNIT} userType={avatarInfo.userType} onClose={onClose} collapsable={true}>
      <ContextMenuHeaderView className="cursor-pointer" onClick={() => GetUserProfile(avatarInfo.webID)}>
        {avatarInfo.name}
      </ContextMenuHeaderView>
      {mode === MODE_NORMAL && (
        <>
          <ContextMenuListItemView onClick={() => processAction("heal")}>{LocalizeText("infostand.button.heal")}</ContextMenuListItemView>{" "}
          <ContextMenuListItemView onClick={() => processAction("view_corp")}>
            Work
            <FaChevronRight className="right fa-icon" />
          </ContextMenuListItemView>
          {canRequestFriend(avatarInfo.webID) && (
            <ContextMenuListItemView onClick={() => processAction("friend")}>{LocalizeText("infostand.button.friend")}</ContextMenuListItemView>
          )}
          <ContextMenuListItemView onClick={() => processAction("trade")}>{LocalizeText("infostand.button.trade")}</ContextMenuListItemView>
          <ContextMenuListItemView onClick={() => processAction("whisper")}>{LocalizeText("infostand.button.whisper")}</ContextMenuListItemView>
          {userRespectRemaining > 0 && (
            <ContextMenuListItemView onClick={() => processAction("respect")}>
              {LocalizeText("infostand.button.respect", ["count"], [userRespectRemaining.toString()])}
            </ContextMenuListItemView>
          )}
          {!canRequestFriend(avatarInfo.webID) && (
            <ContextMenuListItemView onClick={() => processAction("relationship")}>
              {LocalizeText("infostand.link.relationship")}
              <FaChevronRight className="right fa-icon" />
            </ContextMenuListItemView>
          )}
          {!avatarInfo.isIgnored && (
            <ContextMenuListItemView onClick={() => processAction("ignore")}>{LocalizeText("infostand.button.ignore")}</ContextMenuListItemView>
          )}
          {avatarInfo.isIgnored && (
            <ContextMenuListItemView onClick={() => processAction("unignore")}>{LocalizeText("infostand.button.unignore")}</ContextMenuListItemView>
          )}
          <ContextMenuListItemView onClick={() => processAction("report")}>{LocalizeText("infostand.button.report")}</ContextMenuListItemView>
          {moderateMenuHasContent && (
            <ContextMenuListItemView onClick={() => processAction("moderate")}>
              <FaChevronRight className="right fa-icon" />
              {LocalizeText("infostand.link.moderate")}
            </ContextMenuListItemView>
          )}
          {avatarInfo.isAmbassador && (
            <ContextMenuListItemView onClick={() => processAction("ambassador")}>
              <FaChevronRight className="right fa-icon" />
              {LocalizeText("infostand.link.ambassador")}
            </ContextMenuListItemView>
          )}
          {canGiveHandItem && (
            <ContextMenuListItemView onClick={() => processAction("pass_hand_item")}>{LocalizeText("avatar.widget.pass_hand_item")}</ContextMenuListItemView>
          )}
        </>
      )}
      {mode === MODE_MODERATE && (
        <>
          <ContextMenuListItemView onClick={() => processAction("kick")}>{LocalizeText("infostand.button.kick")}</ContextMenuListItemView>
          <ContextMenuListItemView onClick={() => processAction("mute")}>
            <FaChevronRight className="right fa-icon" />
            {LocalizeText("infostand.button.mute")}
          </ContextMenuListItemView>
          <ContextMenuListItemView onClick={() => processAction("ban")}>
            <FaChevronRight className="right fa-icon" />
            {LocalizeText("infostand.button.ban")}
          </ContextMenuListItemView>
          {isShowGiveRights && (
            <ContextMenuListItemView onClick={() => processAction("give_rights")}>{LocalizeText("infostand.button.giverights")}</ContextMenuListItemView>
          )}
          {isShowRemoveRights && (
            <ContextMenuListItemView onClick={() => processAction("remove_rights")}>{LocalizeText("infostand.button.removerights")}</ContextMenuListItemView>
          )}
          <ContextMenuListItemView onClick={() => processAction("back")}>
            <FaChevronLeft className="left fa-icon" />
            {LocalizeText("generic.back")}
          </ContextMenuListItemView>
        </>
      )}
      {mode === MODE_MODERATE_BAN && (
        <>
          <ContextMenuListItemView onClick={() => processAction("ban_hour")}>{LocalizeText("infostand.button.ban_hour")}</ContextMenuListItemView>
          <ContextMenuListItemView onClick={() => processAction("ban_day")}>{LocalizeText("infostand.button.ban_day")}</ContextMenuListItemView>
          <ContextMenuListItemView onClick={() => processAction("perm_ban")}>{LocalizeText("infostand.button.perm_ban")}</ContextMenuListItemView>
          <ContextMenuListItemView onClick={() => processAction("back_moderate")}>
            <FaChevronLeft className="left fa-icon" />
            {LocalizeText("generic.back")}
          </ContextMenuListItemView>
        </>
      )}
      {mode === MODE_MODERATE_MUTE && (
        <>
          <ContextMenuListItemView onClick={() => processAction("mute_2min")}>{LocalizeText("infostand.button.mute_2min")}</ContextMenuListItemView>
          <ContextMenuListItemView onClick={() => processAction("mute_5min")}>{LocalizeText("infostand.button.mute_5min")}</ContextMenuListItemView>
          <ContextMenuListItemView onClick={() => processAction("mute_10min")}>{LocalizeText("infostand.button.mute_10min")}</ContextMenuListItemView>
          <ContextMenuListItemView onClick={() => processAction("back_moderate")}>
            <FaChevronLeft className="left fa-icon" />
            {LocalizeText("generic.back")}
          </ContextMenuListItemView>
        </>
      )}
      {mode === MODE_AMBASSADOR && (
        <>
          <ContextMenuListItemView onClick={() => processAction("ambassador_alert")}>{LocalizeText("infostand.button.alert")}</ContextMenuListItemView>
          <ContextMenuListItemView onClick={() => processAction("ambassador_kick")}>{LocalizeText("infostand.button.kick")}</ContextMenuListItemView>
          <ContextMenuListItemView onClick={() => processAction("ambassador_mute")}>
            {LocalizeText("infostand.button.mute")}
            <FaChevronRight className="right fa-icon" />
          </ContextMenuListItemView>
          <ContextMenuListItemView onClick={() => processAction("back")}>
            <FaChevronLeft className="left fa-icon" />
            {LocalizeText("generic.back")}
          </ContextMenuListItemView>
        </>
      )}
      {mode === MODE_AMBASSADOR_MUTE && (
        <>
          <ContextMenuListItemView onClick={() => processAction("ambassador_mute_2min")}>{LocalizeText("infostand.button.mute_2min")}</ContextMenuListItemView>
          <ContextMenuListItemView onClick={() => processAction("ambassador_mute_10min")}>
            {LocalizeText("infostand.button.mute_10min")}
          </ContextMenuListItemView>
          <ContextMenuListItemView onClick={() => processAction("ambassador_mute_60min")}>
            {LocalizeText("infostand.button.mute_60min")}
          </ContextMenuListItemView>
          <ContextMenuListItemView onClick={() => processAction("ambassador_mute_18hr")}>
            {LocalizeText("infostand.button.mute_18hour")}
          </ContextMenuListItemView>
          <ContextMenuListItemView onClick={() => processAction("back_ambassador")}>
            <FaChevronLeft className="left fa-icon" />
            {LocalizeText("generic.back")}
          </ContextMenuListItemView>
        </>
      )}
      {mode === MODE_RELATIONSHIP && (
        <>
          <Flex className="menu-list-split-3">
            <ContextMenuListItemView onClick={() => processAction("rship_heart")}>
              <Base pointer className="nitro-friends-spritesheet icon-heart" />
            </ContextMenuListItemView>
            <ContextMenuListItemView onClick={() => processAction("rship_smile")}>
              <Base pointer className="nitro-friends-spritesheet icon-smile" />
            </ContextMenuListItemView>
            <ContextMenuListItemView onClick={() => processAction("rship_bobba")}>
              <Base pointer className="nitro-friends-spritesheet icon-bobba" />
            </ContextMenuListItemView>
          </Flex>
          <ContextMenuListItemView onClick={() => processAction("rship_none")}>{LocalizeText("avatar.widget.clear_relationship")}</ContextMenuListItemView>
          <ContextMenuListItemView onClick={() => processAction("back")}>
            <FaChevronLeft className="left fa-icon" />
            {LocalizeText("generic.back")}
          </ContextMenuListItemView>
        </>
      )}
      {mode === MODE_CORP && (
        <>
          {myCharacter?.isWorking && myRole?.canHire && (
            <ContextMenuListItemView onClick={() => SendMessageComposer(new CorpOfferUserJobComposer(avatarInfo.webID, 1, 1))}>
              Offer Job
            </ContextMenuListItemView>
          )}
          {myCharacter?.isWorking && myRole?.canFire && myRole?.orderId > avatarRole?.orderId && (
            <ContextMenuListItemView onClick={() => SendMessageComposer(new CorpFireUserComposer(avatarInfo.webID))}>Fire</ContextMenuListItemView>
          )}
          {myCharacter?.isWorking && myRole?.canPromote && myRole?.orderId > avatarRole?.orderId && avatarRole?.orderId < avatarCorpRoles.length && (
            <ContextMenuListItemView onClick={() => SendMessageComposer(new CorpPromoteUserComposer(avatarInfo.webID))}>Promote</ContextMenuListItemView>
          )}
          {myCharacter?.isWorking && myRole?.canDemote && myRole?.orderId > avatarRole?.orderId && avatarRole?.orderId > 1 && (
            <ContextMenuListItemView onClick={() => SendMessageComposer(new CorpDemoteUserComposer(avatarInfo.webID))}>Demote</ContextMenuListItemView>
          )}
          <ContextMenuListItemView onClick={() => processAction("back")}>
            <FaChevronLeft className="left fa-icon" />
            {LocalizeText("generic.back")}
          </ContextMenuListItemView>
        </>
      )}
    </ContextMenuView>
  );
};
