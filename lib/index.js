"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiPointTouch = exports.handleSimilarity = exports.cosineSimilarity = void 0;
// 计算两个向量的点积
function dotProduct(vector1, vector2) {
    var dot = 0;
    for (var i = 0; i < vector1.length; i++) {
        dot += vector1[i] * vector2[i];
    }
    return dot;
}
// 计算向量的模长（范数）
function vectorLength(vector) {
    var sum = 0;
    for (var i = 0; i < vector.length; i++) {
        sum += vector[i] * vector[i];
    }
    return Math.sqrt(sum);
}
/**
 * 计算余弦相似度
 */
function cosineSimilarity(array1, array2) {
    // 将二维数组转换为一维向量
    var vector1 = array1.flat();
    var vector2 = array2.flat();
    var dot = dotProduct(vector1, vector2);
    var length1 = vectorLength(vector1);
    var length2 = vectorLength(vector2);
    return dot / (length1 * length2);
}
exports.cosineSimilarity = cosineSimilarity;
// 计算二维数组内所有坐标点之间的距离
function handleCalculatedDistance(pointsArray) {
    // 计算两点之间的距离
    function calculateDistance(point1, point2) {
        var deltaX = point1[0] - point2[0];
        var deltaY = point1[1] - point2[1];
        return Math.hypot(deltaX, deltaY);
    }
    var reslut = [];
    // 遍历数组并计算每对点之间的距离
    for (var i = 0; i < pointsArray.length; i++) {
        for (var j = i + 1; j < pointsArray.length; j++) {
            var point1 = pointsArray[i];
            var point2 = pointsArray[j];
            var distance = calculateDistance(point1, point2);
            reslut.push(distance);
        }
    }
    return reslut;
}
/**
 * 计算两组坐标的相似度
 * @param vector1 数组1
 * @param vector2 数组2
 * @param threshold 阈值
 */
function handleSimilarity(vector1, vector2, threshold) {
    if (vector1.length !== vector2.length)
        return;
    // 升序排列数组
    var sortVector1 = vector1.sort(function (a, b) {
        return a[0] - b[0];
    });
    var sortVector2 = vector2.sort(function (a, b) {
        return a[0] - b[0];
    });
    var reslut1 = handleCalculatedDistance(sortVector1).sort();
    var reslut2 = handleCalculatedDistance(sortVector2).sort();
    var exceedNum = 0; //超出接受范围外的边数量
    for (var i = 0; i < reslut1.length; i++) {
        if (Math.abs(reslut1[i] - reslut2[i]) > threshold) {
            exceedNum++;
        }
    }
    return exceedNum === 0;
}
exports.handleSimilarity = handleSimilarity;
/**
 * 采用类的方式进行debug配置
 */
var MultiPointTouch = /** @class */ (function () {
    function MultiPointTouch(options) {
        this.isDev = options.debugger || false;
    }
    MultiPointTouch.prototype.cosineSimilarity = function (array1, array2) {
        // 将二维数组转换为一维向量
        var vector1 = array1.flat();
        var vector2 = array2.flat();
        var dot = dotProduct(vector1, vector2);
        var length1 = vectorLength(vector1);
        var length2 = vectorLength(vector2);
        if (this.isDev) {
            console.log('向量的模长1:' + length1);
            console.log('向量的模长2:' + length2);
            console.log('向量的点积:' + dot);
        }
        return dot / (length1 * length2);
    };
    MultiPointTouch.prototype.handleSimilarity = function (vector1, vector2, threshold) {
        if (this.isDev) {
            if (vector1.length !== vector2.length) {
                console.warn('两数组长度不相同无法比对！');
            }
        }
        if (vector1.length !== vector2.length)
            return;
        // 升序排列数组
        var sortVector1 = vector1.sort(function (a, b) {
            return a[0] - b[0];
        });
        var sortVector2 = vector2.sort(function (a, b) {
            return a[0] - b[0];
        });
        var reslut1 = handleCalculatedDistance(sortVector1).sort();
        var reslut2 = handleCalculatedDistance(sortVector2).sort();
        if (this.isDev) {
            console.log('数组一各点排列组合值：' + reslut1);
            console.log('数组二各点排列组合值：' + reslut2);
        }
        var exceedNum = 0; //超出接受范围外的边数量
        for (var i = 0; i < reslut1.length; i++) {
            if (this.isDev) {
                console.log("\u8FB9\u8DDD".concat(i + 1, "\u6BD4\u5BF9\u662F\u5426\u901A\u8FC7:") + ((Math.abs(reslut1[i] - reslut2[i])) > 10));
            }
            if (Math.abs(reslut1[i] - reslut2[i]) > threshold) {
                exceedNum++;
            }
        }
        return exceedNum === 0;
    };
    return MultiPointTouch;
}());
exports.MultiPointTouch = MultiPointTouch;
