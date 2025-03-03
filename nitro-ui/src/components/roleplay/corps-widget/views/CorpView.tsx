import { FaCaretDown, FaCaretUp, FaPencilAlt } from "react-icons/fa";
import { CreateLinkEvent, SendMessageComposer } from "../../../../api";
import { LayoutAvatarImageView, Text } from "../../../../common";
import { useCorpById } from "../../../../hooks/roleplay/useCorpById";
import { LoadingIcon } from "../../../loading-icon/LoadingIcon";
import { useCorpRoleListByCorp } from "../../../../hooks/roleplay/useCorpRoleListByCorp";
import { useCorpMemberListByCorp } from "../../../../hooks/roleplay/useCorpMemberListByCorp";
import { useCharacter, useSessionInfo } from "../../../../hooks";
import { useMemo } from "react";
import { CorpDemoteUserComposer, CorpMemberListData, CorpPromoteUserComposer, CorpRoleListData } from "@nitrots/nitro-renderer";
import { useCorpRoleById } from "../../../../hooks/roleplay/useCorpRoleById";

export interface CorpViewProps {
  corpId: number;
}

export function CorpView({ corpId }: CorpViewProps) {
  const { userInfo } = useSessionInfo();
  const corp = useCorpById(corpId);
  const corpRoles = useCorpRoleListByCorp(corpId);
  const corpMembers = useCorpMemberListByCorp(corpId);

  const myCharacter = useCharacter(userInfo?.userId);
  const myRole = useCorpRoleById(myCharacter?.corpRoleId);

  const displayedCorpRoles: Array<{ role: CorpRoleListData; members: CorpMemberListData[] }> = useMemo(() => {
    return corpRoles
      .slice()
      .sort((a, b) => a.orderId - b.orderId)
      .map((role) => ({
        role,
        members: corpMembers.filter((m) => m.corpRoleId === role.id),
      }));
  }, [corpRoles, corpMembers]);

  if (!corp) {
    return <LoadingIcon>Loading corp {corpId}</LoadingIcon>;
  }

  return (
    <div className="corp-info-widget">
      <div style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
        {corp?.userId === userInfo?.userId ? (
          <div className="corp-chip" onClick={() => CreateLinkEvent(`corps/edit/${corpId}`)} style={{ cursor: "pointer" }}>
            <FaPencilAlt style={{ marginRight: 8 }} />
            Edit
          </div>
        ) : (
          ""
        )}
      </div>
      <br />
      <Text bold fontSize={2}>
        {corp?.name}
      </Text>
      <br />
      <Text bold fontSize={6}>
        Our mission
      </Text>
      <textarea className="form-control" value={corp?.description} rows={2} readOnly disabled />
      <br />
      {displayedCorpRoles.length ? (
        displayedCorpRoles.map((displayedRole) => {
          const canPromote =
            myCharacter?.isWorking &&
            myRole?.canPromote &&
            myRole?.orderId > displayedRole.role.orderId &&
            displayedRole.role.orderId < displayedCorpRoles.length;
          const canDemote = myCharacter?.isWorking && myRole?.canDemote && myRole?.orderId > displayedRole.role.orderId && displayedRole.role.orderId > 1;
          return (
            <div key={`role_${displayedRole.role.id}`} style={{ marginBottom: 14 }}>
              <div className="corp-header">
                <Text bold fontSize={3}>
                  {displayedRole.role.name}
                </Text>
                <div style={{ display: "flex", gap: 14 }}>
                  <div className="corp-chip">{displayedRole.members.length} employees</div>
                </div>
              </div>
              {displayedRole.members.length ? (
                <div className="corp-users">
                  {displayedRole.members.map((user) => (
                    <div className="user" key={`user_${user.userId}`}>
                      <div className="avatar">
                        <LayoutAvatarImageView figure={user.look} direction={2} headOnly style={{ marginTop: -25 }} />
                      </div>
                      <div className="actions">
                        {canDemote ? <FaCaretDown className="action" onClick={() => SendMessageComposer(new CorpDemoteUserComposer(user.userId))} /> : ""}
                        {canPromote ? <FaCaretUp className="action" onClick={() => SendMessageComposer(new CorpPromoteUserComposer(user.userId))} /> : ""}
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
