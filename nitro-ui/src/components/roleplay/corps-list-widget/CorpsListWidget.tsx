import { useEffect, useState } from "react";
import { AddEventLinkTracker, RemoveLinkEventTracker } from "../../../api";
import { ILinkEventTracker } from "@nitrots/nitro-renderer";
import { NitroCardContentView, NitroCardHeaderView, NitroCardView } from "../../../common";

export function CorpsListWidget() {
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
      eventUrlPrefix: "corps/list/",
    };

    AddEventLinkTracker(linkTracker);

    return () => RemoveLinkEventTracker(linkTracker);
  }, [visible]);

  if (!visible) return null;

  return (
    <NitroCardView uniqueKey="nitro-corps-list" theme="primary-slim">
      <NitroCardHeaderView headerText="Corps" onCloseClick={() => setVisible(false)} />
      <NitroCardContentView overflow="hidden">Corps</NitroCardContentView>
    </NitroCardView>
  );
}
