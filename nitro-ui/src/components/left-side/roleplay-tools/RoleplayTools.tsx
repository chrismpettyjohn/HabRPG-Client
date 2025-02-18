import { CreateLinkEvent } from "../../../api";
import { Base } from "../../../common";

export function RoleplayTools() {
  return (
    <div className="roleplay-tools">
      <div className="navigation-item" onClick={() => CreateLinkEvent("corps/list/toggle")}>
        <Base pointer className="icon icon-corp" />
      </div>
      <div className="navigation-item" onClick={() => CreateLinkEvent("gangs/list/toggle")}>
        <Base pointer className="icon icon-gang" />
      </div>
      <div className="navigation-item" onClick={() => CreateLinkEvent("leaderboard/toggle")}>
        <Base pointer className="icon icon-leaderboard" />
      </div>
      <div className="navigation-item" onClick={() => CreateLinkEvent("help/show")}>
        <Base pointer className="icon icon-help" />
      </div>
      <div className="navigation-item" onClick={() => CreateLinkEvent("user-settings/toggle")}>
        <Base pointer className="icon icon-cog" />
      </div>
    </div>
  );
}
