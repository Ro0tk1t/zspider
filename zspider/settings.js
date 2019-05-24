function privSet(){
    this.datas = [];
    this.add = add;
    this.del = del;
    this.show = show;
    this.contains = contains;
    this.size = size;
}

var results = {
    "same": new Set(),
    "different": new Set()
};
var hostname = '';


exports.results=results;
exports.hostname=hostname;
