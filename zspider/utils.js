function fix_url(url){
    if (url.indexOf('http://') | url.indexOf('https://')){
        return url;
    }
    else{
        return 'http'+url;
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
exports.fix_url=fix_url;
exports.check_url=check_url;
exports.test_proxy=test_proxy;
