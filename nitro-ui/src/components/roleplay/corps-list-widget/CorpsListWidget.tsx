import { useEffect, useState } from "react";
import { AddEventLinkTracker, RemoveLinkEventTracker } from "../../../api";
import { Column, Grid, NitroCardContentView, NitroCardHeaderView, NitroCardView, Text } from "../../../common";
import { ActiveCorp } from "./ActiveCorp";
import { CorpData } from "@nitrots/nitro-renderer";
import { useCorpList } from "../../../hooks/roleplay/useCorpList";

export function CorpsListWidget() {
  const [visible, setVisible] = useState(false);
  const corps = useCorpList();
  const [corp, setCorp] = useState<CorpData>();

  useEffect(() => {
    const linkTracker = {
      linkReceived: (url) => {
        const parts = url.split("/");
        if (parts.length < 3) return;
        if (parts[2] === "toggle") setVisible((prev) => !prev);
      },
      eventUrlPrefix: "corps/list/",
    };
    AddEventLinkTracker(linkTracker);
    return () => RemoveLinkEventTracker(linkTracker);
  }, [visible]);

  if (!visible) return null;

  return (
    <NitroCardView uniqueKey="nitro-corps-list" theme="primary-slim" style={{ width: 450, height: 334 }}>
      <NitroCardHeaderView headerText="Corps" onCloseClick={() => setVisible(false)} />
      <NitroCardContentView overflow="hidden">
        <Grid>
          <Column size={2} style={{ height: "100%" }}>
            <div className="corps-list-widget">
              {corps.map((_) => (
                <div className="corp" key={`corp_${_.id}`}>
                  <img
                    src="https://swfs.habcrab.com/c_images/album1584/ADM.gif"
                    style={{ objectFit: "contain", height: 30, width: 30, imageRendering: "pixelated" }}
                  />{" "}
                  <Text bold fontSize={5}>
                    {_.name}
                  </Text>
                </div>
              ))}
            </div>
          </Column>
          <Column size={1} />
          <Column size={9}>
            <ActiveCorp corp={{ id: 1, name: "" }} />
          </Column>
        </Grid>
      </NitroCardContentView>
    </NitroCardView>
  );
}
