import { useState } from "react";
import { Button } from "../../../common";
import { useCharacter, useSessionInfo } from "../../../hooks";
import { SendMessageComposer } from "../../../api";
import { CallParamedicComposer } from "@nitrots/nitro-renderer";

export function CallParamedic() {
  const [loading, setLoading] = useState(false);
  const { userInfo } = useSessionInfo();
  const character = useCharacter(userInfo?.userId);

  if (!character.isDead || loading) {
    return null;
  }

  function onCallParamedic() {
    SendMessageComposer(new CallParamedicComposer());
    setLoading(true);
  }

  return (
    <Button variant="success" onClick={onCallParamedic}>
      Call Paramedic
    </Button>
  );
}
