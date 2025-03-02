import { FaPencilAlt } from "react-icons/fa";
import { CreateLinkEvent } from "../../../../api";
import { LayoutAvatarImageView, Text } from "../../../../common";
import { useGangById } from "../../../../hooks/roleplay/useGangById";
import { LoadingIcon } from "../../../loading-icon/LoadingIcon";

export interface GangViewProps {
  gangId: number;
}

export function GangView({ gangId }: GangViewProps) {
  const gang = useGangById(gangId);

  if (!gang) {
    return <LoadingIcon>Loading gang {gangId}</LoadingIcon>;
  }

  return (
    <div className="gang-info-widget">
      <div style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
        <div className="gang-chip" onClick={() => CreateLinkEvent(`gangs/edit/${gangId}`)} style={{ cursor: "pointer" }}>
          <FaPencilAlt style={{ marginRight: 8 }} />
          Edit
        </div>
      </div>
      <br />
      <div className="gang-header">
        <Text bold fontSize={3}>
          {gang?.name}
        </Text>
        <div className="gang-chip">$25,000 stock</div>
      </div>
      <br />
      <div className="gang-header">
        <Text bold fontSize={3}>
          Employees
        </Text>
        <div style={{ display: "flex", gap: 14 }}>
          <div className="gang-chip">2 employees</div>
        </div>
      </div>
      <div className="gang-users">
        {Array.from({ length: 10 }).map((_, i) => (
          <div className="user" key={`user_${i}`}>
            <div className="avatar">
              <LayoutAvatarImageView
                figure="sh-3035-110.hr-170-61.hd-205-1380.ch-255-1428.he-1609-110.lg-285-110.ha-1002-1428.cc-5829-110"
                direction={2}
                headOnly
                style={{ marginTop: -25 }}
              />
            </div>
            <Text bold fontSize={6}>
              Bobman{i}
            </Text>
          </div>
        ))}
      </div>
    </div>
  );
}
