import { useCorpList } from "../../../hooks/roleplay/useCorpListAll";

export interface CorpSelectProps {
  corpId?: number;
  onChange(corpId: number): void;
}

export function CorpSelect({ corpId, onChange }: CorpSelectProps) {
  const corps = useCorpList();

  return (
    <select className="form-control form-control-sm" value={corpId ?? ""} onChange={(e) => onChange(Number(e.target.value))}>
      <option value="" disabled>
        Select a corporation
      </option>
      {corps.map((corp) => (
        <option key={corp.id} value={corp.id}>
          {corp.name}
        </option>
      ))}
    </select>
  );
}
