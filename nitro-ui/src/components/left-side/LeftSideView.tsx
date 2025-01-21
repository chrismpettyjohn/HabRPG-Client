import { FC } from 'react';
import { Column } from '../../common';
import { CallParamedic } from './call-paramedic/CallParamedic';

export const LeftSideView: FC<{}> = props => {
    return (
        <div className="nitro-left-side">
            <Column position="relative" gap={1}>
                <CallParamedic />
            </Column>
        </div>
    );
}
