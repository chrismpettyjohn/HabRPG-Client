import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';
import { Button, DraggableWindowPosition, Flex, NitroCardContentView, NitroCardHeaderView, NitroCardView, Text } from '../../../../common';
import { useCharacter } from '../../../../hooks';
import { SendMessageComposer } from '../../../../api';
import { CharacterUpdateByIdComposer } from '@nitrots/nitro-renderer/src/nitro/communication/messages/outgoing/roleplay/character/CharacterUpdateByIdComposer';

interface ModToolsUserChangeCharacterViewProps {
    userId: number;
    onCloseClick: () => void;
}

export const ModToolsUserChangeCharacterView: FC<ModToolsUserChangeCharacterViewProps> = ({ userId, onCloseClick }) => {
    const character = useCharacter(userId);
    const [stats, setStats] = useState<CharacterData>();

    const onChanges = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        event.persist();
        setStats(_ => ({
            ..._,
            [event.target.name]: event.target.type === 'number' ? Number(event.target.value) : event.target.value,
        }))
    }, []);

    const onSaveChanges = useCallback(() => {
        SendMessageComposer(new CharacterUpdateByIdComposer(userId, stats.healthNow, stats.healthMax, stats.energyNow, stats.energyMax));
    }, [userId, stats]);

    useEffect(() => {
        setStats(character);
    }, [character]);

    if (!stats) {
        return null;
    }

    console.log(stats)

    return (
        <NitroCardView className="nitro-mod-tools-change-character-action" theme="primary-slim" windowPosition={DraggableWindowPosition.TOP_LEFT} style={{ width: 400 }}>
            <NitroCardHeaderView headerText="Change Character" onCloseClick={() => onCloseClick()} />
            <NitroCardContentView className="text-black">
                <Flex gap={1}>
                    <Flex fullWidth style={{ flexDirection: 'column' }}>
                        <Text bold>Health Now</Text>
                        <input type="number" className="form-control form-control-sm" value={stats.healthNow} max={stats.healthMax} onChange={onChanges} name="healthNow" />
                    </Flex>
                    <Flex fullWidth style={{ flexDirection: 'column' }}>
                        <Text bold>Health Max</Text>
                        <input type="number" className="form-control form-control-sm" value={stats.healthMax} min={stats.healthMin} onChange={onChanges} name="healthMax" />
                    </Flex>
                </Flex>
                <Flex gap={1}>
                    <Flex fullWidth style={{ flexDirection: 'column' }}>
                        <Text bold>Energy Now</Text>
                        <input type="number" className="form-control form-control-sm" value={stats.energyNow} max={stats.energyMax} onChange={onChanges} name="energyNow" />
                    </Flex>
                    <Flex fullWidth style={{ flexDirection: 'column' }}>
                        <Text bold>Energy Max</Text>
                        <input type="number" className="form-control form-control-sm" value={stats.energyMax} min={stats.energyMin} onChange={onChanges} name="energyMax" />
                    </Flex>
                </Flex>
                <Button fullWidth variant="success" onClick={onSaveChanges}>
                    Save
                </Button>
            </NitroCardContentView>
        </NitroCardView>
    );
}
