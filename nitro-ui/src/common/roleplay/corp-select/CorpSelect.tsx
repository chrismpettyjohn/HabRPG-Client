import { useCorpList } from "../../../hooks/roleplay/useCorpListAll";

export interface CorpSelectProps {
  corpId?: number;
  onChange(corpId: number): void;
}

export function CorpSelect({ corpId, onChange }: CorpSelectProps) {
  const corps = useCorpList();

  return (
    <select className="form-control form-control-sm">
      {corps.map((_) => (
        <option value={_.id} onSelect={() => onChange(_.id)} selected={corpId === _.id}>
          {_.name}
        </option>
      ))}
    </select>
  );
}
