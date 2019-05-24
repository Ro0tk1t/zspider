const puppeteer = require('puppeteer-core');
const utils = require('./utils');
const settings = require('./settings');
const cmd = require('./cmd');
const URL = require('url');

var browser_option = {};
var browser_args = [], cookies_ = [];
var argument = cmd(process.argv.slice(2));
var cookies = typeof(argument.cookies)=='string'?JSON.parse(argument.cookies):{};
var timeout = typeof(argument.timeout)=='string'?parseInt(argument.timeout):20;
var deeps = typeof(argument.deeps)=='string'?parseInt(argument.deeps):2;
var result_file = typeof(argument.output)=='string'?argument.output:'';
var fullscreen = typeof(argument.fullscreen)=='boolean'?true:false;
var proxy= typeof(argument.proxy)=='string'?argument.proxy:'';
var url = typeof(argument.url)=='string'?argument.url:'';

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
if (proxy){browser_args.push('--proxy-server='+proxy)};
if (fullscreen){browser_args.push('--start-fullscreen')};
for(let key in cookies){
    cookies_.push({"name": key, "value": cookies[key], "url": url});
}

var url_param = URL.parse(url);
console.log(url_param);
settings.hostname = url_param.hostname;

browser_option['args'] = browser_args;
(async() => {
    const browser = await puppeteer.launch(browser_option);
    const page = await browser.newPage();
    await page.setDefaultTimeout(timeout);
    await page.setCookie(...cookies_);
    const setCookie = await page.cookies(url);
    console.log(setCookie);
    if (proxy){
        if(await utils.test_proxy(browser)){} else{return}
    }
    try{
        for (let i=0;i<deeps;i++){
            await page.goto(url);
            await utils.get_a_link(page);
        }
    }
    catch (UnhandledPromiseRejectionWarning){
    }
    //console.log(a[1]);

    console.log(settings.results);
    await page.waitFor(2000);
    await browser.close();
})();
