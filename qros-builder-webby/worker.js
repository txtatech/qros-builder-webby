self.addEventListener('message', function(e) {
    let dbReq = indexedDB.open('qrDB', 1);
    dbReq.onsuccess = function(event) {
        let db = event.target.result;
        let tx = db.transaction(['blobs'], 'readonly');
        let store = tx.objectStore('blobs');
        let req = store.getAll();
        req.onsuccess = function(event) {
            let blobDataArray = event.target.result;
            let htmlLines = blobDataArray.map(blobData => {
                let url = URL.createObjectURL(blobData.blob);
                let type = blobData.type || 'unknown';  // Use 'unknown' if type is not defined
                return '<a href="' + url + '" target="_blank">' + url + '</a> ' + type;
            });
            self.postMessage(htmlLines);
        }
    }
}, false);
