import { CorpsListWidget } from "./corps-list-widget/CorpsListWidget";
import { GangsListWidget } from "./gangs-list-widget/GangsListWidget";
import { LeaderboardWidget } from "./leaderboard-widget/LeaderboardWidget";

export function Roleplay() {
  return (
    <>
      <CorpsListWidget />
      <GangsListWidget />
      <LeaderboardWidget />
    </>
  );
}
