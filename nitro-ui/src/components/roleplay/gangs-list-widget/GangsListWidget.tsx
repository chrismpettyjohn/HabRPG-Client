import { useEffect, useState } from "react";
import { AddEventLinkTracker, RemoveLinkEventTracker } from "../../../api";
import { ILinkEventTracker } from "@nitrots/nitro-renderer";
import { NitroCardContentView, NitroCardHeaderView, NitroCardView } from "../../../common";

export function GangsListWidget() {
  const [visible, setVisible] = useState(false);

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
    <NitroCardView uniqueKey="nitro-gangs-list" theme="primary-slim">
      <NitroCardHeaderView headerText="Gangs" onCloseClick={() => setVisible(false)} />
      <NitroCardContentView overflow="hidden">Gangs</NitroCardContentView>
    </NitroCardView>
  );
}
