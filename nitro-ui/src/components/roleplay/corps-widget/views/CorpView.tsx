import { FaPencilAlt } from "react-icons/fa";
import { CreateLinkEvent } from "../../../../api";
import { LayoutAvatarImageView, Text } from "../../../../common";
import { useCorpById } from "../../../../hooks/roleplay/useCorpById";
import { LoadingIcon } from "../../../loading-icon/LoadingIcon";

export interface CorpViewProps {
  corpId: number;
}

export function CorpView({ corpId }: CorpViewProps) {
  const corp = useCorpById(corpId);

  if (!corp) {
    return <LoadingIcon>Loading corp {corpId}</LoadingIcon>;
  }

  return (
    <div className="corp-info-widget">
      <div style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
        <div className="corp-chip" onClick={() => CreateLinkEvent(`corps/edit/${corpId}`)} style={{ cursor: "pointer" }}>
          <FaPencilAlt style={{ marginRight: 8 }} />
          Edit
        </div>
      </div>
      <br />
      <div className="corp-header">
        <Text bold fontSize={3}>
          {corp?.name}
        </Text>
        <div className="corp-chip">$25,000 stock</div>
      </div>
      <br />
      <div className="corp-header">
        <Text bold fontSize={3}>
          Employees
        </Text>
        <div style={{ display: "flex", gap: 14 }}>
          <div className="corp-chip">2 employees</div>
        </div>
      </div>
      <div className="corp-users">
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
