import { FC } from 'react';
import { Column } from '../../common';
import { OfferView } from '../catalog/views/targeted-offer/OfferView';
import { GroupRoomInformationView } from '../groups/views/GroupRoomInformationView';
import { NotificationCenterView } from '../notification-center/NotificationCenterView';
import { PurseView } from '../purse/PurseView';
import { MysteryBoxExtensionView } from '../room/widgets/mysterybox/MysteryBoxExtensionView';
import { RoomPromotesWidgetView } from '../room/widgets/room-promotes/RoomPromotesWidgetView';
import { CharacterInfo } from './character-info/CharacterInfo';

export const RightSideView: FC<{}> = props => {
    return (
        <div className="nitro-right-side">
            <Column position="relative" gap={1}>
                <CharacterInfo />
                <PurseView />
                <GroupRoomInformationView />
                <MysteryBoxExtensionView />
                <OfferView />
                <RoomPromotesWidgetView />
                <NotificationCenterView />
            </Column>
        </div>
    );
}
