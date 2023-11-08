const dbName = process.env.VUE_APP_DB_NAME;
const dbVersion = process.env.VUE_APP_DB_VERSION;
const objectStoreName = process.env.VUE_APP_OBJECT_STORE_NAME;

export function getAllBlobsFromIndexedDB(
  callback: (blobs: Blob[]) => void
): void {
  const request: IDBOpenDBRequest = indexedDB.open(dbName, dbVersion);

  request.onupgradeneeded = () => {
    const db: IDBDatabase = request.result as IDBDatabase;

    // Define the object store if it doesn't exist
    if (!db.objectStoreNames.contains(objectStoreName)) {
      const objectStore: IDBObjectStore = db.createObjectStore(
        objectStoreName,
        {
          keyPath: "id",
          autoIncrement: true,
        }
      );

      // Set up the structure of the object store
      objectStore.createIndex("blobData", "blobData", { unique: false });
    }
  };

  request.onsuccess = () => {
    const db: IDBDatabase = request.result as IDBDatabase;

    const blobs: Blob[] = [];

    if (!db.objectStoreNames.contains(objectStoreName)) {
      db.close();
      return;
    }

    // Create a transaction for read-only access
    const transaction: IDBTransaction = db.transaction(
      [objectStoreName],
      "readonly"
    );

    // Get the object store
    const objectStore: IDBObjectStore =
      transaction.objectStore(objectStoreName);

    const cursorRequest: IDBRequest = objectStore.openCursor();

    cursorRequest.onsuccess = () => {
      const cursor: IDBCursorWithValue | null =
        cursorRequest.result as IDBCursorWithValue;

      if (cursor) {
        const result: { blobData: Blob } = cursor.value;
        blobs.push(result.blobData);
        cursor.continue();
      } else {
        callback(blobs);
      }
    };
  };
  request.onerror = () => {
    alert(`ERROR: ${request.error}`);
  };
}

export const addBlobToIndexedDB = (blob: Blob) => {
  const request: IDBOpenDBRequest = indexedDB.open(dbName, dbVersion);

  request.onupgradeneeded = () => {
    const db: IDBDatabase = request.result as IDBDatabase;

    // Define the object store if it doesn't exist
    if (!db.objectStoreNames.contains(objectStoreName)) {
      const objectStore: IDBObjectStore = db.createObjectStore(
        objectStoreName,
        {
          keyPath: "id",
          autoIncrement: true,
        }
      );

      // Set up the structure of the object store
      objectStore.createIndex("blobData", "blobData", { unique: false });
    }
  };

  request.onsuccess = () => {
    const db: IDBDatabase = request.result as IDBDatabase;

    // Create a transaction for read/write access
    const transaction: IDBTransaction = db.transaction(
      [objectStoreName],
      "readwrite"
    );

    // Get the object store
    const objectStore: IDBObjectStore =
      transaction.objectStore(objectStoreName);

    // Create a data object to store the Blob
    const data: { blobData: Blob } = { blobData: blob };

    // Add the data to the object store
    const addRequest: IDBRequest = objectStore.add(data);

    addRequest.onsuccess = () => {
      alert(
        "Video recording added successfully. Please open the extension to preview"
      );
    };

    transaction.oncomplete = () => {
      // Close the database
      db.close();
    };
  };

  request.onerror = () => {
    alert(`ERROR: ${request.error}`);
  };
};
