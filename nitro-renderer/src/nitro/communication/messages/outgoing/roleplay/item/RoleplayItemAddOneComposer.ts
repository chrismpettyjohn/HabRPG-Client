import { IMessageComposer } from '../../../../../../api';

export class RoleplayItemAddOneComposer implements IMessageComposer<ConstructorParameters<typeof RoleplayItemAddOneComposer>> {
    private _data: ConstructorParameters<typeof RoleplayItemAddOneComposer>;

    constructor(uniqueName: string, displayName: string, type: string, effect: string, accuracy: number, ammoSize: number, ammoCapacity: number, attackMessage: string, cooldownSeconds: number, equipHandItemId: number, equipEffect: number, equipMessage: string, maxDamage: number, minDamage: number, rangeInTiles: number, reloadMessage: string, reloadTime: number, unequipMessage: string, weight: number, value: number) {
        this._data = [uniqueName, displayName, type, effect, accuracy, ammoSize, ammoCapacity, attackMessage, cooldownSeconds, equipHandItemId, equipEffect, equipMessage, maxDamage, minDamage, rangeInTiles, reloadMessage, reloadTime, unequipMessage, weight, value];
    }

    public getMessageArray() {
        return this._data;
    }

    public dispose(): void {
        return;
    }
}
