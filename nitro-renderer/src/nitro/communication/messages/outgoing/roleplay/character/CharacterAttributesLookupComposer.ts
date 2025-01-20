import { IMessageComposer } from '../../../../../../api';

export class CharacterAttributesLookupComposer implements IMessageComposer<ConstructorParameters<typeof CharacterAttributesLookupComposer>> {
    private _data: ConstructorParameters<typeof CharacterAttributesLookupComposer>;

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
