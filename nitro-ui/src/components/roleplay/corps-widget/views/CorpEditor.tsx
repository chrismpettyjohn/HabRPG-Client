import { SyntheticEvent, useState } from "react";
import { Text } from "../../../../common";
import { CorpData } from "@nitrots/nitro-renderer";

export type CorpDTO = Omit<CorpData, "id">;

export interface CorpEditorProps {
  defaultDTO?: CorpDTO;
  onSave(dto: CorpDTO): void;
}

export function CorpEditor({ defaultDTO, onSave }: CorpEditorProps) {
  const [dto, setDTO] = useState<CorpDTO>({
    name: defaultDTO?.name ?? "",
  });

  const isValid = !!dto.name;

  function onChange(changes: Partial<CorpDTO>) {
    setDTO((_) => ({ ..._, ...changes }));
  }

  function onSubmit(event: SyntheticEvent) {
    event.preventDefault();
    if (!isValid) {
      return;
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <div>
        <Text bold fontSize={4}>
          Name
        </Text>
        <input className="form-control" value={dto.name} onChange={(e) => onChange({ name: e.target.value })} />
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
        <button className="btn btn-success" disabled={!isValid} type="submit">
          Save
        </button>
      </div>
    </form>
  );
}
