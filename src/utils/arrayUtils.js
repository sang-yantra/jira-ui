export const moveItemWithinArray = (arr, item, newIndex) => {
    const arrClone = [...arr];
    const oldIndex = arrClone.indexOf(item);
    arrClone.splice(newIndex, 0, arrClone.splice(oldIndex, 1)[0]);
    return arrClone;
};

export const insertItemIntoArray = (arr, item, index) => {
    const arrClone = [...arr];
    arrClone.splice(index, 0, item);
    return arrClone;
};

export const updateArrayItemById = (arr, itemId, fields) => {
    const arrClone = [...arr];
    const item = arrClone.find(({ id }) => id === itemId);
    if (item) {
        const itemIndex = arrClone.indexOf(item);
        arrClone.splice(itemIndex, 1, { ...item, ...fields });
    }
    return arrClone;
};

export const sortByNewest = (items, sortField) =>
    items.sort((a, b) => -a[sortField].localeCompare(b[sortField]));

// a little function to help us with reordering the result
export const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

export const reorderQuoteMap = ({ quoteMap, source, destination }) => {
    const current = [...quoteMap[source.droppableId]];
    const next = [...quoteMap[destination.droppableId]];
    const target = current[source.index];

    // moving to same list
    if (source.droppableId === destination.droppableId) {
        const reordered = reorder(current, source.index, destination.index);
        const result = {
            ...quoteMap,
            [source.droppableId]: reordered
        };
        return {
            quoteMap: result
        };
    }

    // moving to different list

    // remove from original
    current.splice(source.index, 1);
    // insert into next
    next.splice(destination.index, 0, target);

    const result = {
        ...quoteMap,
        [source.droppableId]: current,
        [destination.droppableId]: next
    };

    return {
        quoteMap: result
    };
};