import { useEffect, useState } from "react";
import { AddEventLinkTracker, RemoveLinkEventTracker } from "../../../api";
import { GangData, ILinkEventTracker } from "@nitrots/nitro-renderer";
import { Column, Grid, NitroCardContentView, NitroCardHeaderView, NitroCardView, Text } from "../../../common";
import { ActiveGang } from "./ActiveGang";
import { useGangList } from "../../../hooks/roleplay/useGangList";

export function GangsListWidget() {
  const [visible, setVisible] = useState(false);
  const gangs = useGangList();
  const [gang, setGang] = useState<GangData>();

  useEffect(() => {
    const linkTracker: ILinkEventTracker = {
      linkReceived: (url: string) => {
        const parts = url.split("/");

        if (parts.length < 3) return;

        switch (parts[2]) {
          case "toggle": {
            setVisible((_) => !_);
            return;
          }
        }
      },
      eventUrlPrefix: "gangs/list/",
    };

    AddEventLinkTracker(linkTracker);

    return () => RemoveLinkEventTracker(linkTracker);
  }, [visible]);

  if (!visible) return null;

  return (
    <NitroCardView uniqueKey="nitro-corps-list" theme="primary-slim" style={{ width: 450, height: 250 }}>
      <NitroCardHeaderView headerText="Gangs" onCloseClick={() => setVisible(false)} />
      <NitroCardContentView overflow="hidden">
        <Grid>
          <Column size={2} style={{ height: "100%" }}>
            <div className="corps-list-widget">
              {gangs.map((_) => (
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
            <ActiveGang gang={{ id: 1, name: "" }} />
          </Column>
        </Grid>
      </NitroCardContentView>
    </NitroCardView>
  );
}
