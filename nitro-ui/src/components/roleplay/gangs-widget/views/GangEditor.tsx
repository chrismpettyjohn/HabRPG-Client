import { SyntheticEvent, useState } from "react";
import { Text } from "../../../../common";
import { GangData } from "@nitrots/nitro-renderer";

export type GangDTO = Omit<GangData, "id">;

export interface GangEditorProps {
  defaultDTO?: GangDTO;
  onSave(dto: GangDTO): void;
}

export function GangEditor({ defaultDTO, onSave }: GangEditorProps) {
  const [dto, setDTO] = useState<GangDTO>({
    name: defaultDTO?.name ?? "",
  });

  const isValid = !!dto.name;

  function onChange(changes: Partial<GangDTO>) {
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
      <br />
      <div>
        <Text bold fontSize={4}>
          Badge
        </Text>
        <div style={{ alignItems: "center", display: "flex", justifyContent: "center", gap: 24 }}>
          <img src="https://swfs.habcrab.com/c_images/album1584/ADM.gif" style={{ width: 31, height: 31 }} />
          <input className="form-control" value={dto.name} onChange={(e) => onChange({ name: e.target.value })} />
        </div>
      </div>
      <br />
      <div>
        <Text bold fontSize={4}>
          Mission
        </Text>
        <textarea className="form-control" value={dto.name} onChange={(e) => onChange({ name: e.target.value })} rows={2} />
      </div>
      <br />
      <div style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
        <button className="btn btn-success" disabled={!isValid} type="submit">
          Save
        </button>
      </div>
    </form>
  );
}
