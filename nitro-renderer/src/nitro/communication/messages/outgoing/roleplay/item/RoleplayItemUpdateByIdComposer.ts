import { IMessageComposer } from '../../../../../../api';

export class RoleplayItemUpdateByIdComposer implements IMessageComposer<ConstructorParameters<typeof RoleplayItemUpdateByIdComposer>> {
    private _data: ConstructorParameters<typeof RoleplayItemUpdateByIdComposer>;

    constructor(id: number, uniqueName: string, displayName: string, type: string, effect: string, accuracy: number, ammoSize: number, ammoCapacity: number, attackMessage: string, cooldownSeconds: number, equipHandItemId: number, equipEffect: number, equipMessage: string, maxDamage: number, minDamage: number, rangeInTiles: number, reloadMessage: string, reloadTime: number, unequipMessage: string, weight: number, value: number) {
        this._data = [id, uniqueName, displayName, type, effect, accuracy, ammoSize, ammoCapacity, attackMessage, cooldownSeconds, equipHandItemId, equipEffect, equipMessage, maxDamage, minDamage, rangeInTiles, reloadMessage, reloadTime, unequipMessage, weight, value];
    }

    public getMessageArray() {
        return this._data;
    }

    public dispose(): void {
        return;
    }
}
