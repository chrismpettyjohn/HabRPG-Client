import { IMessageComposer } from '../../../../../../api';

export class RoleplayItemDeleteOneComposer implements IMessageComposer<ConstructorParameters<typeof RoleplayItemDeleteOneComposer>> {
    private _data: ConstructorParameters<typeof RoleplayItemDeleteOneComposer>;

    constructor(id: number) {
        this._data = [id];
    }

    public getMessageArray() {
        return this._data;
    }

    public dispose(): void {
        return;
    }
}
