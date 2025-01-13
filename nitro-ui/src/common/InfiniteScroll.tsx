import { useVirtualizer } from '@tanstack/react-virtual';
import { FC, Fragment, ReactElement, useEffect, useRef } from 'react';
import { Base } from './Base';

interface InfiniteScrollProps<T = any> {
    rows: T[];
    overscan?: number;
    scrollToBottom?: boolean;
    rowRender: (row: T) => ReactElement;
}

export const InfiniteScroll: FC<InfiniteScrollProps> = props => {
    const { rows = [], overscan = 5, scrollToBottom = false, rowRender = null } = props;
    const elementRef = useRef<HTMLDivElement>(null);

    const rowVirtualizer = useVirtualizer({
        count: rows.length,
        getScrollElement: () => elementRef.current,
        overscan,
        estimateSize: () => 50, // Adjust this value based on the average height of your rows
    });

    useEffect(() => {
        if (scrollToBottom && rows.length > 0) {
            rowVirtualizer.scrollToIndex(rows.length - 1, { align: 'end' });
        }
    }, [scrollToBottom, rows.length, rowVirtualizer]);

    const virtualItems = rowVirtualizer.getVirtualItems();
    const totalSize = rowVirtualizer.getTotalSize();

    return (
        <Base fit innerRef={elementRef} position="relative" overflow="auto">
            <div style={{ height: `${totalSize}px`, position: 'relative' }}>
                {virtualItems.map(virtualRow => {
                    const row = rows[virtualRow.index];

                    if (!row) return <Fragment key={virtualRow.key} />;

                    return (
                        <div
                            key={virtualRow.key}
                            data-index={virtualRow.index}
                            style={{
                                position: 'absolute',
                                top: `${virtualRow.start}px`,
                                left: 0,
                                width: '100%',
                                height: `${virtualRow.size}px`,
                            }}
                        >
                            {rowRender(row)}
                        </div>
                    );
                })}
            </div>
        </Base>
    );
};
