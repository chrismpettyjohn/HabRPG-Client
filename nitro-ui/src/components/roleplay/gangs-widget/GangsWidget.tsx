import { useEffect, useState } from "react";
import { AddEventLinkTracker, CreateLinkEvent, GetConfiguration, RemoveLinkEventTracker } from "../../../api";
import { Column, Grid, NitroCardContentView, NitroCardHeaderView, NitroCardView, Text } from "../../../common";
import { useGangList } from "../../../hooks/roleplay/useGangList";
import { FaInfoCircle, FaPlus } from "react-icons/fa";
import { GangView } from "./views/GangView";
import { GangEdit } from "./views/GangEdit";
import { GangCreate } from "./views/GangCreate";

export function GangsWidget() {
  const [visible, setVisible] = useState(false);
  const gangs = useGangList();
  const [view, setView] = useState<JSX.Element>();
  const [gangId, setGangId] = useState<Number>();

  useEffect(() => {
    const linkTracker = {
      linkReceived: (url) => {
        const parts = url.split("/");

        const gangId = Number(parts[2]);

        switch (parts[1]) {
          case "toggle":
            setVisible((_) => !_);
            return;
          case "create":
            setVisible(true);
            setGangId(undefined);
            setView(<GangCreate />);
            return;
          case "profile":
            setVisible(true);
            setGangId(gangId);
            setView(<GangView gangId={gangId} />);
            return;
          case "edit":
            setVisible(true);
            setGangId(gangId);
            setView(<GangEdit gangId={gangId} />);
            return;
        }
      },
      eventUrlPrefix: "gangs",
    };
    AddEventLinkTracker(linkTracker);
    return () => RemoveLinkEventTracker(linkTracker);
  }, [visible]);

  if (!visible) return null;

  return (
    <NitroCardView uniqueKey="nitro-gangs-list" theme="primary-slim" style={{ width: 625, height: 400 }}>
      <NitroCardHeaderView headerText="Gangs" onCloseClick={() => setVisible(false)} />
      <NitroCardContentView overflow="hidden">
        <Grid>
          <Column size={2} style={{ overflowY: "auto" }}>
            <div className="gangs-list-widget">
              {gangs.map((_) => (
                <div className={`gang ${gangId === _.id ? "active" : ""}`} key={`gang_${_.id}`} onClick={() => CreateLinkEvent(`gangs/profile/${_.id}`)}>
                  <img
                    src={GetConfiguration<string>("badge.asset.url").replace("%badgename%", _.badgeCode)}
                    style={{ objectFit: "contain", height: 30, width: 30, imageRendering: "pixelated" }}
                  />
                </div>
              ))}
              <div className="gang" onClick={() => CreateLinkEvent("gangs/create")}>
                <FaPlus />
              </div>
            </div>
          </Column>
          <Column size={10}>
            {view ?? (
              <Column size={12} style={{ alignItems: "center", display: "flex", flex: 1, flexDirection: "column", gap: 14, justifyContent: "center" }}>
                <FaInfoCircle style={{ fontSize: 32 }} />
                <br />
                <Text bold>{gangs.length ? "Select a gang from the left" : "There are no gangs!"}</Text>
              </Column>
            )}
          </Column>
        </Grid>
      </NitroCardContentView>
    </NitroCardView>
  );
}
