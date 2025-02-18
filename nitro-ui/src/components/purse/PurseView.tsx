import { FriendlyTime, HabboClubLevelEnum } from "@nitrots/nitro-renderer";
import { FC } from "react";
import { LocalizeText } from "../../api";
import { Column, Flex, LayoutCurrencyIcon, Text } from "../../common";
import { usePurse } from "../../hooks";

export const PurseView: FC<{}> = () => {
  const { purse = null } = usePurse();
  const getClubText = (() => {
    if (!purse) return null;

    const totalDays = purse.clubPeriods * 31 + purse.clubDays;
    const minutesUntilExpiration = purse.minutesUntilExpiration;

    if (purse.clubLevel === HabboClubLevelEnum.NO_CLUB) return LocalizeText("purse.clubdays.zero.amount.text");
    else if (minutesUntilExpiration > -1 && minutesUntilExpiration < 60 * 24) return FriendlyTime.shortFormat(minutesUntilExpiration * 60);
    else return FriendlyTime.shortFormat(totalDays * 86400);
  })();

  if (!purse) return null;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
      <Column alignItems="end" className="nitro-purse-container" gap={1}>
        <Flex className="nitro-purse rounded-bottom p-1" alignItems="center" justifyContent="between" style={{ width: "100%" }}>
          <Text bold fontSize={2} variant="white">
            $
          </Text>
          <Text bold fontSize={3} variant="white">
            {Number(purse.credits).toLocaleString()}
          </Text>
        </Flex>
      </Column>
      <Column alignItems="end" className="nitro-purse-container" gap={1}>
        <Flex className="nitro-purse rounded-bottom p-1" alignItems="center" justifyContent="between" style={{ width: "100%" }}>
          <Text bold fontSize={2} variant="white">
            <LayoutCurrencyIcon type="hc" style={{ height: 24, width: 24, backgroundSize: "cover" }} />
          </Text>
          <Text bold fontSize={3} variant="white">
            {getClubText}
          </Text>
        </Flex>
      </Column>
    </div>
  );
};
