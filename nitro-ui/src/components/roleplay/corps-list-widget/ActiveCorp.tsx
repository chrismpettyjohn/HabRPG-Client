import { CorpData } from "@nitrots/nitro-renderer";
import { LayoutAvatarImageView, Text } from "../../../common";

export interface ActiveCorpProps {
  corp: CorpData;
}

export function ActiveCorp({ corp }: ActiveCorpProps) {
  return (
    <div className="corp-info-widget">
      <div className="corp-header">
        <Text bold fontSize={3}>
          {corp.name}
        </Text>
        <div className="corp-chip">$25,000 stock</div>
      </div>
      <br />
      <div className="corp-header">
        <Text bold fontSize={3}>
          Employees
        </Text>
        <div className="corp-chip">2 employees</div>
      </div>
      <div className="corp-users">
        {Array.from({ length: 200 }).map((_, i) => (
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
