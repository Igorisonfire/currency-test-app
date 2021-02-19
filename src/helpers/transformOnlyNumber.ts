export const transformOnlyNumber = (value: string) => {
    return value.replace(/^\.|[^\d\.]|\.(?=.*\.)|^0+(?=\d)/g, '');
};
