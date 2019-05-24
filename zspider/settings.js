function privSet(){
    this.datas = [];
    this.add = add;
    this.del = del;
    this.show = show;
    this.contains = contains;
    this.size = size;
}

var results = {
    "same": {
        1: new Set()
    },
    "different": {
        1: new Set()
    }
};
var hostname = '';


exports.results=results;
exports.hostname=hostname;
