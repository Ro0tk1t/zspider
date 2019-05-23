function parse_arg(args){
    var argument = {};
    args.forEach(function(val){
        var tmp = val.split('=');
        switch(tmp.length){
        case 1:
            argument[tmp[0]] = true;
            break;
        case 2:
            argument[tmp[0]] = tmp[1];
            break;
        }
    })
    return argument;
}

module.exports = parse_arg;
