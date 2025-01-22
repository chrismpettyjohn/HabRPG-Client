import { IMessageComposer } from '../../../../../../api';

export class HealComposer implements IMessageComposer<ConstructorParameters<typeof HealComposer>> {
    private _data: ConstructorParameters<typeof HealComposer>;

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
