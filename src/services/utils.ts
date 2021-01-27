export const getInitialsFromName = (name: string): string => {
    const nameArr = name.split(' ');
    return nameArr
        .map((n, i) => (i === 0 || i === nameArr.length - 1) && n[0])
        .filter((n) => n)
        .join('');
};

export const supportsScrollIntoViewIfNeeded = (
    e: Element | IElementWithScrollIntoViewIfNeeded
): e is IElementWithScrollIntoViewIfNeeded => {
    return typeof (e as IElementWithScrollIntoViewIfNeeded).scrollIntoViewIfNeeded === 'function';
};

export interface IElementWithScrollIntoViewIfNeeded extends Element {
    scrollIntoViewIfNeeded: (center?: boolean) => void;
}
