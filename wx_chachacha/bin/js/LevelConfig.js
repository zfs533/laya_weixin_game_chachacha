/*
* name;
*/
var LevelConfig = /** @class */ (function () {
    function LevelConfig() {
    }
    LevelConfig.getCurrentLevelData = function () {
        var lv = PlayerData.gamePattern == 2 ? PlayerData.doubleLevel : PlayerData.singleLevel;
        var top_level = this.data_level.length;
        lv = lv % top_level;
        lv = lv == 0 ? 1 : lv;
        return this.data_level[lv - 1];
    };
    LevelConfig.data_level = [
        { id: 1001, arrow: 0, level: 1, origin: 4, target: 10 + 12 },
        { id: 1002, arrow: 1, level: 2, origin: 10, target: 10 + 6 },
        { id: 1003, arrow: 2, level: 3, origin: 6, target: 10 + 10 },
        { id: 1004, arrow: 3, level: 4, origin: 8, target: 10 + 8 },
        { id: 1005, arrow: 4, level: 5, origin: 0, target: 10 + 16 },
        { id: 1006, arrow: 5, level: 6, origin: 14, target: 10 + 2 },
        { id: 1007, arrow: 4, level: 7, origin: 7, target: 10 + 9 },
        { id: 1008, arrow: 3, level: 8, origin: 8, target: 10 + 8 },
        { id: 1009, arrow: 2, level: 9, origin: 9, target: 10 + 7 },
        { id: 1010, arrow: 1, level: 10, origin: 0, target: 10 + 16 },
        { id: 1011, arrow: 0, level: 11, origin: 5, target: 10 + 11 },
        { id: 1012, arrow: 3, level: 12, origin: 7, target: 10 + 9 },
        { id: 1013, arrow: 2, level: 13, origin: 3, target: 10 + 13 },
        { id: 1014, arrow: 4, level: 14, origin: 12, target: 10 + 4 },
        { id: 1015, arrow: 5, level: 15, origin: 13, target: 10 + 3 },
        { id: 1016, arrow: 2, level: 16, origin: 6, target: 10 + 10 },
        { id: 1017, arrow: 1, level: 17, origin: 7, target: 10 + 9 },
        { id: 1018, arrow: 0, level: 18, origin: 8, target: 10 + 8 },
        { id: 1019, arrow: 5, level: 19, origin: 9, target: 10 + 7 },
        { id: 1020, arrow: 3, level: 20, origin: 10, target: 10 + 6 },
    ];
    return LevelConfig;
}());
//# sourceMappingURL=LevelConfig.js.map