const store = new Map();

export function getCache(key) {
        const entry = store.get(key);
        if(!entry ) return null;
        if(Date.now() > entry.expiry) {
            store.delete(key);
            return null;
        }
        return entry.value;
}

export function setCache(key, value, ttl =DEAULT_TTL) {
    store.set(key, {
        value,
        expiry: Date.now() + ttl,
    });
}

export function clearCache() {
    store.clear();
}
