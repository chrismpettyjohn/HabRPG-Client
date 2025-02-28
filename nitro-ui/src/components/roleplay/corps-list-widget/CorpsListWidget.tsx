import { useEffect, useState } from "react";
import { AddEventLinkTracker, RemoveLinkEventTracker } from "../../../api";
import { Column, Grid, NitroCardContentView, NitroCardHeaderView, NitroCardView, Text } from "../../../common";
import { ActiveCorp } from "./ActiveCorp";
import { CorpData } from "@nitrots/nitro-renderer";
import { useCorpList } from "../../../hooks/roleplay/useCorpList";
import { FaInfoCircle, FaPlus } from "react-icons/fa";

export function CorpsListWidget() {
  const [visible, setVisible] = useState(false);
  const corps = useCorpList();
  const [corp, setCorp] = useState<CorpData>();

  useEffect(() => {
    if (corp || !corps.length) {
      return;
    }
    setCorp(corps[0]);
  }, [corp, corps]);

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
    <NitroCardView uniqueKey="nitro-corps-list" theme="primary-slim" style={{ width: 625, height: 400 }}>
      <NitroCardHeaderView headerText="Corps" onCloseClick={() => setVisible(false)} />
      <NitroCardContentView overflow="hidden">
        <Grid>
          {corp ? (
            <>
              <Column size={2}>
                <div className="corps-list-widget">
                  {corps.map((_) => (
                    <div className={`corp ${corp?.id === _.id ? "active" : ""}`} key={`corp_${_.id}`} onClick={() => setCorp(_)}>
                      <img
                        src="https://swfs.habcrab.com/c_images/album1584/ADM.gif"
                        style={{ objectFit: "contain", height: 30, width: 30, imageRendering: "pixelated" }}
                      />
                    </div>
                  ))}
                  <div className="corp">
                    <FaPlus />
                  </div>
                </div>
              </Column>
              <Column size={10}>
                <ActiveCorp corp={corp} />
              </Column>
            </>
          ) : (
            <Column size={12} style={{ alignItems: "center", display: "flex", flex: 1, flexDirection: "column", gap: 14, justifyContent: "center" }}>
              <FaInfoCircle style={{ fontSize: 32 }} />
              <br />
              <Text bold>{corps.length ? "Select a corp from the left" : "There are no corps!"}</Text>
            </Column>
          )}
        </Grid>
      </NitroCardContentView>
    </NitroCardView>
  );
}
