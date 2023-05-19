//@ts-nocheck

//*  indexedDb api
export const DbApi = {
    openDatabase: (databaseName: string, version: number): Promise<IDBDatabase> => {
        return new Promise((resolve, reject) => {
            const request = window.indexedDB.open(databaseName, version)

            request.onerror = (event) => {
                reject(event.target.error)
            }

            request.onsuccess = (event) => {
                const db = event.target.result as IDBDatabase
                resolve(db)
            }

            request.onupgradeneeded = (event) => {
                const db = event.target.result as IDBDatabase
                // Perform any necessary schema upgrades here
            }
        })
    },

    getObjectStore: (
        db: IDBDatabase,
        storeName: string,
        mode: IDBTransactionMode = 'readonly',
    ): IDBObjectStore => {
        const transaction = db.transaction(storeName, mode)
        const objectStore = transaction.objectStore(storeName)
        return objectStore
    },

    getAll: <T>(objectStore: IDBObjectStore): Promise<T[]> => {
        return new Promise((resolve, reject) => {
            const request = objectStore.getAll()

            request.onerror = (event) => {
                reject(event.target.error)
            }

            request.onsuccess = (event) => {
                const data = event.target.result as T[]
                resolve(data)
            }
        })
    },

    getById: <T>(objectStore: IDBObjectStore, id: any): Promise<T | undefined> => {
        return new Promise((resolve, reject) => {
            const request = objectStore.get(id)

            request.onerror = (event) => {
                reject(event.target.error)
            }

            request.onsuccess = (event) => {
                const data = event.target.result as T
                resolve(data)
            }
        })
    },

    add: <T>(objectStore: IDBObjectStore, data: T): Promise<void> => {
        return new Promise((resolve, reject) => {
            const request = objectStore.add(data)

            request.onerror = (event) => {
                reject(event.target.error)
            }

            request.onsuccess = () => {
                resolve()
            }
        })
    },

    update: <T>(objectStore: IDBObjectStore, data: T): Promise<void> => {
        return new Promise((resolve, reject) => {
            const request = objectStore.put(data)

            request.onerror = (event) => {
                reject(event.target.error)
            }

            request.onsuccess = () => {
                resolve()
            }
        })
    },

    deleteById: (objectStore: IDBObjectStore, id: any): Promise<void> => {
        return new Promise((resolve, reject) => {
            const request = objectStore.delete(id)

            request.onerror = (event) => {
                reject(event.target.error)
            }

            request.onsuccess = () => {
                resolve()
            }
        })
    },
}
