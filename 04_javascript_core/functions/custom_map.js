export default Array.prototype.customMap = function(callback) {
    var returnArray = [];

    for (var index = 0; index < this.length; index++) {
        returnArray.push(callback(this[index], index, this));
    }

    return returnArray;
}