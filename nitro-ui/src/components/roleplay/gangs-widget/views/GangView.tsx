import { FaPencilAlt } from "react-icons/fa";
import { CreateLinkEvent } from "../../../../api";
import { LayoutAvatarImageView, Text } from "../../../../common";
import { useGangById } from "../../../../hooks/roleplay/useGangById";
import { LoadingIcon } from "../../../loading-icon/LoadingIcon";
import { useGangRoleListByGang } from "../../../../hooks/roleplay/useGangRoleListByGang";
import { useGangMemberListByGang } from "../../../../hooks/roleplay/useGangMemberListByGang";
import { useSessionInfo } from "../../../../hooks";
import { GangMemberListData, GangRoleData, GangRoleListData } from "@nitrots/nitro-renderer";
import { useMemo } from "react";

export interface GangViewProps {
  gangId: number;
}

export function GangView({ gangId }: GangViewProps) {
  const { userInfo } = useSessionInfo();
  const gang = useGangById(gangId);
  const gangRoles = useGangRoleListByGang(gangId);
  const gangMembers = useGangMemberListByGang(gangId);

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
          <div className="corp-chip" onClick={() => CreateLinkEvent(`gangs/edit/${gangId}`)} style={{ cursor: "pointer" }}>
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
        What we do
      </Text>
      <textarea className="form-control" value={gang?.description} rows={2} readOnly disabled />
      <br />
      {displayedGangRoles.length ? (
        displayedGangRoles.map((displayedRole) => (
          <div key={`role_${displayedRole.role.id}`}>
            <div className="corp-header">
              <Text bold fontSize={3}>
                {displayedRole.role.name}
              </Text>
              <div style={{ display: "flex", gap: 14 }}>
                <div className="corp-chip">{displayedRole.members.length} members</div>
              </div>
            </div>
            {displayedRole.members.length ? (
              <div className="corp-users">
                {displayedRole.members.map((_) => (
                  <div className="user" key={`user_${_.userId}`}>
                    <div className="avatar">
                      <LayoutAvatarImageView figure={_.look} direction={2} headOnly style={{ marginTop: -25 }} />
                    </div>
                    <Text bold fontSize={6}>
                      {_.username}
                    </Text>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ marginTop: 14 }}>No members found</p>
            )}
          </div>
        ))
      ) : (
        <p>No roles found</p>
      )}
    </div>
  );
}
