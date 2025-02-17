import { LayoutAvatarImageView, Text } from "../../../../common";
import { useCharacter } from "../../../../hooks";

export interface CharacterContainerProps {
  userId: number;
}

export function CharacterContainer({ userId }: CharacterContainerProps) {
  const character = useCharacter(userId);
  if (!character) return null;

  const healthPercent = (character.healthNow / character.healthMax) * 100;
  const energyPercent = (character.energyNow / character.energyMax) * 100;

  return (
    <div className="character-container">
      <div className="user-info">
        <div className="avatar">
          <LayoutAvatarImageView figure={character.figure} direction={2} headOnly={true} />
        </div>
        <div className="info">
          <Text bold fontSize={5} variant="white">
            {character.username}
          </Text>
          <div style={{ position: "relative" }}>
            <div className={`working-status ${character.isWorking ? "active" : "inactive"}`}>
              <Text variant="white">{character.corpRoleName}</Text>
            </div>
          </div>
        </div>
      </div>
      <div className="user-stats">
        <div
          className="stat health"
          style={{
            width: `${healthPercent}%`,
            background: `hsl(0, 80%, ${Math.max(20, healthPercent * 0.6)}%)`,
          }}
        >
          {character.healthNow}/{character.healthMax}
        </div>
        <div
          className="stat energy"
          style={{
            width: `${energyPercent}%`,
            background: `hsl(220, 80%, ${Math.max(20, energyPercent * 0.6)}%)`,
          }}
        >
          {character.energyNow}/{character.energyMax}
        </div>
      </div>
    </div>
  );
}
