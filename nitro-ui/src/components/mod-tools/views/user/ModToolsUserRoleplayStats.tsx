import { ChangeEvent, FC, useCallback, useEffect, useMemo, useState } from "react";
import { Button, DraggableWindowPosition, Flex, NitroCardContentView, NitroCardHeaderView, NitroCardView, Text } from "../../../../common";
import { useCharacter } from "../../../../hooks";
import { SendMessageComposer } from "../../../../api";
import { CharacterUpdateByIdComposer } from "@nitrots/nitro-renderer/src/nitro/communication/messages/outgoing/roleplay/character/CharacterUpdateByIdComposer";
import { CharacterData } from "@nitrots/nitro-renderer";
import { CorpRoleSelect } from "../../../../common/roleplay/corp-role-select/CorpRoleSelect";
import { CorpSelect } from "../../../../common/roleplay/corp-select/CorpSelect";

interface ModToolsUserChangeCharacterViewProps {
  userId: number;
  onCloseClick: () => void;
}

export const ModToolsUserChangeCharacterView: FC<ModToolsUserChangeCharacterViewProps> = ({ userId, onCloseClick }) => {
  const character = useCharacter(userId);
  const characterData = useMemo(
    () => ({
      id: character?.id ?? -1,
      botId: character?.botId ?? -1,
      userId: character?.userId ?? -1,
      petId: character?.petId ?? -1,
      isDead: character?.isDead ?? true,
      isExhausted: character?.isExhausted ?? true,
      isWorking: character?.isWorking ?? false,
      corpId: character?.corpId ?? -1,
      corpName: "",
      corpRoleId: character?.corpRoleId ?? -1,
      corpRoleName: "",
      healthNow: character?.healthNow ?? -1,
      healthMax: character?.healthMax ?? -1,
      energyNow: character?.energyNow ?? -1,
      energyMax: character?.energyMax ?? -1,
    }),
    [character]
  );
  const [stats, setStats] = useState<CharacterData>(characterData);

  useEffect(() => {
    if (stats.id === characterData.id) {
      return;
    }
    setStats(characterData);
  }, [characterData]);

  const onChanges = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setStats((_) => ({
      ..._,
      [event.target.name]: !Number.isNaN(event.target.value) ? Number(event.target.value) : event.target.value,
    }));
  }, []);

  const onSaveChanges = useCallback(() => {
    SendMessageComposer(
      new CharacterUpdateByIdComposer(userId, stats.corpId, stats.corpRoleId, stats.healthNow, stats.healthMax, stats.energyNow, stats.energyMax)
    );
  }, [userId, stats]);

  const onChangeCorp = useCallback(
    (corpId: number) => {
      setStats((_) => ({
        ..._,
        corpId,
      }));
    },
    [setStats]
  );

  const onChangeCorpRole = useCallback(
    (corpRoleId: number) => {
      setStats((_) => ({
        ..._,
        corpRoleId,
      }));
    },
    [setStats]
  );

  useEffect(() => {
    setStats(character);
  }, [character]);

  if (!userId || !stats) {
    return null;
  }

  return (
    <NitroCardView
      className="nitro-mod-tools-change-character-action"
      theme="primary-slim"
      windowPosition={DraggableWindowPosition.TOP_LEFT}
      style={{ width: 400 }}
    >
      <NitroCardHeaderView headerText="Roleplay Character" onCloseClick={() => onCloseClick()} />
      <NitroCardContentView className="text-white">
        <Text bold fontSize={4}>
          Stats
        </Text>
        <Flex gap={1}>
          <Flex fullWidth style={{ flexDirection: "column" }}>
            <Text bold>Health Now ({stats.healthNow})</Text>
            <input
              type="range"
              className="form-control form-control-sm"
              name="healthNow"
              value={stats.healthNow}
              min={0}
              max={stats.healthMax}
              onChange={onChanges}
            />
          </Flex>
          <Flex fullWidth style={{ flexDirection: "column" }}>
            <Text bold>Health Max ({stats.healthMax})</Text>
            <input type="range" className="form-control form-control-sm" name="healthMax" value={stats.healthMax} min={0} max={500} onChange={onChanges} />
          </Flex>
        </Flex>
        <Flex gap={1}>
          <Flex fullWidth style={{ flexDirection: "column" }}>
            <Text bold>Energy Now ({stats.energyNow})</Text>
            <input
              type="range"
              className="form-control form-control-sm"
              name="energyNow"
              value={stats.energyNow}
              min={0}
              max={stats.energyMax}
              onChange={onChanges}
            />
          </Flex>
          <Flex fullWidth style={{ flexDirection: "column" }}>
            <Text bold>Energy Max ({stats.energyMax})</Text>
            <input type="range" className="form-control form-control-sm" name="energyMax" value={stats.energyMax} min={0} max={500} onChange={onChanges} />
          </Flex>
        </Flex>
        <hr style={{ margin: 0 }} />
        <Text bold fontSize={4}>
          Life
        </Text>
        <Flex gap={1}>
          <Flex fullWidth style={{ flexDirection: "column" }}>
            <Text bold>Employer</Text>
            <CorpSelect corpId={stats.corpId} onChange={onChangeCorp} />
          </Flex>
          <Flex fullWidth style={{ flexDirection: "column" }}>
            <Text bold>Position</Text>
            <CorpRoleSelect corpId={stats.corpId} corpRoleId={stats.corpRoleId} onChange={onChangeCorpRole} />
          </Flex>
        </Flex>
        <Button fullWidth variant="success" onClick={onSaveChanges}>
          Save
        </Button>
      </NitroCardContentView>
    </NitroCardView>
  );
};
