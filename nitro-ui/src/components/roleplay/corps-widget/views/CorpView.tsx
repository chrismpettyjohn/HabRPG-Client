import { FaPencilAlt } from "react-icons/fa";
import { CreateLinkEvent } from "../../../../api";
import { LayoutAvatarImageView, Text } from "../../../../common";
import { useCorpById } from "../../../../hooks/roleplay/useCorpById";
import { LoadingIcon } from "../../../loading-icon/LoadingIcon";
import { useCorpRoleListByCorp } from "../../../../hooks/roleplay/useCorpRoleListByCorp";
import { useCorpMemberListByCorp } from "../../../../hooks/roleplay/useCorpMemberListByCorp";
import { useSessionInfo } from "../../../../hooks";
import { useMemo } from "react";
import { CorpMemberListData, CorpRoleListData } from "@nitrots/nitro-renderer";

export interface CorpViewProps {
  corpId: number;
}

export function CorpView({ corpId }: CorpViewProps) {
  const { userInfo } = useSessionInfo();
  const corp = useCorpById(corpId);
  const corpRoles = useCorpRoleListByCorp(corpId);
  const corpMembers = useCorpMemberListByCorp(corpId);

  const displayedCorpRoles: Array<{ role: CorpRoleListData; members: CorpMemberListData[] }> = useMemo(() => {
    return corpRoles.map((role) => {
      return {
        role,
        members: corpMembers.filter((m) => m.corpRoleId === role.id),
      };
    });
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
      <div className="corp-header">
        <Text bold fontSize={3}>
          {corp?.name}
        </Text>
      </div>
      <br />
      {displayedCorpRoles.length ? (
        displayedCorpRoles.map((displayedRole) => (
          <div key={`role_${displayedRole.role.id}`}>
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
              <p style={{ marginTop: 14 }}>No employees found</p>
            )}
          </div>
        ))
      ) : (
        <p>No roles found</p>
      )}
    </div>
  );
}
