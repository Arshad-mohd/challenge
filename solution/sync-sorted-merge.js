class LogEntry {
    constructor(sourceIndex, timestamp, message) {
        this.sourceIndex = sourceIndex;
        this.timestamp = timestamp;
        this.message = message;
    }
}

function drainLogsSynchronously(logSources) {
    const minHeap = new MinHeap();

    
    for (let i = 0; i < logSources.length; i++) {
        const logSource = logSources[i];
        const logEntry = logSource.pop(); 
        if (logEntry !== false) {
            minHeap.insert(new LogEntry(i, logEntry.date, logEntry.msg));
        }
    }

    
    while (!minHeap.isEmpty()) {
        const earliestLogEntry = minHeap.extractMin();
        console.log(`[${earliestLogEntry.timestamp}] ${earliestLogEntry.message}`);

        const nextLogEntry = logSources[earliestLogEntry.sourceIndex].pop(); 
        if (nextLogEntry !== false) {
            minHeap.insert(new LogEntry(earliestLogEntry.sourceIndex, nextLogEntry.date, nextLogEntry.msg));
        }
    }
}

drainLogsSynchronously(logSources);
