const puppeteer = require('puppeteer-core');
const utils = require('./utils');
const cmd = require('./cmd');

var browser_args = [];
var browser_option = results = {};
var argument = cmd(process.argv.slice(2));
var timeout = typeof(argument.timeout)=='string'?parseInt(argument.timeout):10;
var deeps = typeof(argument.deeps)=='string'?parseInt(argument.deeps):2;
var result_file = typeof(argument.output)=='string'?argument.output:'';
var proxy= typeof(argument.proxy)=='string'?argument.proxy:'';
var url = typeof(argument.url)=='string'?argument.url:'';
var fullscreen = typeof(argument.fullscreen)=='boolean'?true:false;

url = utils.fix_url(url);
if (!utils.check_url(url)){
    return 0;
}

if (typeof(argument.headless) == 'boolean'){
    browser_option['headless'] = argument.headless;
}
else{
    browser_option['headless'] = false;
}
if (typeof(argument.executablePath) == 'string'){
    browser_option['executablePath'] = argument.executablePath;
}
if (proxy){browser_args.push('--proxy-server='+proxy)}
if (fullscreen){browser_args.push('--start-fullscreen')}

console.log(browser_args);

browser_option['args'] = browser_args;
(async() => {
    const browser = await puppeteer.launch(browser_option);
    const page = await browser.newPage();
    if (proxy){
        if(await utils.test_proxy(browser)){} else{return}
    }
    try{
        await page.goto(url);
    }
    catch (UnhandledPromiseRejectionWarning){
    }
    var a = await page.content();
    //console.log(a);
    await page.waitFor(2000);

    await browser.close();
})();
