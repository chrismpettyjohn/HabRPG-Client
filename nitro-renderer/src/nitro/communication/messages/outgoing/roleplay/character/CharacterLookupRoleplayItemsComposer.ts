import { IMessageComposer } from '../../../../../../api';

export class CharacterLookupRoleplayItemsComposer implements IMessageComposer<ConstructorParameters<typeof CharacterLookupRoleplayItemsComposer>> {
    private _data: ConstructorParameters<typeof CharacterLookupRoleplayItemsComposer>;

    constructor(userId: number) {
        this._data = [userId];
    }

    public getMessageArray() {
        return this._data;
    }

    public dispose(): void {
        return;
    }
}
