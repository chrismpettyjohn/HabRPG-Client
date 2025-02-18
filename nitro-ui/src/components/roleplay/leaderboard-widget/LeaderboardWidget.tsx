import { useEffect, useState } from "react";
import { AddEventLinkTracker, RemoveLinkEventTracker } from "../../../api";
import { ILinkEventTracker } from "@nitrots/nitro-renderer";
import { NitroCardContentView, NitroCardHeaderView, NitroCardView } from "../../../common";

export function LeaderboardWidget() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const linkTracker: ILinkEventTracker = {
      linkReceived: (url: string) => {
        const parts = url.split("/");

        if (parts.length < 2) return;

        switch (parts[1]) {
          case "toggle": {
            setVisible((_) => !_);
            return;
          }
        }
      },
      eventUrlPrefix: "leaderboard/",
    };

    AddEventLinkTracker(linkTracker);

    return () => RemoveLinkEventTracker(linkTracker);
  }, [visible]);

  if (!visible) return null;

  return (
    <NitroCardView uniqueKey="nitro-leaderboard-list" theme="primary-slim">
      <NitroCardHeaderView headerText="Leaderboard" onCloseClick={() => setVisible(false)} />
      <NitroCardContentView overflow="hidden">Leaderboard</NitroCardContentView>
    </NitroCardView>
  );
}
