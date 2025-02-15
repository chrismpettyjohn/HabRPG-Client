import { useCorpRoleList } from "../../../hooks/roleplay/useCorpRoleListAll";

export interface CorpRoleSelectProps {
  corpRoleId?: number;
  onChange(roleId: number): void;
}

export function CorpRoleSelect({ corpRoleId, onChange }: CorpRoleSelectProps) {
  const corpRoles = useCorpRoleList();

  return (
    <select className="form-control form-control-sm">
      {corpRoles.map((_) => (
        <option value={_.id} onSelect={() => onChange(_.id)} selected={corpRoleId === _.id}>
          {_.name}
        </option>
      ))}
    </select>
  );
}
