import { IMessageComposer } from '../../../../../../api';

export class RoleplayItemLookupByTypeComposer implements IMessageComposer<ConstructorParameters<typeof RoleplayItemLookupByTypeComposer>> {
    private _data: ConstructorParameters<typeof RoleplayItemLookupByTypeComposer>;

    constructor(type: string) {
        this._data = [type];
    }

    public getMessageArray() {
        return this._data;
    }

    public dispose(): void {
        return;
    }
}
