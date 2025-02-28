import { useEffect, useState } from "react";
import { AddEventLinkTracker, RemoveLinkEventTracker } from "../../../api";
import { GangData, ILinkEventTracker } from "@nitrots/nitro-renderer";
import { Column, Grid, NitroCardContentView, NitroCardHeaderView, NitroCardView, Text } from "../../../common";
import { ActiveGang } from "./ActiveGang";
import { useGangList } from "../../../hooks/roleplay/useGangList";
import { FaInfoCircle } from "react-icons/fa";

export function GangsListWidget() {
  const [visible, setVisible] = useState(false);
  const gangs = useGangList();
  const [gang, setGang] = useState<GangData>();

  useEffect(() => {
    if (gang || !gangs.length) {
      return;
    }
    setGang(gangs[0]);
  }, [gang, gangs]);

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
    <NitroCardView uniqueKey="nitro-corps-list" theme="primary-slim" style={{ width: 625, height: 300 }}>
      <NitroCardHeaderView headerText="Gangs" onCloseClick={() => setVisible(false)} />
      <NitroCardContentView overflow="hidden">
        <Grid>
          {gang ? (
            <>
              <Column size={2}>
                <Column size={2} style={{ height: "100%" }}>
                  <div className="corps-list-widget">
                    {gangs.map((_) => (
                      <div className={`corp ${gang?.id === _.id ? "active" : ""}`} key={`gang_${_.id}`} onClick={() => setGang(_)}>
                        <img
                          src="https://swfs.habcrab.com/c_images/album1584/ADM.gif"
                          style={{ objectFit: "contain", height: 30, width: 30, imageRendering: "pixelated" }}
                        />
                      </div>
                    ))}
                  </div>
                </Column>
              </Column>
              <Column size={10}>
                <ActiveGang gang={gang} />
              </Column>
            </>
          ) : (
            <Column size={12} style={{ alignItems: "center", display: "flex", flex: 1, flexDirection: "column", gap: 14, justifyContent: "center" }}>
              <FaInfoCircle style={{ fontSize: 32 }} />
              <Text bold>{gangs.length ? "Select a gang from the left" : "There are no gangs!"}</Text>
            </Column>
          )}
        </Grid>
      </NitroCardContentView>
    </NitroCardView>
  );
}
