String.prototype.render = function(context) {
    var tokenReg = /(\\)?\{([^\{\}\\]+)(\\)?\}/g;

    return this.replace(tokenReg, function(word, slash1, token, slash2) {
        if (slash1 || slash2) {
            return word.replace('\\', '');
        }

        var variables = token.replace(/\s/g, '').split('.');
        var currentObject = context;
        var i, length, variable;

        for (i = 0, length = variables.length; i < length; ++i) {
            variable = variables[i];
            currentObject = currentObject[variable];
            if (currentObject === undefined || currentObject === null) return '';
        }
        return currentObject;
    });
};

var re = /x/;
re.toString = function() {
    showMessage('哈哈，你打开了控制台，是想要看看我的秘密吗？', 5000, true);
    return '';
};

$(document).on('copy', function() {
    showMessage('你都复制了些什么呀，小🔥🐔', 5000, true);
});

$('.waifu-tool .fui-home').click(function() {
    //window.location = 'https://www.fghrsh.net/';
    window.location = window.location.protocol + '//' + window.location.hostname + '/';
});

$('.waifu-tool .fui-eye').click(function() {
    loadOtherModel();
});

$('.waifu-tool .fui-chat').click(function() {
    showHitokoto();
});

$('.waifu-tool .fui-user').click(function() {
    loadRandModel();
});

$('.waifu-tool .fui-info-circle').click(function() {
    //window.open('https://imjad.cn/archives/lab/add-dynamic-poster-girl-with-live2d-to-your-blog-02');
    window.open('https://baidu.com');
});

$('.waifu-tool .fui-cross').click(function() {
    sessionStorage.setItem('waifu-dsiplay', 'none');
    showMessage('愿你有一天能与重要的人重逢', 1300, true);
    window.setTimeout(function() {
        $('.waifu').hide();
    }, 1300);
});

$('.waifu-tool .fui-photo').click(function() {
    showMessage('照好了嘛，是不是很可爱呢？', 5000, true);
    window.Live2D.captureName = 'Pio.png';
    window.Live2D.captureFrame = true;
});

(function() {
    var text;
    //var SiteIndexUrl = 'https://www.fghrsh.net/';  // 手动指定主页
    var SiteIndexUrl = window.location.protocol + '//' + window.location.hostname + '/'; // 自动获取主页

    if (window.location.href == SiteIndexUrl) {
        // 如果是主页
        var now = new Date().getHours();
        if (now > 23 || now <= 5) {
            text = '你是夜猫子呀？这么晚还不睡觉，明天起的来嘛';
        } else if (now > 5 && now <= 7) {
            text = '早上好！一日之计在于晨，美好的一天就要开始了';
        } else if (now > 7 && now <= 11) {
            text = '上午好！工作顺利嘛，不要久坐，多起来走动走动哦！';
        } else if (now > 11 && now <= 14) {
            text = '中午了，工作了一个上午，现在是午餐时间！';
        } else if (now > 14 && now <= 17) {
            text = '午后很容易犯困呢，今天的运动目标完成了吗？';
        } else if (now > 17 && now <= 19) {
            text = '傍晚了！窗外夕阳的景色很美丽呢，最美不过夕阳红~';
        } else if (now > 19 && now <= 21) {
            text = '晚上好，今天过得怎么样？';
        } else if (now > 21 && now <= 23) {
            text = '已经这么晚了呀，早点休息吧，晚安~';
        } else {
            text = '嗨~ 快来逗我玩吧！';
        }
    } else {
        if (document.referrer !== '') {
            var referrer = document.createElement('a');
            referrer.href = document.referrer;
            var domain = referrer.hostname.split('.')[1];
            if (window.location.hostname == referrer.hostname) {
                text =
                    '恭喜你发现了小陈写的<span style="color:#0099cc;">『' +
                    document.title.split(' - ')[0] +
                    '』</span>';
            } else if (domain == 'baidu') {
                text =
                    'Hello! 来自 百度搜索 的朋友<br>你是搜索 <span style="color:#0099cc;">' +
                    referrer.search.split('&wd=')[1].split('&')[0] +
                    '</span> 找到的我吗？';
            } else if (domain == 'so') {
                text =
                    'Hello! 来自 360搜索 的朋友<br>你是搜索 <span style="color:#0099cc;">' +
                    referrer.search.split('&q=')[1].split('&')[0] +
                    '</span> 找到的我吗？';
            } else if (domain == 'google') {
                text =
                    'Hello! 来自 谷歌搜索 的朋友<br>欢迎阅读<span style="color:#0099cc;">『' +
                    document.title.split(' - ')[0] +
                    '』</span>';
            } else {
                text =
                    'Hello! 来自 <span style="color:#0099cc;">' +
                    referrer.hostname +
                    '</span> 的朋友';
            }
        } else {
            text =
                '恭喜你发现了小陈写的<span style="color:#0099cc;">『' +
                document.title.split(' - ')[0] +
                '』</span>';
        }
    }
    showMessage(text, 6000);
})();

//window.hitokotoTimer = window.setInterval(showHitokoto,30000);
/* 检测用户活动状态，并在空闲时 定时显示一言 */
var getActed = false;
window.hitokotoTimer = 0;
var hitokotoInterval = false;

$(document)
    .mousemove(function(e) {
        getActed = true;
    })
    .keydown(function() {
        getActed = true;
    });
setInterval(function() {
    if (!getActed) ifActed();
    else elseActed();
}, 1000);

function ifActed() {
    if (!hitokotoInterval) {
        hitokotoInterval = true;
        hitokotoTimer = window.setInterval(showHitokoto, 30000);
    }
}

function elseActed() {
    getActed = hitokotoInterval = false;
    window.clearInterval(hitokotoTimer);
}

function showHitokoto() {
    /* 增加 hitokoto.cn API */
    $.getJSON('https://v1.hitokoto.cn', function(result) {
        var text =
            '这句一言来自 <span style="color:#0099cc;">『{source}』</span>，是 <span style="color:#0099cc;">{creator}</span> 在 hitokoto.cn 投稿的。';
        text = text.render({ source: result.from, creator: result.creator });
        showMessage(result.hitokoto, 5000);
        window.setTimeout(function() {
            showMessage(text, 3000);
        }, 5000);
    });
    /*
	$.getJSON('https://api.fghrsh.net/hitokoto/rand/?encode=jsc&uid=3335',function(result){
        var text = '这句一言出处是 <span style="color:#0099cc;">『{source}』</span>，是 <span style="color:#0099cc;">FGHRSH</span> 在 {date} 收藏的！';
        text = text.render({source: result.source, date: result.date});
        showMessage(result.hitokoto, 5000);
        window.setTimeout(function() {showMessage(text, 3000);}, 5000);
    });
	*/
}

function showMessage(text, timeout, flag) {
    if (
        flag ||
        sessionStorage.getItem('waifu-text') === '' ||
        sessionStorage.getItem('waifu-text') === null
    ) {
        if (Array.isArray(text)) text = text[Math.floor(Math.random() * text.length + 1) - 1];
        //console.log(text);

        if (flag) sessionStorage.setItem('waifu-text', text);

        $('.waifu-tips').stop();
        $('.waifu-tips')
            .html(text)
            .fadeTo(200, 1);
        if (timeout === undefined) timeout = 5000;
        hideMessage(timeout);
    }
}

function hideMessage(timeout) {
    $('.waifu-tips')
        .stop()
        .css('opacity', 1);
    if (timeout === undefined) timeout = 5000;
    window.setTimeout(function() {
        sessionStorage.removeItem('waifu-text');
    }, timeout);
    $('.waifu-tips')
        .delay(timeout)
        .fadeTo(200, 0);
}

function initModel(waifuPath) {
    if (waifuPath === undefined) waifuPath = '';
    var modelId = localStorage.getItem('modelId');
    var modelTexturesId = localStorage.getItem('modelTexturesId');

    if (modelId == null) {
        /* 首次访问加载 指定模型 的 指定材质 */

        var modelId = 1; // 模型 ID
        var modelTexturesId = 53; // 材质 ID
    }
    loadModel(modelId, modelTexturesId);

    $.ajax({
        cache: true,
        url: waifuPath + 'waifu-tips.json',
        dataType: 'json',
        success: function(result) {
            $.each(result.mouseover, function(index, tips) {
                $(document).on('mouseover', tips.selector, function() {
                    var text = tips.text;
                    if (Array.isArray(tips.text))
                        text = tips.text[Math.floor(Math.random() * tips.text.length + 1) - 1];
                    text = text.render({ text: $(this).text() });
                    showMessage(text, 3000);
                });
            });
            $.each(result.click, function(index, tips) {
                $(document).on('click', tips.selector, function() {
                    var text = tips.text;
                    if (Array.isArray(tips.text))
                        text = tips.text[Math.floor(Math.random() * tips.text.length + 1) - 1];
                    text = text.render({ text: $(this).text() });
                    showMessage(text, 3000, true);
                });
            });
            $.each(result.seasons, function(index, tips) {
                var now = new Date();
                var after = tips.date.split('-')[0];
                var before = tips.date.split('-')[1] || after;

                if (
                    after.split('/')[0] <= now.getMonth() + 1 &&
                    now.getMonth() + 1 <= before.split('/')[0] &&
                    after.split('/')[1] <= now.getDate() &&
                    now.getDate() <= before.split('/')[1]
                ) {
                    var text = tips.text;
                    if (Array.isArray(tips.text))
                        text = tips.text[Math.floor(Math.random() * tips.text.length + 1) - 1];
                    text = text.render({ year: now.getFullYear() });
                    showMessage(text, 6000, true);
                }
            });
        },
    });
}

function loadModel(modelId, modelTexturesId) {
    localStorage.setItem('modelId', modelId);
    if (modelTexturesId === undefined) modelTexturesId = 0;
    localStorage.setItem('modelTexturesId', modelTexturesId);
    loadlive2d(
        'live2d',
        'https://api.fghrsh.net/live2d/get/?id=' + modelId + '-' + modelTexturesId,
        console.log('live2d', '模型 ' + modelId + '-' + modelTexturesId + ' 加载完成')
    );
}

function loadRandModel() {
    var modelId = localStorage.getItem('modelId');
    var modelTexturesId = localStorage.getItem('modelTexturesId');

    var modelTexturesRandMode = 'rand'; // 可选 'rand'(随机), 'switch'(顺序)

    $.ajax({
        cache: false,
        url:
            'https://api.fghrsh.net/live2d/' +
            modelTexturesRandMode +
            '_textures/?id=' +
            modelId +
            '-' +
            modelTexturesId,
        dataType: 'json',
        success: function(result) {
            if (result.textures['id'] == 1 && (modelTexturesId == 1 || modelTexturesId == 0)) {
                showMessage('我还没有其他衣服呢', 3000, true);
            } else {
                showMessage('我的新衣服好看嘛', 3000, true);
            }
            loadModel(modelId, result.textures['id']);
        },
    });
}

function loadOtherModel() {
    var modelId = localStorage.getItem('modelId');

    var modelTexturesRandMode = 'switch'; // 可选 'rand'(随机), 'switch'(顺序)

    $.ajax({
        cache: false,
        url: 'https://api.fghrsh.net/live2d/' + modelTexturesRandMode + '/?id=' + modelId,
        dataType: 'json',
        success: function(result) {
            loadModel(result.model['id']);
            showMessage(result.model['message'], 3000, true);
        },
    });
}
