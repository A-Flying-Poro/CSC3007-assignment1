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

const apiUrl: string = 'https://api.data.gov.sg/v1/environment/psi'
const timezoneOffset: string = '+08:00'

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
    table.rows.add(data);
    table.draw(false);

    $('#captionUpdating').addClass('d-none');
    $('#captionUpdated').removeClass('d-none');
}

async function fetchData() {
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

        return tableData;
    } catch (e) {
        console.error('Error occurred while fetching data.', e);
        throw e;
    }
}