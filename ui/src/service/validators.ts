
export const dimensiuniValide = (value?: string): boolean => {
    let regExp = new RegExp('/([0-9]+x[0-9]+)/');

    if (value)
        return regExp.test(value);
    
    return false;
}

export const isNumberOnly = (value?: string): boolean => {
    let regExp = new RegExp('/^[0-9]*$/');

    if (value)
        return regExp.test(value);
    
    return false;
}