import { CrackableDataType, FurnitureFloorUpdateEvent, GroupInformationComposer, GroupInformationEvent, NowPlayingEvent, RoomControllerLevel, RoomObjectCategory, RoomObjectOperationType, RoomObjectVariable, RoomWidgetEnumItemExtradataParameter, RoomWidgetFurniInfoUsagePolicyEnum, SetObjectDataMessageComposer, SongInfoReceivedEvent, StringDataType, UpdateFurniturePositionComposer } from '@nitrots/nitro-renderer';
import { FC, useCallback, useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { GrNext, GrRotateLeft, GrRotateRight } from 'react-icons/gr';
import { AvatarInfoFurni, CreateLinkEvent, GetGroupInformation, GetNitroInstance, GetRoomEngine, LocalizeText, SendMessageComposer } from '../../../../../api';
import { Base, Button, Column, Flex, LayoutBadgeImageView, LayoutLimitedEditionCompactPlateView, LayoutRarityLevelView, Text, UserProfileIconView } from '../../../../../common';
import { useMessageEvent, useRoom, useSoundEvent } from '../../../../../hooks';

interface InfoStandWidgetFurniViewProps
{
    avatarInfo: AvatarInfoFurni;
    onClose: () => void;
}

const PICKUP_MODE_NONE: number = 0;
const PICKUP_MODE_EJECT: number = 1;
const PICKUP_MODE_FULL: number = 2;

export const InfoStandWidgetFurniView: FC<InfoStandWidgetFurniViewProps> = props =>
{
    const { avatarInfo = null, onClose = null } = props;
    const { roomSession = null } = useRoom();

    const [ pickupMode, setPickupMode ] = useState(0);
    const [ canMove, setCanMove ] = useState(false);
    const [ canRotate, setCanRotate ] = useState(false);
    const [ canUse, setCanUse ] = useState(false);
    const [ furniKeys, setFurniKeys ] = useState<string[]>([]);
    const [ furniValues, setFurniValues ] = useState<string[]>([]);
    const [ customKeys, setCustomKeys ] = useState<string[]>([]);
    const [ customValues, setCustomValues ] = useState<string[]>([]);
    const [ isCrackable, setIsCrackable ] = useState(false);
    const [ crackableHits, setCrackableHits ] = useState(0);
    const [ crackableTarget, setCrackableTarget ] = useState(0);
    const [ godMode, setGodMode ] = useState(false);
    const [ canSeeFurniId, setCanSeeFurniId ] = useState(false);
    const [ groupName, setGroupName ] = useState<string>(null);
    const [ isJukeBox, setIsJukeBox ] = useState<boolean>(false);
    const [ isSongDisk, setIsSongDisk ] = useState<boolean>(false);
    const [ songId, setSongId ] = useState<number>(-1);
    const [ songName, setSongName ] = useState<string>('');
    const [ songCreator, setSongCreator ] = useState<string>('');
    const [ dropdownOpen, setDropdownOpen ] = useState(sessionStorage.getItem('dropdownOpen') === 'true');
    const [ furniLocationX, setFurniLocationX ] = useState(null);
    const [ furniLocationY, setFurniLocationY ] = useState(null);
    const [ furniLocationZ, setFurniLocationZ ] = useState(null);
    const [ furniDirection, setFurniDirection ] = useState(null);
    const [ furniState, setFurniState ] = useState(null);

    const sendUpdate = useCallback((deltaX: number, deltaY: number, deltaZ: number = 0, deltaDirection: number = 0) =>
    {
        if (!avatarInfo) return;

        const roomId = GetRoomEngine().activeRoomId;
        const roomObject = GetRoomEngine().getRoomObject(roomId, avatarInfo.id, avatarInfo.category);
        if (!roomObject) return;

        const newX = roomObject.getLocation().x + deltaX;
        const newY = roomObject.getLocation().y + deltaY;
        const newZ = deltaZ * 10000;

        const currentDirection = roomObject.getDirection().x;

        const newDirection = (deltaDirection !== 0)
            ? getValidRoomObjectDirection(roomObject, deltaDirection > 0) / 45
            : currentDirection / 45;

        SendMessageComposer(new UpdateFurniturePositionComposer(avatarInfo.id, newX, newY, newZ, newDirection));
    }, [ avatarInfo ]);

    function getRotationIndex(directionVector)
    {
        const angle = directionVector.x;

        switch(angle)
        {
            case 0: return 0;
            case 45: return 1;
            case 90: return 2;
            case 135: return 3;
            case 180: return 4;
            case 225: return 5;
            case 270: return 6;
            case 315: return 7;
            default: return null; // Handle unexpected angles
        }
    }

    useEffect(() =>
    {
        const roomId = roomSession.roomId;
        const objectId = avatarInfo.id;
        const isWallItem = avatarInfo.isWallItem;

        const locationString = GetRoomEngine().getFurniLocation(roomId, objectId, isWallItem);
        const locationVector = parseVector3d(locationString);

        if (locationVector)
        {
            setFurniLocationX(locationVector.x);
            setFurniLocationY(locationVector.y);
            setFurniLocationZ(locationVector.z);
        }

        const directionString = GetRoomEngine().getFurniDirection(roomId, objectId, isWallItem);
        const directionVector = parseVector3d(directionString);
        const rotationIndex = directionVector ? getRotationIndex(directionVector) : null;

        const state = GetRoomEngine().getFurniState(roomId, objectId, isWallItem);

        setFurniDirection(rotationIndex);
        setFurniState(state);
    }, [ avatarInfo, roomSession ]);

    function parseVector3d(vectorString: string)
    {
        if (!vectorString) return null;

        const matches = vectorString.match(/\[Vector3d: ([\d.]+), ([\d.]+), ([\d.]+)/);
        if (matches && matches.length === 4)
        {
            return {
                x: parseFloat(matches[1]),
                y: parseFloat(matches[2]),
                z: parseFloat(matches[3])
            };
        }
        return null;
    }

    useMessageEvent<FurnitureFloorUpdateEvent>(FurnitureFloorUpdateEvent, event =>
    {
        const parser = event.getParser();
        const item = parser.item;

        if (item.itemId !== avatarInfo.id) return;

        const locationVector = {
            x: item.x,
            y: item.y,
            z: item.z
        };

        if (locationVector)
        {
            setFurniLocationX(locationVector.x);
            setFurniLocationY(locationVector.y);
            setFurniLocationZ(locationVector.z);
        }

        const directionVector = { x: item.direction };
        const rotationIndex = directionVector ? getRotationIndex(directionVector) : null;

        const state = item.state;

        setFurniDirection(rotationIndex);
        setFurniState(state);
    });

    const handleHeightChange = useCallback((event) =>
    {
        let newZ = parseFloat(event.target.value);
        if (isNaN(newZ) || newZ < 0)
        {
            newZ = 0;
        }
        else if (newZ > 40)
        {
            newZ = 40;
        }
        setFurniLocationZ(newZ);
        sendUpdate(0, 0, newZ, 0);
    }, [ sendUpdate ]);

    const handleHeightBlur = useCallback((event) =>
    {
        let newZ = parseFloat(event.target.value);
        if (isNaN(newZ) || newZ < 0)
        {
            newZ = 0;
        }
        else if (newZ > 40)
        {
            newZ = 40;
        }
        newZ = parseFloat(newZ.toFixed(4));
        setFurniLocationZ(newZ);
        sendUpdate(0, 0, newZ, 0);
    }, [ sendUpdate ]);

    const adjustHeight = useCallback((amount) =>
    {
        let newZ = furniLocationZ + amount;
        if (newZ < 0)
        {
            newZ = 0;
        }
        else if (newZ > 40)
        {
            newZ = 40;
        }
        newZ = parseFloat(newZ.toFixed(4));
        setFurniLocationZ(newZ);
        sendUpdate(0, 0, newZ, 0);
    }, [ furniLocationZ, sendUpdate ]);

    function getValidRoomObjectDirection(roomObject, isPositive)
    {
        if (!roomObject || !roomObject.model) return 0;

        let allowedDirections = [];

        if (roomObject.type === 'monster_plant')
        {
            allowedDirections = roomObject.model.getValue('pet_allowed_directions');
        }
        else
        {
            allowedDirections = roomObject.model.getValue('furniture_allowed_directions');
        }

        let direction = roomObject.getDirection().x;

        if (allowedDirections && allowedDirections.length)
        {
            let index = allowedDirections.indexOf(direction);

            if (index < 0)
            {
                index = 0;
                for (let i = 0; i < allowedDirections.length; i++)
                {
                    if (direction <= allowedDirections[i]) break;
                    index++;
                }
                index = index % allowedDirections.length;
            }

            if (isPositive)
            {
                index = (index + 1) % allowedDirections.length;
            }
            else
            {
                index = (index - 1 + allowedDirections.length) % allowedDirections.length;
            }

            direction = allowedDirections[index];
        }

        return direction;
    }

    useSoundEvent<NowPlayingEvent>(NowPlayingEvent.NPE_SONG_CHANGED, event =>
    {
        setSongId(event.id);
    }, (isJukeBox || isSongDisk));

    useSoundEvent<NowPlayingEvent>(SongInfoReceivedEvent.SIR_TRAX_SONG_INFO_RECEIVED, event =>
    {
        if(event.id !== songId) return;

        const songInfo = GetNitroInstance().soundManager.musicController.getSongInfo(event.id);

        if(!songInfo) return;

        setSongName(songInfo.name);
        setSongCreator(songInfo.creator);
    }, (isJukeBox || isSongDisk));

    useEffect(() =>
    {
        let pickupMode = PICKUP_MODE_NONE;
        let canMove = false;
        let canRotate = false;
        let canUse = false;
        let furniKeyss: string[] = [];
        let furniValuess: string[] = [];
        let customKeyss: string[] = [];
        let customValuess: string[] = [];
        let isCrackable = false;
        let crackableHits = 0;
        let crackableTarget = 0;
        let godMode = false;
        let canSeeFurniId = false;
        let furniIsJukebox = false;
        let furniIsSongDisk = false;
        let furniSongId = -1;

        const isValidController = (avatarInfo.roomControllerLevel >= RoomControllerLevel.GUEST);

        if(isValidController || avatarInfo.isOwner || avatarInfo.isRoomOwner || avatarInfo.isAnyRoomController)
        {
            canMove = true;
            canRotate = !avatarInfo.isWallItem;

            if(avatarInfo.roomControllerLevel >= RoomControllerLevel.MODERATOR) godMode = true;
        }

        if(avatarInfo.isAnyRoomController)
        {
            canSeeFurniId = true;
        }

        if((((avatarInfo.usagePolicy === RoomWidgetFurniInfoUsagePolicyEnum.EVERYBODY) || ((avatarInfo.usagePolicy === RoomWidgetFurniInfoUsagePolicyEnum.CONTROLLER) && isValidController)) || ((avatarInfo.extraParam === RoomWidgetEnumItemExtradataParameter.JUKEBOX) && isValidController)) || ((avatarInfo.extraParam === RoomWidgetEnumItemExtradataParameter.USABLE_PRODUCT) && isValidController)) canUse = true;

        if(avatarInfo.extraParam)
        {
            if(avatarInfo.extraParam === RoomWidgetEnumItemExtradataParameter.CRACKABLE_FURNI)
            {
                const stuffData = (avatarInfo.stuffData as CrackableDataType);

                canUse = true;
                isCrackable = true;
                crackableHits = stuffData.hits;
                crackableTarget = stuffData.target;
            }

            else if(avatarInfo.extraParam === RoomWidgetEnumItemExtradataParameter.JUKEBOX)
            {
                const playlist = GetNitroInstance().soundManager.musicController.getRoomItemPlaylist();

                if(playlist)
                {
                    furniSongId = playlist.nowPlayingSongId;
                }

                furniIsJukebox = true;
            }

            else if(avatarInfo.extraParam.indexOf(RoomWidgetEnumItemExtradataParameter.SONGDISK) === 0)
            {
                furniSongId = parseInt(avatarInfo.extraParam.substr(RoomWidgetEnumItemExtradataParameter.SONGDISK.length));

                furniIsSongDisk = true;
            }

            if(godMode)
            {
                const extraParam = avatarInfo.extraParam.substr(RoomWidgetEnumItemExtradataParameter.BRANDING_OPTIONS.length);

                if(extraParam)
                {
                    const parts = extraParam.split('\t');

                    for(const part of parts)
                    {
                        const value = part.split('=');

                        if(value && (value.length === 2))
                        {
                            furniKeyss.push(value[0]);
                            furniValuess.push(value[1]);
                        }
                    }
                }
            }
        }

        if(godMode)
        {
            const roomObject = GetRoomEngine().getRoomObject(roomSession.roomId, avatarInfo.id, (avatarInfo.isWallItem) ? RoomObjectCategory.WALL : RoomObjectCategory.FLOOR);

            if(roomObject)
            {
                const customVariables = roomObject.model.getValue<string[]>(RoomObjectVariable.FURNITURE_CUSTOM_VARIABLES);
                const furnitureData = roomObject.model.getValue<{ [index: string]: string }>(RoomObjectVariable.FURNITURE_DATA);

                if(customVariables && customVariables.length)
                {
                    for(const customVariable of customVariables)
                    {
                        customKeyss.push(customVariable);
                        customValuess.push((furnitureData[customVariable]) || '');
                    }
                }
            }
        }

        if(avatarInfo.isOwner || avatarInfo.isAnyRoomController) pickupMode = PICKUP_MODE_FULL;

        else if(avatarInfo.isRoomOwner || (avatarInfo.roomControllerLevel >= RoomControllerLevel.GUILD_ADMIN)) pickupMode = PICKUP_MODE_EJECT;

        if(avatarInfo.isStickie) pickupMode = PICKUP_MODE_NONE;

        setPickupMode(pickupMode);
        setCanMove(canMove);
        setCanRotate(canRotate);
        setCanUse(canUse);
        setFurniKeys(furniKeyss);
        setFurniValues(furniValuess);
        setCustomKeys(customKeyss);
        setCustomValues(customValuess);
        setIsCrackable(isCrackable);
        setCrackableHits(crackableHits);
        setCrackableTarget(crackableTarget);
        setGodMode(godMode);
        setCanSeeFurniId(canSeeFurniId);
        setGroupName(null);
        setIsJukeBox(furniIsJukebox);
        setIsSongDisk(furniIsSongDisk);
        setSongId(furniSongId);

        if(avatarInfo.groupId) SendMessageComposer(new GroupInformationComposer(avatarInfo.groupId, false));
    }, [ roomSession, avatarInfo ]);

    useMessageEvent<GroupInformationEvent>(GroupInformationEvent, event =>
    {
        const parser = event.getParser();

        if(!avatarInfo || avatarInfo.groupId !== parser.id || parser.flag) return;

        if(groupName) setGroupName(null);

        setGroupName(parser.title);
    });

    useEffect(() =>
    {
        const songInfo = GetNitroInstance().soundManager.musicController.getSongInfo(songId);

        setSongName(songInfo?.name ?? '');
        setSongCreator(songInfo?.creator ?? '');
    }, [ songId ]);

    const onFurniSettingChange = useCallback((index: number, value: string) =>
    {
        const clone = Array.from(furniValues);

        clone[index] = value;

        setFurniValues(clone);
    }, [ furniValues ]);

    const onCustomVariableChange = useCallback((index: number, value: string) =>
    {
        const clone = Array.from(customValues);

        clone[index] = value;

        setCustomValues(clone);
    }, [ customValues ]);

    const getFurniSettingsAsString = useCallback(() =>
    {
        if(furniKeys.length === 0 || furniValues.length === 0) return '';

        let data = '';

        let i = 0;

        while(i < furniKeys.length)
        {
            const key = furniKeys[i];
            const value = furniValues[i];

            data = (data + (key + '=' + value + '\t'));

            i++;
        }

        return data;
    }, [ furniKeys, furniValues ]);

    const processButtonAction = useCallback((action: string) =>
    {
        if(!action || (action === '')) return;

        let objectData: string = null;

        switch(action)
        {
            case 'buy_one':
                CreateLinkEvent(`catalog/open/offerId/${ avatarInfo.purchaseOfferId }`);
                return;
            case 'move':
                GetRoomEngine().processRoomObjectOperation(avatarInfo.id, avatarInfo.category, RoomObjectOperationType.OBJECT_MOVE);
                break;
            case 'rotate':
                GetRoomEngine().processRoomObjectOperation(avatarInfo.id, avatarInfo.category, RoomObjectOperationType.OBJECT_ROTATE_POSITIVE);
                break;
            case 'pickup':
                if(pickupMode === PICKUP_MODE_FULL)
                {
                    GetRoomEngine().processRoomObjectOperation(avatarInfo.id, avatarInfo.category, RoomObjectOperationType.OBJECT_PICKUP);
                }
                else
                {
                    GetRoomEngine().processRoomObjectOperation(avatarInfo.id, avatarInfo.category, RoomObjectOperationType.OBJECT_EJECT);
                }
                break;
            case 'use':
                GetRoomEngine().useRoomObject(avatarInfo.id, avatarInfo.category);
                break;
            case 'save_branding_configuration': {
                const mapData = new Map<string, string>();
                const dataParts = getFurniSettingsAsString().split('\t');

                if(dataParts)
                {
                    for(const part of dataParts)
                    {
                        const [ key, value ] = part.split('=', 2);

                        mapData.set(key, value);
                    }
                }

                GetRoomEngine().modifyRoomObjectDataWithMap(avatarInfo.id, avatarInfo.category, RoomObjectOperationType.OBJECT_SAVE_STUFF_DATA, mapData);
                break;
            }
            case 'save_custom_variables': {
                const map = new Map();

                for(let i = 0; i < customKeys.length; i++)
                {
                    const key = customKeys[i];
                    const value = customValues[i];

                    if((key && key.length) && (value && value.length)) map.set(key, value);
                }

                SendMessageComposer(new SetObjectDataMessageComposer(avatarInfo.id, map));
                break;
            }
        }
    }, [ avatarInfo, pickupMode, customKeys, customValues, getFurniSettingsAsString ]);

    const getGroupBadgeCode = useCallback(() =>
    {
        const stringDataType = (avatarInfo.stuffData as StringDataType);

        if(!stringDataType || !(stringDataType instanceof StringDataType)) return null;

        return stringDataType.getValue(2);
    }, [ avatarInfo ]);

    if(!avatarInfo) return null;

    return (
        <Column gap={ 1 } alignItems="end">
            <Column className="nitro-infostand rounded">
                <Column overflow="visible" className="container-fluid content-area" gap={ 1 }>
                    <Column gap={ 1 }>
                        <Flex alignItems="center" justifyContent="between" gap={ 1 }>
                            <Text variant="white" small wrap>{ avatarInfo.name }</Text>
                            <FaTimes className="cursor-pointer fa-icon" onClick={ onClose } />
                        </Flex>
                        <hr className="m-0" />
                    </Column>
                    <Column gap={ 1 }>
                        <Flex position="relative" gap={ 1 }>
                            { avatarInfo.stuffData.isUnique &&
                                <div className="position-absolute end-0">
                                    <LayoutLimitedEditionCompactPlateView uniqueNumber={ avatarInfo.stuffData.uniqueNumber } uniqueSeries={ avatarInfo.stuffData.uniqueSeries } />
                                </div> }
                            { (avatarInfo.stuffData.rarityLevel > -1) &&
                                <div className="position-absolute end-0">
                                    <LayoutRarityLevelView level={ avatarInfo.stuffData.rarityLevel } />
                                </div> }
                            { avatarInfo.image && avatarInfo.image.src.length &&
                                <img className="d-block mx-auto" src={ avatarInfo.image.src } alt="" /> }
                        </Flex>
                        <hr className="m-0" />
                    </Column>
                    <Column gap={ 1 }>
                        <Text fullWidth wrap textBreak variant="white" small>{ avatarInfo.description }</Text>
                        <hr className="m-0" />
                    </Column>
                    <Column gap={ 1 }>
                        <Flex alignItems="center" gap={ 1 }>
                            <UserProfileIconView userId={ avatarInfo.ownerId } />
                            <Text variant="white" small wrap>
                                { LocalizeText('furni.owner', [ 'name' ], [ avatarInfo.ownerName ]) }
                            </Text>
                        </Flex>
                        { (avatarInfo.purchaseOfferId > 0) &&
                            <Flex>
                                <Text variant="white" small underline pointer onClick={ event => processButtonAction('buy_one') }>
                                    { LocalizeText('infostand.button.buy') }
                                </Text>
                            </Flex> }
                    </Column>
                    { (isJukeBox || isSongDisk) &&
                        <Column gap={ 1 }>
                            <hr className="m-0" />
                            { (songId === -1) &&
                                <Text variant="white" small wrap>
                                    { LocalizeText('infostand.jukebox.text.not.playing') }
                                </Text> }
                            { !!songName.length &&
                                <Flex alignItems="center" gap={ 1 }>
                                    <Base className="icon disk-icon" />
                                    <Text variant="white" small wrap>
                                        { songName }
                                    </Text>
                                </Flex> }
                            { !!songCreator.length &&
                                <Flex alignItems="center" gap={ 1 }>
                                    <Base className="icon disk-creator" />
                                    <Text variant="white" small wrap>
                                        { songCreator }
                                    </Text>
                                </Flex> }
                        </Column> }
                    <Column gap={ 1 }>
                        { isCrackable &&
                            <>
                                <hr className="m-0" />
                                <Text variant="white" small wrap>{ LocalizeText('infostand.crackable_furni.hits_remaining', [ 'hits', 'target' ], [ crackableHits.toString(), crackableTarget.toString() ]) }</Text>
                            </> }
                        { avatarInfo.groupId > 0 &&
                            <>
                                <hr className="m-0" />
                                <Flex pointer alignItems="center" gap={ 2 } onClick={ () => GetGroupInformation(avatarInfo.groupId) }>
                                    <LayoutBadgeImageView badgeCode={ getGroupBadgeCode() } isGroup={ true } />
                                    <Text variant="white" underline>{ groupName }</Text>
                                </Flex>
                            </> }
                        { godMode &&
                            <>
                                <hr className="m-0" />
                                { canSeeFurniId && <Text small wrap variant="white">ID: { avatarInfo.id }</Text> }
                                { (!avatarInfo.isWallItem && canMove) &&
                                    <>
                                        <Button className="infostand-buttons px-2"
                                                onClick={ () => setDropdownOpen(!dropdownOpen) }>
                                            { dropdownOpen ? 'Close Buildtools' : 'Open Buildtools' }
                                        </Button>
                                        { dropdownOpen &&
                                            <>
                                                <Flex gap={ 1 }>
                                                    <Column className="buildtool-box">
                                                        <Column fullWidth>
                                                            <Text variant="white">Position:</Text>
                                                            <Column justifyContent="center" alignItems="center"
                                                                    className="button-w-height">
                                                                <Flex className="floor-button-l-gap">
                                                                    <Base
                                                                        className="buildtool-l-button button-2-l-rotation"
                                                                        onClick={ () => sendUpdate(-1, 0, furniLocationZ, 0) }>
                                                                        <GrNext className="fa-icon icon-color"/>
                                                                    </Base>
                                                                    <Base
                                                                        className="buildtool-l-button button-4-l-rotation"
                                                                        onClick={ () => sendUpdate(0, -1, furniLocationZ, 0) }>
                                                                        <GrNext className="fa-icon icon-color"/>
                                                                    </Base>
                                                                </Flex>
                                                                <Flex className="floor-button-l-gap">
                                                                    <Base
                                                                        className="buildtool-l-button button-1-l-rotation"
                                                                        onClick={ () => sendUpdate(0, 1, furniLocationZ, 0) }>
                                                                        <GrNext className="fa-icon icon-color"/>
                                                                    </Base>
                                                                    <Base
                                                                        className="buildtool-l-button button-3-l-rotation"
                                                                        onClick={ () => sendUpdate(1, 0, furniLocationZ, 0) }>
                                                                        <GrNext className="fa-icon icon-color"/>
                                                                    </Base>
                                                                </Flex>
                                                            </Column>
                                                            <Text variant="white">Rotate:</Text>
                                                            <Flex center className="floor-button-l-gap">
                                                                <Base className="buildtool-l-button"
                                                                      onClick={ () => sendUpdate(0, 0, furniLocationZ, -1) }>
                                                                    <GrRotateLeft className="fa-icon icon-color"/>
                                                                </Base>
                                                                <Base className="buildtool-l-button"
                                                                      onClick={ () => sendUpdate(0, 0, furniLocationZ, 1) }>
                                                                    <GrRotateRight className="fa-icon icon-color"/>
                                                                </Base>
                                                            </Flex>
                                                        </Column>
                                                    </Column>
                                                    <Column className="buildtool-box">
                                                        <Column fullWidth>
                                                            <Text variant="white">Height:</Text>
                                                            <input
                                                                spellCheck="false"
                                                                type="number"
                                                                className="form-control form-control-sm"
                                                                value={ furniLocationZ !== null ? furniLocationZ.toString() : '' }
                                                                onChange={ handleHeightChange }
                                                                onBlur={ handleHeightBlur }
                                                                min={ 0 }
                                                                max={ 40 }
                                                                step={ 0.1 }
                                                            />
                                                            <Flex justifyContent="center" gap={ 1 }>
                                                                <Column>
                                                                    <Base className="buildtool-l-button"
                                                                          onClick={ () => adjustHeight(1) }>+</Base>
                                                                    <Text variant="white" align="center">1</Text>
                                                                    <Base className="buildtool-l-button"
                                                                          onClick={ () => adjustHeight(-1) }>-</Base>
                                                                </Column>
                                                                <Column>
                                                                    <Base className="buildtool-l-button"
                                                                          onClick={ () => adjustHeight(0.1) }>+</Base>
                                                                    <Text variant="white" align="center">0.1</Text>
                                                                    <Base className="buildtool-l-button"
                                                                          onClick={ () => adjustHeight(-0.1) }>-</Base>
                                                                </Column>
                                                                <Column>
                                                                    <Base className="buildtool-l-button"
                                                                          onClick={ () => adjustHeight(0.01) }>+</Base>
                                                                    <Text variant="white" align="center">0.01</Text>
                                                                    <Base className="buildtool-l-button"
                                                                          onClick={ () => adjustHeight(-0.01) }>-</Base>
                                                                </Column>
                                                            </Flex>
                                                        </Column>
                                                    </Column>
                                                </Flex>
                                            </>
                                        }
                                    </>
                                }

                                { (furniKeys.length > 0) &&
                                    <>
                                        <hr className="m-0"/>
                                        <Column gap={ 1 }>
                                            { furniKeys.map((key, index) =>
                                            {
                                                return (
                                                    <Flex key={ index } alignItems="center" gap={ 1 }>
                                                        <Text small wrap align="end" variant="white" className="col-4">{ key }</Text>
                                                        <input type="text" className="form-control form-control-sm" value={ furniValues[index] } onChange={ event => onFurniSettingChange(index, event.target.value) }/>
                                                    </Flex>);
                                            }) }
                                        </Column>
                                    </> }

                            </> }
                        { (customKeys.length > 0) &&
                            <>
                                <hr className="m-0 my-1"/>
                                <Column gap={ 1 }>
                                    { customKeys.map((key, index) =>
                                    {
                                        return (
                                            <Flex key={ index } alignItems="center" gap={ 1 }>
                                                <Text small wrap align="end" variant="white" className="col-4">{ key }</Text>
                                                <input type="text" className="form-control form-control-sm" value={ customValues[index] } onChange={ event => onCustomVariableChange(index, event.target.value) }/>
                                            </Flex>);
                                    }) }
                                </Column>
                            </> }
                    </Column>
                </Column>
            </Column>
            <Flex gap={ 1 } justifyContent="end">
                { canMove &&
                    <Button variant="dark" onClick={ event => processButtonAction('move') }>
                        { LocalizeText('infostand.button.move') }
                    </Button> }
                { canRotate &&
                    <Button variant="dark" onClick={ event => processButtonAction('rotate') }>
                        { LocalizeText('infostand.button.rotate') }
                    </Button> }
                { (pickupMode !== PICKUP_MODE_NONE) &&
                    <Button variant="dark" onClick={ event => processButtonAction('pickup') }>
                        { LocalizeText((pickupMode === PICKUP_MODE_EJECT) ? 'infostand.button.eject' : 'infostand.button.pickup') }
                    </Button> }
                { canUse &&
                    <Button variant="dark" onClick={ event => processButtonAction('use') }>
                        { LocalizeText('infostand.button.use') }
                    </Button> }
                { ((furniKeys.length > 0 && furniValues.length > 0) && (furniKeys.length === furniValues.length)) &&
                    <Button variant="dark" onClick={ () => processButtonAction('save_branding_configuration') }>
                        { LocalizeText('save') }
                    </Button> }
                { ((customKeys.length > 0 && customValues.length > 0) && (customKeys.length === customValues.length)) &&
                    <Button variant="dark" onClick={ () => processButtonAction('save_custom_variables') }>
                        { LocalizeText('save') }
                    </Button> }
            </Flex>
        </Column>
    );
}
