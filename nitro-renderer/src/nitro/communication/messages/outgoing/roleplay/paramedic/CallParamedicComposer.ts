import { IMessageComposer } from '../../../../../../api';

export class CallParamedicComposer implements IMessageComposer<ConstructorParameters<typeof CallParamedicComposer>> {
    private _data: ConstructorParameters<typeof CallParamedicComposer>;

    constructor() {
        this._data = [];
    }

    public getMessageArray() {
        return this._data;
    }

    public dispose(): void {
        return;
    }
}
