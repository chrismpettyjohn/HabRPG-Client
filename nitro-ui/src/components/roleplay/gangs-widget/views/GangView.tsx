import { FaPencilAlt } from "react-icons/fa";
import { CreateLinkEvent } from "../../../../api";
import { LayoutAvatarImageView, Text } from "../../../../common";
import { useGangById } from "../../../../hooks/roleplay/useGangById";
import { LoadingIcon } from "../../../loading-icon/LoadingIcon";
import { useGangRoleListByGang } from "../../../../hooks/roleplay/useGangRoleListByGang";
import { useGangMemberListByGang } from "../../../../hooks/roleplay/useGangMemberListByGang";
import { useSessionInfo } from "../../../../hooks";

export interface GangViewProps {
  gangId: number;
}

export function GangView({ gangId }: GangViewProps) {
  const { userInfo } = useSessionInfo();
  const gang = useGangById(gangId);
  const gangRoles = useGangRoleListByGang(gangId);
  const gangMembers = useGangMemberListByGang(gangId);

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
      <div className="gang-header">
        <Text bold fontSize={3}>
          {gang?.name}
        </Text>
      </div>
      <br />
      <div className="gang-header">
        <Text bold fontSize={3}>
          Members
        </Text>
        <div style={{ display: "flex", gap: 14 }}>
          <div className="gang-chip">{gangMembers.length} members</div>
        </div>
      </div>
      {gangMembers.length ? (
        <div className="corp-users">
          {gangMembers.map((_) => (
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
  );
}
