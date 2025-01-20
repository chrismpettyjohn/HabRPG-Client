import { IMessageComposer } from '../../../../../../api';

export class AttackComposer implements IMessageComposer<ConstructorParameters<typeof AttackComposer>> {
    private _data: ConstructorParameters<typeof AttackComposer>;

    constructor(x: number, y: number) {
        this._data = [x, y];
    }

    public getMessageArray() {
        return this._data;
    }

    public dispose(): void {
        return;
    }
}
