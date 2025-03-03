import { FaCaretDown, FaCaretUp, FaPencilAlt } from "react-icons/fa";
import { CreateLinkEvent, SendMessageComposer } from "../../../../api";
import { LayoutAvatarImageView, Text } from "../../../../common";
import { useGangById } from "../../../../hooks/roleplay/useGangById";
import { LoadingIcon } from "../../../loading-icon/LoadingIcon";
import { useGangRoleListByGang } from "../../../../hooks/roleplay/useGangRoleListByGang";
import { useGangMemberListByGang } from "../../../../hooks/roleplay/useGangMemberListByGang";
import { useCharacter, useSessionInfo } from "../../../../hooks";
import { useMemo } from "react";
import { GangDemoteUserComposer, GangMemberListData, GangPromoteUserComposer, GangRoleListData } from "@nitrots/nitro-renderer";
import { useGangRoleById } from "../../../../hooks/roleplay/useGangRoleById";

export interface GangViewProps {
  gangId: number;
}

export function GangView({ gangId }: GangViewProps) {
  const { userInfo } = useSessionInfo();
  const gang = useGangById(gangId);
  const gangRoles = useGangRoleListByGang(gangId);
  const gangMembers = useGangMemberListByGang(gangId);

  const myCharacter = useCharacter(userInfo?.userId);
  const myRole = useGangRoleById(myCharacter?.gangRoleId);

  const displayedGangRoles: Array<{ role: GangRoleListData; members: GangMemberListData[] }> = useMemo(() => {
    return gangRoles
      .slice()
      .sort((a, b) => a.orderId - b.orderId)
      .map((role) => ({
        role,
        members: gangMembers.filter((m) => m.gangRoleId === role.id),
      }));
  }, [gangRoles, gangMembers]);

  if (!gang) {
    return <LoadingIcon>Loading gang {gangId}</LoadingIcon>;
  }

  return (
    <div className="gang-info-widget">
      <div style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
        {gang?.userId === userInfo?.userId ? (
          <div className="gang-chip" onClick={() => CreateLinkEvent(`gangs/edit/${gangId}`)} style={{ cursor: "pointer" }}>
            <FaPencilAlt style={{ marginRight: 8 }} />
            Edit
          </div>
        ) : (
          ""
        )}
      </div>
      <br />
      <Text bold fontSize={2}>
        {gang?.name}
      </Text>
      <br />
      <Text bold fontSize={6}>
        Our mission
      </Text>
      <textarea className="form-control" value={gang?.description} rows={2} readOnly disabled />
      <br />
      {displayedGangRoles.length ? (
        displayedGangRoles.map((displayedRole) => {
          const canPromote =
            myCharacter?.isWorking &&
            myRole?.canPromote &&
            myRole?.orderId > displayedRole.role.orderId &&
            displayedRole.role.orderId < displayedGangRoles.length;
          const canDemote = myCharacter?.isWorking && myRole?.canDemote && myRole?.orderId > displayedRole.role.orderId && displayedRole.role.orderId > 1;
          return (
            <div key={`role_${displayedRole.role.id}`} style={{ marginBottom: 14 }}>
              <div className="gang-header">
                <Text bold fontSize={3}>
                  {displayedRole.role.name}
                </Text>
                <div style={{ display: "flex", gap: 14 }}>
                  <div className="gang-chip">{displayedRole.members.length} employees</div>
                </div>
              </div>
              {displayedRole.members.length ? (
                <div className="gang-users">
                  {displayedRole.members.map((user) => (
                    <div className="user" key={`user_${user.userId}`}>
                      <div className="avatar">
                        <LayoutAvatarImageView figure={user.look} direction={2} headOnly style={{ marginTop: -25 }} />
                      </div>
                      <div className="actions">
                        {canDemote ? <FaCaretDown className="action" onClick={() => SendMessageComposer(new GangDemoteUserComposer(user.userId))} /> : ""}
                        {canPromote ? <FaCaretUp className="action" onClick={() => SendMessageComposer(new GangPromoteUserComposer(user.userId))} /> : ""}
                      </div>
                      <Text bold fontSize={6}>
                        {user.username}
                      </Text>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ marginTop: 14 }}>No employees found</p>
              )}
            </div>
          );
        })
      ) : (
        <p>No roles found</p>
      )}
    </div>
  );
}
