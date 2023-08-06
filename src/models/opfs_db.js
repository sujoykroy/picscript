export class OpfsDb {
    constructor(dbName) {
        this._dbName = dbName;
    }

    async init() {
        this._opfsRoot = await navigator.storage.getDirectory(this._dbName, { create: true });
        await this.getKeys();
    }

    async getKeys() {
        let keys = [];
        for await (const [key, value] of this._opfsRoot.entries()) {
            keys.push(key);
        }
        return keys;
    }

    async getContent(key, objectClass) {
        let fileHandle;
        try {
            fileHandle = await this._opfsRoot.getFileHandle(key);
        } catch (e) {
            console.log(e);
            return null;
        }
        const file = await fileHandle.getFile();
        let text = await file.text();
        let contentObject;
        try {
            contentObject = new objectClass(JSON.parse(text));
        } catch (e) {
            console.log(e);
            return null;
        }
        return contentObject;
    }

    async saveContent(key, contentObject) {
        console.log('saveContent', key);
        let fileHandle;
        try {
            fileHandle = await this._opfsRoot.getFileHandle(key, { create: true });
        } catch (e) {
            console.log(e);
            return false;
        }
        const writable = await fileHandle.createWritable();
        await writable.write(JSON.stringify(contentObject.toJSON()));
        await writable.close();
        return true;
    }
}
