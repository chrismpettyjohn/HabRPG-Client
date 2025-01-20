import { Column, Flex, Grid, Text } from "../../../common";
import { useCharacterSkills, useCharacter, useSessionInfo } from "../../../hooks";

export function CharacterInfo() {
    const { userInfo } = useSessionInfo();
    const characterData = useCharacter(userInfo?.userId);
    const characterAttributesData = useCharacterSkills(userInfo?.userId);

    const healthPercent = Math.round((characterData.healthNow / characterData.healthMax) * 100);
    const energyPercent = Math.round((characterData.energyNow / characterData.energyMax) * 100);

    return (
        <Column alignItems="end" className="nitro-purse-container" gap={1}>
            <Flex className="nitro-purse rounded-bottom p-1" fullWidth>
                <Grid fullWidth gap={3}>
                    <Column fullWidth justifyContent="center" size={6} gap={0}>
                        <Text fontSize={6} variant="white">{characterAttributesData.strength} Strength</Text>
                    </Column>
                    <Column fullWidth justifyContent="center" size={6} gap={0}>
                        <Text fontSize={6} variant="white">{characterAttributesData.intelligence} Intelligence</Text>
                    </Column>
                    <Column fullWidth justifyContent="center" size={6} gap={0}>
                        <Text fontSize={6} variant="white">{characterAttributesData.dexterity} Dexterity</Text>
                    </Column>
                    <Column fullWidth justifyContent="center" size={6} gap={0}>
                        <Text fontSize={6} variant="white">{characterAttributesData.charisma} Charisma</Text>
                    </Column>
                    <Column fullWidth justifyContent="center" size={6} gap={0}>
                        <Text fontSize={6} variant="white">{characterAttributesData.perception} Perception</Text>
                    </Column>
                    <Column fullWidth justifyContent="center" size={6} gap={0}>
                        <Text fontSize={6} variant="white">{characterAttributesData.endurance} Endurance</Text>
                    </Column>
                    <Column fullWidth justifyContent="center" size={6} gap={0}>
                        <Text fontSize={6} variant="white">{characterAttributesData.luck} Luck</Text>
                    </Column>
                    <Column fullWidth />
                    <Column fullWidth justifyContent="center" size={6} gap={0}>
                        <Text fontSize={6} variant="white">{healthPercent}% Health</Text>
                    </Column>
                    <Column fullWidth justifyContent="center" size={6} gap={0}>
                        <Text fontSize={6} variant="white">{energyPercent}% Energy</Text>
                    </Column>
                </Grid>
            </Flex>
        </Column>
    )
}
