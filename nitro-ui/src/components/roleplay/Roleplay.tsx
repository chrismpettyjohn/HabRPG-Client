import { CorpsWidget } from "./corps-widget/CorpsWidget";
import { GangsWidget } from "./gangs-widget/GangsWidget";
import { LeaderboardWidget } from "./leaderboard-widget/LeaderboardWidget";

export function Roleplay() {
  return (
    <>
      <CorpsWidget />
      <GangsWidget />
      <LeaderboardWidget />
    </>
  );
}
