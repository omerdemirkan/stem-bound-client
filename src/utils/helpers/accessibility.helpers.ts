export function a11yProps(id: string, index: any) {
    return {
        id: `${id}-${index + 1}`,
        "aria-controls": `${id}-${index + 1}`,
    };
}
