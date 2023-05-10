export function coppyObjectWithoutNullProperty(object) {
    const coppyObject = {};
    for (const [key, value] of Object.entries(object)) {
        object[key] && (coppyObject[key] = object[key]);
    }
    return coppyObject;
}
