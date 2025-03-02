import { useEffect, useMemo } from "react";
import { useCorpRoleList } from "../../../hooks/roleplay/useCorpRoleList";

export interface CorpRoleSelectProps {
  corpId: number;
  corpRoleId?: number;
  onChange(roleId: number): void;
}

export function CorpRoleSelect({ corpId, corpRoleId, onChange }: CorpRoleSelectProps) {
  const corpRoles = useCorpRoleList();

  const filteredRoles = useMemo(() => corpRoles.filter((role) => role.corpId === corpId), [corpRoles, corpId]);

  useEffect(() => {
    const firstRole = filteredRoles[0];
    if (!firstRole) {
      return;
    }
    if (firstRole.id != corpRoleId) {
      onChange(firstRole.id);
    }
  }, [filteredRoles, corpRoleId]);

  return (
    <select className="form-control form-control-sm" value={corpRoleId ?? ""} onChange={(e) => onChange(Number(e.target.value))}>
      <option value="" disabled>
        Select a role
      </option>
      {filteredRoles.map((role) => (
        <option key={role.id} value={role.id}>
          {role.name}
        </option>
      ))}
    </select>
  );
}
