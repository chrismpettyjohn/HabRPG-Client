import { Column, Flex, Grid, Text } from "../../../common";
import { useCharacterSkills, useCharacter, useSessionInfo } from "../../../hooks";

export function CharacterInfo() {
    const { userInfo } = useSessionInfo();
    const characterData = useCharacter(userInfo?.userId);
    const characterAttributesData = useCharacterSkills(characterData.id);

    const healthPercent = Math.round((characterData.healthNow / characterData.healthMax) * 100);
    const energyPercent = Math.round((characterData.energyNow / characterData.energyMax) * 100);

    return (
        <Column alignItems="end" className="nitro-purse-container" gap={1}>
            <Flex className="nitro-purse rounded-bottom p-1" fullWidth>
                <Grid fullWidth gap={3}>
                    <Column fullWidth justifyContent="center" size={6} gap={0}>
                        <Text fontSize={6} variant="white">
                            <b>Strength: </b>
                            LVL {characterAttributesData.strengthLevel}
                        </Text>
                    </Column>
                    <Column fullWidth justifyContent="center" size={6} gap={0}>
                        <Text fontSize={6} variant="white">
                            <b>Stamina:</b>
                            LVL {characterAttributesData.staminaLevel}
                        </Text>
                    </Column>
                    <Column fullWidth justifyContent="center" size={6} gap={0}>
                        <Text fontSize={6} variant="white">
                            <b>Agility:</b>
                            LVL {characterAttributesData.agilityLevel}
                        </Text>
                    </Column>
                    <Column fullWidth justifyContent="center" size={6} gap={0}>
                        <Text fontSize={6} variant="white">
                            <b>Resilience:</b>
                            LVL {characterAttributesData.resilienceLevel}
                        </Text>
                    </Column>
                    <Column fullWidth justifyContent="center" size={6} gap={0}>
                        <Text fontSize={6} variant="white">
                            <b>Melee:</b>
                            LVL {characterAttributesData.meleeLevel}
                        </Text>
                    </Column>
                    <Column fullWidth justifyContent="center" size={6} gap={0}>
                        <Text fontSize={6} variant="white">
                            <b>Ranged:</b>
                            LVL {characterAttributesData.rangedLevel}
                        </Text>
                    </Column>
                    <Column fullWidth justifyContent="center" size={6} gap={0}>
                        <Text fontSize={6} variant="white">
                            <b>Defense:</b>
                            LVL {characterAttributesData.defenseLevel}
                        </Text>
                    </Column>
                    <Column fullWidth />
                    <Column fullWidth justifyContent="center" size={6} gap={0}>
                        <Text fontSize={6} variant="white">
                            <b>Health: </b>
                            {healthPercent}%
                        </Text>
                    </Column>
                    <Column fullWidth justifyContent="center" size={6} gap={0}>
                        <Text fontSize={6} variant="white">
                            <b>Energy</b>
                            {energyPercent}%
                        </Text>
                    </Column>
                </Grid>
            </Flex>
        </Column>
    )
}
