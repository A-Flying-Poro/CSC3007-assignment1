interface ApiReadings {
    west: number;
    national: number;
    east: number;
    central: number;
    south: number;
    north: number;
}
interface ApiResponse {
    api_info: {
        status: string;
    };
    items: {
        timestamp: string;
        update_timestamp: string;
        readings: {
            o3_sub_index: ApiReadings;
            pm10_twenty_four_hourly: ApiReadings;
            pm10_sub_index: ApiReadings;
            co_sub_index: ApiReadings;
            pm25_twenty_four_hourly: ApiReadings;
            so2_sub_index: ApiReadings;
            co_eight_hour_max: ApiReadings;
            no2_one_hour_max: ApiReadings;
            so2_twenty_four_hourly: ApiReadings;
            pm25_sub_index: ApiReadings;
            psi_twenty_four_hourly: ApiReadings;
            o3_eight_hour_max: ApiReadings;
        };
    }[];
    region_metadata: {
        name: string;
        label_location: {
            latitude: number;
            longitude: number;
        };
    }[];
}
interface TableData {
    metric: string;
    national: number;
    central: number;
    west: number;
    east: number;
    north: number;
    south: number;
}
interface ApiData {
    tableData: TableData[];
    lastUpdated: Date;
}
declare const apiUrl: string;
declare let table: any;
declare function updateTable(): Promise<void>;
declare function fetchData(): Promise<ApiData>;
/**
 * Returns a string for brief description of the duration between the 2 Date objects.
 * e.g. 1 min ago, 3 mins later
 * If the dateFrom is after dateTo, time returned will be in the past (ago)
 * If the dateFrom is before dateTo, time returned will be in the future (later)
 * If the dateFrom is within 5 seconds from dateTo, time returned will be "just now"
 * @param {Date} dateFrom Date object to measure from
 * @param {Date} dateTo Date object to measure to
 * @param {boolean} capitalise True if the first character is to be capitalised
 * @returns {string} A brief description of the duration betwen the 2 Date objects, e.g. 1 min ago
 */
declare function getTimeDifference(dateFrom: Date, dateTo: Date, capitalise?: boolean): string;
