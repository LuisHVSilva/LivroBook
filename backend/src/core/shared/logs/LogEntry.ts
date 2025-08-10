export interface LogEntry {
    timestamp: string;
    level: 'INFO' | 'ERROR' | 'WARNING';
    className: string;
    method: string;
    message: string;
    status?: number;
    info?: any;
}
