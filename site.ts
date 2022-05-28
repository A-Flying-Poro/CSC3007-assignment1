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
    }
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
        }
    }[]
    region_metadata: {
        name: string;
        label_location: {
            latitude: number;
            longitude: number;
        }
    }[]
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

const apiUrl: string = 'https://api.data.gov.sg/v1/environment/psi'

let table;
// let lastUpdated: Date = null;

$(document).ready(async event => {
    table = $('#tableData').DataTable({
        columns: [
            {
                name: 'metric',
                data: 'metric'
            },
            {
                name: 'national',
                data: 'national'
            },
            {
                name: 'central',
                data: 'central'
            },
            {
                name: 'west',
                data: 'west'
            },
            {
                name: 'east',
                data: 'east'
            },
            {
                name: 'north',
                data: 'north'
            },
            {
                name: 'south',
                data: 'south'
            }
        ],
        pageLength: 25
    });

    await updateTable();
    setInterval(async () => {
        await updateTable();
    }, 60 * 1000);
});

async function updateTable() {
    let data = await fetchData();

    table.clear();
    table.rows.add(data.tableData);
    table.draw(false);

    $('#captionUpdating').addClass('d-none');
    $('#captionUpdated').removeClass('d-none');
    $('#captionLastUpdated')
        .text(getTimeDifference(new Date(), data.lastUpdated, false))
        .prop('title', data.lastUpdated)
}

async function fetchData(): Promise<ApiData> {
    try {
        let response = await fetch(apiUrl);
        let responseJson: ApiResponse = await response.json();

        let tableData: TableData[] = [];
        for (const metric in responseJson.items[0].readings) {
            const item = responseJson.items[0].readings[metric];
            tableData.push({
                metric: metric,
                national: item.national,
                central: item.central,
                west: item.west,
                east: item.east,
                north: item.north,
                south: item.south
            })
        }
        let lastUpdated = new Date(responseJson.items[0].update_timestamp)

        return {
            tableData: tableData,
            lastUpdated: lastUpdated
        };
    } catch (e) {
        console.error('Error occurred while fetching data.', e);
        throw e;
    }
}

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
function getTimeDifference(dateFrom: Date, dateTo: Date, capitalise: boolean = true) {
    let after = dateTo - dateFrom > 0;
    let timePresentPast = after ? 'later' : 'ago';
    let timeDiffMili = Math.abs(dateTo - dateFrom);
    let timeDiffSec = Math.floor(timeDiffMili / 1000);
    if (timeDiffSec < 5)
        return `${capitalise ? 'J' : 'j'}ust now`;
    let timeDiffMin = Math.floor(timeDiffSec / 60);
    if (timeDiffMin < 1)
        return `${timeDiffSec} seconds ${timePresentPast}`;
    let timeDiffHour = Math.floor(timeDiffMin / 60);
    if (timeDiffHour < 1)
        return `${timeDiffMin} minute${timeDiffMin > 1 ? 's' : ''} ${timePresentPast}`;
    let timeDiffDays = Math.floor(timeDiffHour / 24);
    if (timeDiffDays < 1)
        return `${timeDiffHour} hour${timeDiffHour > 1 ? 's' : ''} ${timePresentPast}`;
    return `${timeDiffDays} day${timeDiffDays > 1 ? 's' : ''} ${timePresentPast}`;
}