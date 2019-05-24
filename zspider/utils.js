const settings = require('./settings');
const URL = require('url');

function fix_url(url){
    if (url.startsWith('http://') | url.startsWith('https://')){
        return url;
    }
    else{
        return 'http://'+url;
    }
}

function check_url(url){
    if (url.indexOf('.') == -1){
        return false;
    }
    return true;
}

async function test_proxy(browser){
    const page = await browser.newPage();
    try{
        await page.goto('http://example.com');
    }
    catch (UnhandledPromiseRejectionWarning){
        console.log('proxy does\'t work');
        await browser.close();
        return false;
    }
    return true;
}

function fix_only_path_url(href){
    return href;
}

function check_root(url){
    if (settings.hostname === URL.parse(url).hostname){
        return true;
    }
    return false;
}

async function push_result(href){
    href = fix_only_path_url(href);
    if (check_root(href)){
        settings.results['same'].add(href);
    }
    else{
        settings.results['different'].add(href);
    }
}

async function get_a_link(page){
    let elems = await page.$x('//a');
    elems.forEach(async function(elem){
        let href = await page.evaluate(x=>x.href, elem);
        // FIXME: save text ?
        // let text = await page.evaluate(x=>x.textContent, elem);
        push_result(href);
    })
}

exports.fix_url=fix_url;
exports.check_url=check_url;
exports.test_proxy=test_proxy;
exports.get_a_link=get_a_link;
