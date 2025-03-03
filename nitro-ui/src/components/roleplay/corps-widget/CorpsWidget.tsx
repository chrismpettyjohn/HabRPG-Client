import { useEffect, useState } from "react";
import { AddEventLinkTracker, CreateLinkEvent, GetConfiguration, RemoveLinkEventTracker } from "../../../api";
import { Column, Grid, NitroCardContentView, NitroCardHeaderView, NitroCardView, Text } from "../../../common";
import { useCorpList } from "../../../hooks/roleplay/useCorpList";
import { FaInfoCircle, FaPlus } from "react-icons/fa";
import { CorpView } from "./views/CorpView";
import { CorpEdit } from "./views/CorpEdit";
import { CorpCreate } from "./views/CorpCreate";

export function CorpsWidget() {
  const [visible, setVisible] = useState(false);
  const corps = useCorpList();
  const [view, setView] = useState<JSX.Element>();
  const [corpId, setCorpId] = useState<Number>();

  useEffect(() => {
    const linkTracker = {
      linkReceived: (url) => {
        const parts = url.split("/");

        const corpId = Number(parts[2]);

        switch (parts[1]) {
          case "toggle":
            setVisible((_) => !_);
            return;
          case "create":
            setVisible(true);
            setCorpId(undefined);
            setView(<CorpCreate />);
            return;
          case "profile":
            setVisible(true);
            setCorpId(corpId);
            setView(<CorpView corpId={corpId} />);
            return;
          case "edit":
            setVisible(true);
            setCorpId(corpId);
            setView(<CorpEdit corpId={corpId} />);
            return;
        }
      },
      eventUrlPrefix: "corps",
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
          <Column size={2}>
            <div className="corps-list-widget">
              {corps.map((_) => (
                <div className={`corp ${corpId === _.id ? "active" : ""}`} key={`corp_${_.id}`} onClick={() => CreateLinkEvent(`corps/profile/${_.id}`)}>
                  <img
                    src={GetConfiguration<string>("badge.asset.url").replace("%badgename%", _.badgeCode)}
                    style={{ objectFit: "contain", height: 30, width: 30, imageRendering: "pixelated" }}
                  />
                </div>
              ))}
              <div className="corp" onClick={() => CreateLinkEvent("corps/create")}>
                <FaPlus />
              </div>
            </div>
          </Column>
          <Column size={10}>
            {view ?? (
              <Column size={12} style={{ alignItems: "center", display: "flex", flex: 1, flexDirection: "column", gap: 14, justifyContent: "center" }}>
                <FaInfoCircle style={{ fontSize: 32 }} />
                <br />
                <Text bold>{corps.length ? "Select a corp from the left" : "There are no corps!"}</Text>
              </Column>
            )}
          </Column>
        </Grid>
      </NitroCardContentView>
    </NitroCardView>
  );
}
