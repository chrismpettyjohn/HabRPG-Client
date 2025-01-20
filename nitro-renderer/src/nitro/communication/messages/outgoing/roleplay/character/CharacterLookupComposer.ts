import { IMessageComposer } from '../../../../../../api';

export class CharacterLookupComposer implements IMessageComposer<ConstructorParameters<typeof CharacterLookupComposer>> {
    private _data: ConstructorParameters<typeof CharacterLookupComposer>;

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
