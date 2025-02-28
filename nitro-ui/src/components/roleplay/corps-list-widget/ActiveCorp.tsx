import { CorpData } from "@nitrots/nitro-renderer";
import { LayoutAvatarImageView, Text } from "../../../common";

export interface ActiveCorpProps {
  corp: CorpData;
}

export function ActiveCorp({ corp }: ActiveCorpProps) {
  return (
    <div className="active-corp-widget">
      <div className="corp-header" style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <img src="https://swfs.habcrab.com/c_images/album1584/ADM.gif" style={{ objectFit: "contain", height: 52, width: 52, imageRendering: "pixelated" }} />
        <Text bold fontSize={2}>
          {corp.name}
        </Text>
      </div>
      <div className="corp-details" style={{ marginTop: 8 }}>
        <Text fontSize={3}>Members:&nbsp;</Text>
        <Text bold fontSize={3}>
          1
        </Text>
        <br />
        <Text fontSize={3}>Founded:&nbsp;</Text>
        <Text bold fontSize={3}>
          1/20/2025
        </Text>
        <div className="owner-info" style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 4 }}>
          <LayoutAvatarImageView figure="hr-170-39.hd-3092-1.ch-3185-1198.lg-3078-1336.sh-800001536-1198.wa-2007-62.ca-1809-62" direction={2} headOnly />
          <Text fontSize={2}>System</Text>
        </div>
      </div>
      <div className="corp-hierarchy-grid" style={{ marginTop: 8 }}>
        <div style={{ marginBottom: 8 }}>
          <Text bold fontSize={2}>
            Director
          </Text>
          <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginTop: 4 }}>
            <LayoutAvatarImageView figure="hr-170-39.hd-3092-1.ch-3185-1198.lg-3078-1336.sh-800001536-1198.wa-2007-62.ca-1809-62" direction={2} headOnly />
            <Text fontSize={1}> Admin</Text>
          </div>
        </div>
      </div>
    </div>
  );
}
