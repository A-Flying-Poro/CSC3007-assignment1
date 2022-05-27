var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var apiUrl = 'https://api.data.gov.sg/v1/environment/psi';
var timezoneOffset = '+08:00';
var table;
// let lastUpdated: Date = null;
$(document).ready(function (event) { return __awaiter(_this, void 0, void 0, function () {
    var _this = this;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
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
                return [4 /*yield*/, updateTable()];
            case 1:
                _a.sent();
                setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, updateTable()];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); }, 60 * 1000);
                return [2 /*return*/];
        }
    });
}); });
function updateTable() {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchData()];
                case 1:
                    data = _a.sent();
                    table.clear();
                    table.rows.add(data);
                    table.draw(false);
                    $('#captionUpdating').addClass('d-none');
                    $('#captionUpdated').removeClass('d-none');
                    return [2 /*return*/];
            }
        });
    });
}
function fetchData() {
    return __awaiter(this, void 0, void 0, function () {
        var response, responseJson, tableData, metric, item, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch(apiUrl)];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    responseJson = _a.sent();
                    tableData = [];
                    for (metric in responseJson.items[0].readings) {
                        item = responseJson.items[0].readings[metric];
                        tableData.push({
                            metric: metric,
                            national: item.national,
                            central: item.central,
                            west: item.west,
                            east: item.east,
                            north: item.north,
                            south: item.south
                        });
                    }
                    return [2 /*return*/, tableData];
                case 3:
                    e_1 = _a.sent();
                    console.error('Error occurred while fetching data.', e_1);
                    throw e_1;
                case 4: return [2 /*return*/];
            }
        });
    });
}
