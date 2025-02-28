import { CorpsWidget } from "./corps-widget/CorpsWidget";
import { GangsListWidget } from "./gangs-list-widget/GangsListWidget";
import { LeaderboardWidget } from "./leaderboard-widget/LeaderboardWidget";

export function Roleplay() {
  return (
    <>
      <CorpsWidget />
      <GangsListWidget />
      <LeaderboardWidget />
    </>
  );
}
