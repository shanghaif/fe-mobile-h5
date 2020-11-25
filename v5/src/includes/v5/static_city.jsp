<%@ page language="java" contentType="text/html;charset=UTF-8" %>
<div id="static-city"
     class="aui-dialog aui-dialog-common  aui-dialog-no-title aui-dialog-no-btn aui-dialog-no-radius appear-from-top"
     style="position: fixed; z-index: 2100; left: 0px; height: auto; min-width: 80px; min-height: 0px; top: 94px; bottom: 0px; display: none; width: 414px;">
    <div class="aui-dialog-title" style="display: none;"></div>
    <div class="aui-dialog-content" style="padding: 0px;">
        <div class="aui-localdataui">
            <div class="aui-localdataui-select-box">
                <div class="aui-localdataui-scroll main-html">
                    <ul style="transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1); transition-duration: 0ms; transform: translate(0px, 0px) translateZ(0px);">
                        <li data-value="000">不限</li>
                        <li data-value="rmcs">热门城市</li>
                        <li data-value="050">广东省</li>
                        <li data-value="060">江苏省</li>
                        <li data-value="070">浙江省</li>
                        <li data-value="080">安徽省</li>
                        <li data-value="090">福建省</li>
                        <li data-value="100">甘肃省</li>
                        <li data-value="110">广西</li>
                        <li data-value="120">贵州省</li>
                        <li data-value="130">海南省</li>
                        <li data-value="140">河北省</li>
                        <li data-value="150">河南省</li>
                        <li data-value="160">黑龙江省</li>
                        <li data-value="170">湖北省</li>
                        <li data-value="180">湖南省</li>
                        <li data-value="190">吉林省</li>
                        <li data-value="200">江西省</li>
                        <li data-value="210">辽宁省</li>
                        <li data-value="220">内蒙古</li>
                        <li data-value="230">宁夏</li>
                        <li data-value="240">青海省</li>
                        <li data-value="250">山东省</li>
                        <li data-value="260">山西省</li>
                        <li data-value="270">陕西省</li>
                        <li data-value="280">四川省</li>
                        <li data-value="290">西藏</li>
                        <li data-value="300">新疆</li>
                        <li data-value="310">云南省</li>
                        <li data-value="320">香港</li>
                        <li data-value="330">澳门</li>
                        <li data-value="340">台湾</li>
                        <li data-value="350">亚洲</li>
                        <li data-value="360">北美洲</li>
                        <li data-value="370">南美洲</li>
                        <li data-value="380">大洋洲</li>
                        <li data-value="390">欧洲</li>
                        <li data-value="400">非洲</li>
                    </ul>
                </div>
                <div class="aui-localdataui-scroll content-html" style="display:none;">
                    <ul style="transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1); transition-duration: 0ms; transform: translate(0px, 0px) translateZ(0px);">
                        <li data-value="000">
                            <a href="${S_DOMAIN.m}/${uri}/">不限
                                <i class="text-icon icon-check"></i></a>
                        </li>
                    </ul>
                </div>
                <div class="aui-localdataui-scroll content-html" style="display:none;">
                    <ul style="transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1); transition-duration: 0ms; transform: translate(0px, 0px) translateZ(0px);">
                        <li data-value="010">
                            <a href="${S_DOMAIN.m}/bj/${uri}/">北京
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="020">
                            <a href="${S_DOMAIN.m}/sh/${uri}/">上海
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="050020">
                            <a href="${S_DOMAIN.m}/gz/${uri}/">广州
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="050090">
                            <a href="${S_DOMAIN.m}/sz/${uri}/">深圳
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="030">
                            <a href="${S_DOMAIN.m}/tj/${uri}/">天津
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="060080">
                            <a href="${S_DOMAIN.m}/suzhou/${uri}/">苏州
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="040">
                            <a href="${S_DOMAIN.m}/cq/${uri}/">重庆
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="060020">
                            <a href="${S_DOMAIN.m}/nj/${uri}/">南京
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="070020">
                            <a href="${S_DOMAIN.m}/hz/${uri}/">杭州
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="210040">
                            <a href="${S_DOMAIN.m}/dl/${uri}/">大连
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="280020">
                            <a href="${S_DOMAIN.m}/cd/${uri}/">成都
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="170020">
                            <a href="${S_DOMAIN.m}/wuhan/${uri}/">武汉
                                <i class="text-icon icon-check"></i></a>
                        </li>
                    </ul>
                </div>
                <div class="aui-localdataui-scroll content-html" style="display:none;">
                    <ul style="transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1); transition-duration: 0ms; transform: translate(0px, 0px) translateZ(0px);">
                        <li data-value="050">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=050${queryParam}">广东省
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="050020">
                            <a href="${S_DOMAIN.m}/gz/${uri}/">广州
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="050030">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=050030${queryParam}">潮州
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="050040">
                            <a href="${S_DOMAIN.m}/dongguan/${uri}/">东莞
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="050050">
                            <a href="${S_DOMAIN.m}/foshan/${uri}/">佛山
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="050060">
                            <a href="${S_DOMAIN.m}/huizhou/${uri}/">惠州
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="050070">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=050070${queryParam}">清远
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="050080">
                            <a href="${S_DOMAIN.m}/shantou/${uri}/">汕头
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="050090">
                            <a href="${S_DOMAIN.m}/sz/${uri}/">深圳
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="050100">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=050100${queryParam}">顺德
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="050110">
                            <a href="${S_DOMAIN.m}/zhanjiang/${uri}/">湛江
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="050120">
                            <a href="${S_DOMAIN.m}/zhaoqing/${uri}/">肇庆
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="050130">
                            <a href="${S_DOMAIN.m}/zhongshan/${uri}/">中山
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="050140">
                            <a href="${S_DOMAIN.m}/zhuhai/${uri}/">珠海
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="050150">
                            <a href="${S_DOMAIN.m}/jiangmen/${uri}/">江门
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="050160">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=050160${queryParam}">阳江
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="050170">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=050170${queryParam}">韶关
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="050180">
                            <a href="${S_DOMAIN.m}/maoming/${uri}/">茂名
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="050190">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=050190${queryParam}">梅州
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="050200">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=050200${queryParam}">汕尾
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="050210">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=050210${queryParam}">河源
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="050220">
                            <a href="${S_DOMAIN.m}/jieyang/${uri}/">揭阳
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="050230">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=050230${queryParam}">云浮
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="050240">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=050240${queryParam}">开平
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="050250">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=050250${queryParam}">台山
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="050260">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=050260${queryParam}">普宁
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="050270">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=050270${queryParam}">南沙
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="050280">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=050280${queryParam}">龙川
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="050290">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=050290${queryParam}">鹤山
                                <i class="text-icon icon-check"></i></a>
                        </li>
                    </ul>
                </div>
                <div class="aui-localdataui-scroll content-html" style="display:none;">
                    <ul style="transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1); transition-duration: 0ms; transform: translate(0px, 0px) translateZ(0px);">
                        <li data-value="060">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=060${queryParam}">江苏省
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="060020">
                            <a href="${S_DOMAIN.m}/nj/${uri}/">南京
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="060030">
                            <a href="${S_DOMAIN.m}/changshu/${uri}/">常熟
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="060040">
                            <a href="${S_DOMAIN.m}/changzhou/${uri}/">常州
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="060050">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=060050${queryParam}">昆山
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="060060">
                            <a href="${S_DOMAIN.m}/lianyungang/${uri}/">连云港
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="060070">
                            <a href="${S_DOMAIN.m}/nantong/${uri}/">南通
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="060080">
                            <a href="${S_DOMAIN.m}/suzhou/${uri}/">苏州
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="060090">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=060090${queryParam}">太仓
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="060100">
                            <a href="${S_DOMAIN.m}/wuxi/${uri}/">无锡
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="060110">
                            <a href="${S_DOMAIN.m}/xuzhou/${uri}/">徐州
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="060120">
                            <a href="${S_DOMAIN.m}/yangzhou/${uri}/">扬州
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="060130">
                            <a href="${S_DOMAIN.m}/zhenjiang/${uri}/">镇江
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="060140">
                            <a href="${S_DOMAIN.m}/huaian/${uri}/">淮安
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="060150">
                            <a href="${S_DOMAIN.m}/yancheng/${uri}/">盐城
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="060160">
                            <a href="${S_DOMAIN.m}/taizhou1/${uri}/">泰州
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="060170">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=060170${queryParam}">宿迁
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="060180">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=060180${queryParam}">张家港
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="060190">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=060190${queryParam}">江阴
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="060200">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=060200${queryParam}">丹阳
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="060210">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=060210${queryParam}">溧阳
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="060220">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=060220${queryParam}">泰兴
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="060230">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=060230${queryParam}">宜兴
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="060240">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=060240${queryParam}">靖江
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="060250">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=060250${queryParam}">句容
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="060260">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=060260${queryParam}">如皋
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="060270">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=060270${queryParam}">扬中
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="060280">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=060280${queryParam}">高邮
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="060290">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=060290${queryParam}">启东
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="060300">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=060300${queryParam}">盱眙
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="060310">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=060310${queryParam}">通州
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="060320">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=060320${queryParam}">金湖
                                <i class="text-icon icon-check"></i></a>
                        </li>
                    </ul>
                </div>
                <div class="aui-localdataui-scroll content-html" style="display:none;">
                    <ul style="transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1); transition-duration: 0ms; transform: translate(0px, 0px) translateZ(0px);">
                        <li data-value="070">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=070${queryParam}">浙江省
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="070020">
                            <a href="${S_DOMAIN.m}/hz/${uri}/">杭州
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="070030">
                            <a href="${S_DOMAIN.m}/ningbo/${uri}/">宁波
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="070040">
                            <a href="${S_DOMAIN.m}/wenzhou/${uri}/">温州
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="070050">
                            <a href="${S_DOMAIN.m}/shaoxing/${uri}/">绍兴
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="070060">
                            <a href="${S_DOMAIN.m}/jinhua/${uri}/">金华
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="070070">
                            <a href="${S_DOMAIN.m}/taizhou/${uri}/">台州
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="070080">
                            <a href="${S_DOMAIN.m}/huzhou/${uri}/">湖州
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="070090">
                            <a href="${S_DOMAIN.m}/jiaxing/${uri}/">嘉兴
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="070100">
                            <a href="${S_DOMAIN.m}/quzhou/${uri}/">衢州
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="070110">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=070110${queryParam}">丽水
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="070120">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=070120${queryParam}">舟山
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="070130">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=070130${queryParam}">义乌
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="070140">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=070140${queryParam}">海宁
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="070150">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=070150${queryParam}">玉环县
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="070160">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=070160${queryParam}">平湖
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="070170">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=070170${queryParam}">永康
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="070180">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=070180${queryParam}">东阳
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="070190">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=070190${queryParam}">嘉善
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="070200">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=070200${queryParam}">余姚
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="070210">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=070210${queryParam}">慈溪
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="070220">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=070220${queryParam}">乐清
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="070230">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=070230${queryParam}">永嘉
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="070240">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=070240${queryParam}">桐乡
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="070250">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=070250${queryParam}">瑞安
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="070260">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=070260${queryParam}">温岭
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="070270">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=070270${queryParam}">上虞
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="070280">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=070280${queryParam}">诸暨
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="070290">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=070290${queryParam}">宁海
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="070300">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=070300${queryParam}">三门
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="070310">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=070310${queryParam}">德清
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="070320">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=070320${queryParam}">象山
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="070330">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=070330${queryParam}">方家山
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="070340">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=070340${queryParam}">龙泉
                                <i class="text-icon icon-check"></i></a>
                        </li>
                    </ul>
                </div>
                <div class="aui-localdataui-scroll content-html" style="display:none;">
                    <ul style="transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1); transition-duration: 0ms; transform: translate(0px, 0px) translateZ(0px);">
                        <li data-value="080">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=080${queryParam}">安徽省
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="080020">
                            <a href="${S_DOMAIN.m}/hefei/${uri}/">合肥
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="080030">
                            <a href="${S_DOMAIN.m}/anqing/${uri}/">安庆
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="080040">
                            <a href="${S_DOMAIN.m}/bengbu/${uri}/">蚌埠
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="080050">
                            <a href="${S_DOMAIN.m}/wuhu/${uri}/">芜湖
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="080060">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=080060${queryParam}">淮南
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="080070">
                            <a href="${S_DOMAIN.m}/maanshan/${uri}/">马鞍山
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="080080">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=080080${queryParam}">淮北
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="080090">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=080090${queryParam}">铜陵
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="080100">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=080100${queryParam}">黄山
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="080110">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=080110${queryParam}">滁州
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="080120">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=080120${queryParam}">阜阳
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="080130">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=080130${queryParam}">宿州
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="080140">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=080140${queryParam}">六安
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="080150">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=080150${queryParam}">亳州
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="080160">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=080160${queryParam}">池州
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="080170">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=080170${queryParam}">宣城
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="080180">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=080180${queryParam}">巢湖
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="080190">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=080190${queryParam}">凤阳
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="080200">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=080200${queryParam}">广德
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="080210">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=080210${queryParam}">宿松
                                <i class="text-icon icon-check"></i></a>
                        </li>
                    </ul>
                </div>
                <div class="aui-localdataui-scroll content-html" style="display:none;">
                    <ul style="transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1); transition-duration: 0ms; transform: translate(0px, 0px) translateZ(0px);">
                        <li data-value="090">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=090${queryParam}">福建省
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="090020">
                            <a href="${S_DOMAIN.m}/fuzhou/${uri}/">福州
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="090030">
                            <a href="${S_DOMAIN.m}/quanzhou/${uri}/">泉州
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="090040">
                            <a href="${S_DOMAIN.m}/xiamen/${uri}/">厦门
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="090050">
                            <a href="${S_DOMAIN.m}/zhangzhou/${uri}/">漳州
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="090060">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=090060${queryParam}">莆田
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="090070">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=090070${queryParam}">三明
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="090080">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=090080${queryParam}">南平
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="090090">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=090090${queryParam}">龙岩
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="090100">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=090100${queryParam}">宁德
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="090110">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=090110${queryParam}">泉港区
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="090120">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=090120${queryParam}">福安
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="090130">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=090130${queryParam}">晋江
                                <i class="text-icon icon-check"></i></a>
                        </li>
                    </ul>
                </div>
                <div class="aui-localdataui-scroll content-html" style="display:none;">
                    <ul style="transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1); transition-duration: 0ms; transform: translate(0px, 0px) translateZ(0px);">
                        <li data-value="100">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=100${queryParam}">甘肃省
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="100020">
                            <a href="${S_DOMAIN.m}/lanzhou/${uri}/">兰州
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="100030">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=100030${queryParam}">嘉峪关
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="100040">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=100040${queryParam}">酒泉
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="100050">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=100050${queryParam}">金昌
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="100060">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=100060${queryParam}">白银
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="100070">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=100070${queryParam}">天水
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="100080">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=100080${queryParam}">张掖
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="100090">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=100090${queryParam}">武威
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="100100">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=100100${queryParam}">定西
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="100110">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=100110${queryParam}">陇南
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="100120">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=100120${queryParam}">平凉
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="100130">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=100130${queryParam}">庆阳
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="100140">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=100140${queryParam}">临夏
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="100150">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=100150${queryParam}">甘南
                                <i class="text-icon icon-check"></i></a>
                        </li>
                    </ul>
                </div>
                <div class="aui-localdataui-scroll content-html" style="display:none;">
                    <ul style="transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1); transition-duration: 0ms; transform: translate(0px, 0px) translateZ(0px);">
                        <li data-value="110">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=110${queryParam}">广西
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="110020">
                            <a href="${S_DOMAIN.m}/nanning/${uri}/">南宁
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="110030">
                            <a href="${S_DOMAIN.m}/beihai/${uri}/">北海
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="110040">
                            <a href="${S_DOMAIN.m}/guilin/${uri}/">桂林
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="110050">
                            <a href="${S_DOMAIN.m}/liuzhou/${uri}/">柳州
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="110060">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=110060${queryParam}">玉林
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="110070">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=110070${queryParam}">梧州
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="110080">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=110080${queryParam}">崇左
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="110090">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=110090${queryParam}">来宾
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="110100">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=110100${queryParam}">防城港
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="110110">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=110110${queryParam}">百色
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="110120">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=110120${queryParam}">钦州
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="110130">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=110130${queryParam}">贺州
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="110140">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=110140${queryParam}">河池
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="110150">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=110150${queryParam}">贵港
                                <i class="text-icon icon-check"></i></a>
                        </li>
                    </ul>
                </div>
                <div class="aui-localdataui-scroll content-html" style="display:none;">
                    <ul style="transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1); transition-duration: 0ms; transform: translate(0px, 0px) translateZ(0px);">
                        <li data-value="120">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=120${queryParam}">贵州省
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="120020">
                            <a href="${S_DOMAIN.m}/guiyang/${uri}/">贵阳
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="120030">
                            <a href="${S_DOMAIN.m}/zunyi/${uri}/">遵义
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="120040">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=120040${queryParam}">六盘水
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="120050">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=120050${queryParam}">安顺
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="120060">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=120060${queryParam}">毕节
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="120070">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=120070${queryParam}">铜仁
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="120080">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=120080${queryParam}">黔西南
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="120090">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=120090${queryParam}">黔东南
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="120100">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=120100${queryParam}">黔南
                                <i class="text-icon icon-check"></i></a>
                        </li>
                    </ul>
                </div>
                <div class="aui-localdataui-scroll content-html" style="display:none;">
                    <ul style="transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1); transition-duration: 0ms; transform: translate(0px, 0px) translateZ(0px);">
                        <li data-value="130">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=130${queryParam}">海南省
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="130020">
                            <a href="${S_DOMAIN.m}/haikou/${uri}/">海口
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="130030">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=130030${queryParam}">三亚
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="130040">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=130040${queryParam}">三沙
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="130060">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=130060${queryParam}">文昌
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="130070">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=130070${queryParam}">琼海
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="130080">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=130080${queryParam}">万宁
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="130090">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=130090${queryParam}">儋州
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="130100">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=130100${queryParam}">东方
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="130110">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=130110${queryParam}">五指山
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="130120">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=130120${queryParam}">定安
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="130130">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=130130${queryParam}">屯昌
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="130140">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=130140${queryParam}">澄迈
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="130150">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=130150${queryParam}">临高
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="130160">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=130160${queryParam}">琼中
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="130170">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=130170${queryParam}">保亭
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="130180">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=130180${queryParam}">白沙
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="130190">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=130190${queryParam}">昌江
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="130200">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=130200${queryParam}">乐东
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="130210">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=130210${queryParam}">陵水
                                <i class="text-icon icon-check"></i></a>
                        </li>
                    </ul>
                </div>
                <div class="aui-localdataui-scroll content-html" style="display:none;">
                    <ul style="transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1); transition-duration: 0ms; transform: translate(0px, 0px) translateZ(0px);">
                        <li data-value="140">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=140${queryParam}">河北省
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="140020">
                            <a href="${S_DOMAIN.m}/shijiazhuang/${uri}/">石家庄
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="140030">
                            <a href="${S_DOMAIN.m}/baoding/${uri}/">保定
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="140040">
                            <a href="${S_DOMAIN.m}/chengde/${uri}/">承德
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="140050">
                            <a href="${S_DOMAIN.m}/handan/${uri}/">邯郸
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="140060">
                            <a href="${S_DOMAIN.m}/langfang/${uri}/">廊坊
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="140070">
                            <a href="${S_DOMAIN.m}/qinhuangdao/${uri}/">秦皇岛
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="140080">
                            <a href="${S_DOMAIN.m}/tangshan/${uri}/">唐山
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="140090">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=140090${queryParam}">张家口
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="140100">
                            <a href="${S_DOMAIN.m}/xingtai/${uri}/">邢台
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="140110">
                            <a href="${S_DOMAIN.m}/cangzhou/${uri}/">沧州
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="140120">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=140120${queryParam}">衡水
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="140130">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=140130${queryParam}">燕郊
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="140140">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=140140${queryParam}">固安
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="140150">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=140150${queryParam}">遵化
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="140160">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=140160${queryParam}">香河
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="140170">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=140170${queryParam}">三河
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="140180">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=140180${queryParam}">雄安新区
                                <i class="text-icon icon-check"></i></a>
                        </li>
                    </ul>
                </div>
                <div class="aui-localdataui-scroll content-html" style="display:none;">
                    <ul style="transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1); transition-duration: 0ms; transform: translate(0px, 0px) translateZ(0px);">
                        <li data-value="150">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=150${queryParam}">河南省
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="150020">
                            <a href="${S_DOMAIN.m}/zhengzhou/${uri}/">郑州
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="150030">
                            <a href="${S_DOMAIN.m}/kaifeng/${uri}/">开封
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="150040">
                            <a href="${S_DOMAIN.m}/luoyang/${uri}/">洛阳
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="150050">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=150050${queryParam}">商丘
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="150060">
                            <a href="${S_DOMAIN.m}/anyang/${uri}/">安阳
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="150070">
                            <a href="${S_DOMAIN.m}/pingdingshan/${uri}/">平顶山
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="150080">
                            <a href="${S_DOMAIN.m}/xinxiang/${uri}/">新乡
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="150090">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=150090${queryParam}">焦作
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="150100">
                            <a href="${S_DOMAIN.m}/puyang/${uri}/">濮阳
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="150110">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=150110${queryParam}">许昌
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="150120">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=150120${queryParam}">漯河
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="150130">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=150130${queryParam}">三门峡
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="150140">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=150140${queryParam}">鹤壁
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="150150">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=150150${queryParam}">周口
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="150160">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=150160${queryParam}">驻马店
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="150170">
                            <a href="${S_DOMAIN.m}/nanyang/${uri}/">南阳
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="150180">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=150180${queryParam}">信阳
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="150190">
                            <a href="${S_DOMAIN.m}/jiyuan/${uri}/">济源
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="150200">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=150200${queryParam}">西平
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="150210">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=150210${queryParam}">长葛
                                <i class="text-icon icon-check"></i></a>
                        </li>
                    </ul>
                </div>
                <div class="aui-localdataui-scroll content-html" style="display:none;">
                    <ul style="transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1); transition-duration: 0ms; transform: translate(0px, 0px) translateZ(0px);">
                        <li data-value="160">
                            <a href="${S_DOMAIN.m}/heilongjiang/${uri}/">黑龙江省
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="160020">
                            <a href="${S_DOMAIN.m}/haerbin/${uri}/">哈尔滨
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="160030">
                            <a href="${S_DOMAIN.m}/daqing/${uri}/">大庆
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="160040">
                            <a href="${S_DOMAIN.m}/jiamusi/${uri}/">佳木斯
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="160050">
                            <a href="${S_DOMAIN.m}/mudanjiang/${uri}/">牡丹江
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="160060">
                            <a href="${S_DOMAIN.m}/qiqihaer/${uri}/">齐齐哈尔
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="160070">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=160070${queryParam}">鸡西
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="160080">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=160080${queryParam}">鹤岗
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="160090">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=160090${queryParam}">双鸭山
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="160100">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=160100${queryParam}">伊春
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="160110">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=160110${queryParam}">七台河
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="160120">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=160120${queryParam}">黑河
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="160130">
                            <a href="${S_DOMAIN.m}/suihua/${uri}/">绥化
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="160140">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=160140${queryParam}">大兴安岭
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="160150">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=160150${queryParam}">安达
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="160160">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=160160${queryParam}">双城
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="160170">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=160170${queryParam}">尚志
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="160180">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=160180${queryParam}">绥芬河
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="160190">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=160190${queryParam}">肇东
                                <i class="text-icon icon-check"></i></a>
                        </li>
                    </ul>
                </div>
                <div class="aui-localdataui-scroll content-html" style="display:none;">
                    <ul style="transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1); transition-duration: 0ms; transform: translate(0px, 0px) translateZ(0px);">
                        <li data-value="170">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=170${queryParam}">湖北省
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="170020">
                            <a href="${S_DOMAIN.m}/wuhan/${uri}/">武汉
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="170030">
                            <a href="${S_DOMAIN.m}/shiyan/${uri}/">十堰
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="170040">
                            <a href="${S_DOMAIN.m}/xiangyang/${uri}/">襄阳
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="170050">
                            <a href="${S_DOMAIN.m}/yichang/${uri}/">宜昌
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="170060">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=170060${queryParam}">潜江
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="170070">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=170070${queryParam}">荆门
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="170080">
                            <a href="${S_DOMAIN.m}/jingzhou/${uri}/">荆州
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="170090">
                            <a href="${S_DOMAIN.m}/huangshi/${uri}/">黄石
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="170100">
                            <a href="${S_DOMAIN.m}/ezhou/${uri}/">鄂州
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="170110">
                            <a href="${S_DOMAIN.m}/huanggang/${uri}/">黄冈
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="170120">
                            <a href="${S_DOMAIN.m}/xiaogan/${uri}/">孝感
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="170130">
                            <a href="${S_DOMAIN.m}/xianning/${uri}/">咸宁
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="170140">
                            <a href="${S_DOMAIN.m}/suizhou/${uri}/">随州
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="170150">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=170150${queryParam}">仙桃
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="170160">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=170160${queryParam}">天门
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="170170">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=170170${queryParam}">神农架
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="170180">
                            <a href="${S_DOMAIN.m}/enshi/${uri}/">恩施
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="170190">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=170190${queryParam}">公安
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="170200">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=170200${queryParam}">武穴
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="170210">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=170210${queryParam}">宜城
                                <i class="text-icon icon-check"></i></a>
                        </li>
                    </ul>
                </div>
                <div class="aui-localdataui-scroll content-html" style="display:none;">
                    <ul style="transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1); transition-duration: 0ms; transform: translate(0px, 0px) translateZ(0px);">
                        <li data-value="180">
                            <a href="${S_DOMAIN.m}/hunan/${uri}/">湖南省
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="180020">
                            <a href="${S_DOMAIN.m}/changsha/${uri}/">长沙
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="180030">
                            <a href="${S_DOMAIN.m}/xiangtan/${uri}/">湘潭
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="180040">
                            <a href="${S_DOMAIN.m}/zhuzhou/${uri}/">株洲
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="180050">
                            <a href="${S_DOMAIN.m}/changde/${uri}/">常德
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="180060">
                            <a href="${S_DOMAIN.m}/hengyang/${uri}/">衡阳
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="180070">
                            <a href="${S_DOMAIN.m}/yiyang/${uri}/">益阳
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="180080">
                            <a href="${S_DOMAIN.m}/chenzhou/${uri}/">郴州
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="180090">
                            <a href="${S_DOMAIN.m}/yueyang/${uri}/">岳阳
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="180100">
                            <a href="${S_DOMAIN.m}/shaoyang/${uri}/">邵阳
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="180110">
                            <a href="${S_DOMAIN.m}/zhangjiajie/${uri}/">张家界
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="180120">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=180120${queryParam}">娄底
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="180130">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=180130${queryParam}">永州
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="180140">
                            <a href="${S_DOMAIN.m}/huaihua/${uri}/">怀化
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="180150">
                            <a href="${S_DOMAIN.m}/xiangxi/${uri}/">湘西
                                <i class="text-icon icon-check"></i></a>
                        </li>
                    </ul>
                </div>
                <div class="aui-localdataui-scroll content-html" style="display:none;">
                    <ul style="transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1); transition-duration: 0ms; transform: translate(0px, 0px) translateZ(0px);">
                        <li data-value="190">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=190${queryParam}">吉林省
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="190020">
                            <a href="${S_DOMAIN.m}/changchun/${uri}/">长春
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="190030">
                            <a href="${S_DOMAIN.m}/jilin/${uri}/">吉林市
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="190040">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=190040${queryParam}">四平
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="190050">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=190050${queryParam}">辽源
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="190060">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=190060${queryParam}">通化
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="190070">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=190070${queryParam}">白山
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="190080">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=190080${queryParam}">松原
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="190090">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=190090${queryParam}">白城
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="190100">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=190100${queryParam}">延吉
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="190110">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=190110${queryParam}">延边
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="190120">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=190120${queryParam}">公主岭
                                <i class="text-icon icon-check"></i></a>
                        </li>
                    </ul>
                </div>
                <div class="aui-localdataui-scroll content-html" style="display:none;">
                    <ul style="transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1); transition-duration: 0ms; transform: translate(0px, 0px) translateZ(0px);">
                        <li data-value="200">
                            <a href="${S_DOMAIN.m}/jiangxi/${uri}/">江西省
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="200020">
                            <a href="${S_DOMAIN.m}/nanchang/${uri}/">南昌
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="200030">
                            <a href="${S_DOMAIN.m}/jiujiang/${uri}/">九江
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="200040">
                            <a href="${S_DOMAIN.m}/ganzhou/${uri}/">赣州
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="200050">
                            <a href="${S_DOMAIN.m}/yichun0795/${uri}/">宜春
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="200060">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=200060${queryParam}">吉安
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="200070">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=200070${queryParam}">上饶
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="200080">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=200080${queryParam}">抚州
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="200090">
                            <a href="${S_DOMAIN.m}/jingdezhen/${uri}/">景德镇
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="200100">
                            <a href="${S_DOMAIN.m}/pingxiang/${uri}/">萍乡
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="200110">
                            <a href="${S_DOMAIN.m}/xinyu/${uri}/">新余
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="200120">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=200120${queryParam}">鹰潭
                                <i class="text-icon icon-check"></i></a>
                        </li>
                    </ul>
                </div>
                <div class="aui-localdataui-scroll content-html" style="display:none;">
                    <ul style="transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1); transition-duration: 0ms; transform: translate(0px, 0px) translateZ(0px);">
                        <li data-value="210">
                            <a href="${S_DOMAIN.m}/liaoning/${uri}/">辽宁省
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="210020">
                            <a href="${S_DOMAIN.m}/shenyang/${uri}/">沈阳
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="210030">
                            <a href="${S_DOMAIN.m}/anshan/${uri}/">鞍山
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="210040">
                            <a href="${S_DOMAIN.m}/dl/${uri}/">大连
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="210050">
                            <a href="${S_DOMAIN.m}/huludao/${uri}/">葫芦岛
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="210060">
                            <a href="${S_DOMAIN.m}/fushun/${uri}/">抚顺
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="210070">
                            <a href="${S_DOMAIN.m}/benxi/${uri}/">本溪
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="210080">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=210080${queryParam}">丹东
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="210090">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=210090${queryParam}">锦州
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="210100">
                            <a href="${S_DOMAIN.m}/yingkou/${uri}/">营口
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="210110">
                            <a href="${S_DOMAIN.m}/fuxin/${uri}/">阜新
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="210120">
                            <a href="${S_DOMAIN.m}/liaoyang/${uri}/">辽阳
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="210130">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=210130${queryParam}">盘锦
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="210140">
                            <a href="${S_DOMAIN.m}/tieling/${uri}/">铁岭
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="210150">
                            <a href="${S_DOMAIN.m}/chaoyang/${uri}/">朝阳
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="210160">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=210160${queryParam}">兴城
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="210170">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=210170${queryParam}">海城
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="210180">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=210180${queryParam}">昌图
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="210190">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=210190${queryParam}">开原
                                <i class="text-icon icon-check"></i></a>
                        </li>
                    </ul>
                </div>
                <div class="aui-localdataui-scroll content-html" style="display:none;">
                    <ul style="transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1); transition-duration: 0ms; transform: translate(0px, 0px) translateZ(0px);">
                        <li data-value="220">
                            <a href="${S_DOMAIN.m}/neimenggu/${uri}/">内蒙古
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="220020">
                            <a href="${S_DOMAIN.m}/huhehaote/${uri}/">呼和浩特
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="220030">
                            <a href="${S_DOMAIN.m}/baotou/${uri}/">包头
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="220040">
                            <a href="${S_DOMAIN.m}/chifeng/${uri}/">赤峰
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="220050">
                            <a href="${S_DOMAIN.m}/eerduosi/${uri}/">鄂尔多斯
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="220060">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=220060${queryParam}">乌海
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="220070">
                            <a href="${S_DOMAIN.m}/tongliao/${uri}/">通辽
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="220080">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=220080${queryParam}">呼伦贝尔
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="220090">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=220090${queryParam}">巴彦淖尔
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="220100">
                            <a href="${S_DOMAIN.m}/wulanchabu/${uri}/">乌兰察布
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="220110">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=220110${queryParam}">兴安盟
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="220120">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=220120${queryParam}">锡林郭勒盟
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="220130">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=220130${queryParam}">阿拉善盟
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="220140">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=220140${queryParam}">乌审旗
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="220150">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=220150${queryParam}">满洲里
                                <i class="text-icon icon-check"></i></a>
                        </li>
                    </ul>
                </div>
                <div class="aui-localdataui-scroll content-html" style="display:none;">
                    <ul style="transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1); transition-duration: 0ms; transform: translate(0px, 0px) translateZ(0px);">
                        <li data-value="230">
                            <a href="${S_DOMAIN.m}/ningxia/${uri}/">宁夏
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="230020">
                            <a href="${S_DOMAIN.m}/yinchuan/${uri}/">银川
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="230030">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=230030${queryParam}">石嘴山
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="230040">
                            <a href="${S_DOMAIN.m}/wuzhong/${uri}/">吴忠
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="230050">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=230050${queryParam}">固原
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="230060">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=230060${queryParam}">中卫
                                <i class="text-icon icon-check"></i></a>
                        </li>
                    </ul>
                </div>
                <div class="aui-localdataui-scroll content-html" style="display:none;">
                    <ul style="transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1); transition-duration: 0ms; transform: translate(0px, 0px) translateZ(0px);">
                        <li data-value="240">
                            <a href="${S_DOMAIN.m}/qinghai/${uri}/">青海省
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="240020">
                            <a href="${S_DOMAIN.m}/xining/${uri}/">西宁
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="240030">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=240030${queryParam}">海东
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="240040">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=240040${queryParam}">海西
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="240050">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=240050${queryParam}">海北
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="240060">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=240060${queryParam}">黄南
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="240070">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=240070${queryParam}">海南
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="240080">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=240080${queryParam}">果洛
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="240090">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=240090${queryParam}">玉树
                                <i class="text-icon icon-check"></i></a>
                        </li>
                    </ul>
                </div>
                <div class="aui-localdataui-scroll content-html" style="display:none;">
                    <ul style="transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1); transition-duration: 0ms; transform: translate(0px, 0px) translateZ(0px);">
                        <li data-value="250">
                            <a href="${S_DOMAIN.m}/shandong/${uri}/">山东省
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="250020">
                            <a href="${S_DOMAIN.m}/jinan/${uri}/">济南
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="250030">
                            <a href="${S_DOMAIN.m}/dezhou/${uri}/">德州
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="250040">
                            <a href="${S_DOMAIN.m}/dongying/${uri}/">东营
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="250050">
                            <a href="${S_DOMAIN.m}/jining/${uri}/">济宁
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="250060">
                            <a href="${S_DOMAIN.m}/linyi/${uri}/">临沂
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="250070">
                            <a href="${S_DOMAIN.m}/qingdao/${uri}/">青岛
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="250080">
                            <a href="${S_DOMAIN.m}/rizhao/${uri}/">日照
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="250090">
                            <a href="${S_DOMAIN.m}/taian/${uri}/">泰安
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="250100">
                            <a href="${S_DOMAIN.m}/weihai/${uri}/">威海
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="250110">
                            <a href="${S_DOMAIN.m}/weifang/${uri}/">潍坊
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="250120">
                            <a href="${S_DOMAIN.m}/yantai/${uri}/">烟台
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="250130">
                            <a href="${S_DOMAIN.m}/zibo/${uri}/">淄博
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="250140">
                            <a href="${S_DOMAIN.m}/zaozhuang/${uri}/">枣庄
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="250150">
                            <a href="${S_DOMAIN.m}/binzhou/${uri}/">滨州
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="250160">
                            <a href="${S_DOMAIN.m}/liaocheng/${uri}/">聊城
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="250170">
                            <a href="${S_DOMAIN.m}/heze/${uri}/">菏泽
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="250180">
                            <a href="${S_DOMAIN.m}/laiwu/${uri}/">莱芜
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="250190">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=250190${queryParam}">荣成
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="250200">
                            <a href="${S_DOMAIN.m}/huangdao/${uri}/">黄岛
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="250210">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=250210${queryParam}">乳山
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="250220">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=250220${queryParam}">城阳
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="250230">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=250230${queryParam}">即墨
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="250240">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=250240${queryParam}">肥城
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="250250">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=250250${queryParam}">兖州
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="250260">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=250260${queryParam}">海阳
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="250270">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=250270${queryParam}">胶州
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="250280">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=250280${queryParam}">胶南
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="250290">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=250290${queryParam}">平度
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="250300">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=250300${queryParam}">莱西
                                <i class="text-icon icon-check"></i></a>
                        </li>
                    </ul>
                </div>
                <div class="aui-localdataui-scroll content-html" style="display:none;">
                    <ul style="transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1); transition-duration: 0ms; transform: translate(0px, 0px) translateZ(0px);">
                        <li data-value="260">
                            <a href="${S_DOMAIN.m}/shanxi0351/${uri}/">山西省
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="260020">
                            <a href="${S_DOMAIN.m}/taiyuan/${uri}/">太原
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="260030">
                            <a href="${S_DOMAIN.m}/datong/${uri}/">大同
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="260040">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=260040${queryParam}">临汾
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="260050">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=260050${queryParam}">运城
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="260060">
                            <a href="${S_DOMAIN.m}/changzhi/${uri}/">长治
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="260070">
                            <a href="${S_DOMAIN.m}/yangquan/${uri}/">阳泉
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="260080">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=260080${queryParam}">晋城
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="260090">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=260090${queryParam}">朔州
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="260100">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=260100${queryParam}">晋中
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="260110">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=260110${queryParam}">忻州
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="260120">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=260120${queryParam}">吕梁
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="260130">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=260130${queryParam}">永济
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="260140">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=260140${queryParam}">和顺
                                <i class="text-icon icon-check"></i></a>
                        </li>
                    </ul>
                </div>
                <div class="aui-localdataui-scroll content-html" style="display:none;">
                    <ul style="transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1); transition-duration: 0ms; transform: translate(0px, 0px) translateZ(0px);">
                        <li data-value="270">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=270${queryParam}">陕西省
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="270020">
                            <a href="${S_DOMAIN.m}/xian/${uri}/">西安
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="270030">
                            <a href="${S_DOMAIN.m}/baoji/${uri}/">宝鸡
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="270040">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=270040${queryParam}">咸阳
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="270050">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=270050${queryParam}">铜川
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="270060">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=270060${queryParam}">渭南
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="270070">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=270070${queryParam}">汉中
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="270080">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=270080${queryParam}">安康
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="270090">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=270090${queryParam}">商洛
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="270100">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=270100${queryParam}">延安
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="270110">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=270110${queryParam}">榆林
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="270120">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=270120${queryParam}">杨凌
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="270130">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=270130${queryParam}">兴平
                                <i class="text-icon icon-check"></i></a>
                        </li>
                    </ul>
                </div>
                <div class="aui-localdataui-scroll content-html" style="display:none;">
                    <ul style="transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1); transition-duration: 0ms; transform: translate(0px, 0px) translateZ(0px);">
                        <li data-value="280">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=280${queryParam}">四川省
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="280020">
                            <a href="${S_DOMAIN.m}/cd/${uri}/">成都
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="280030">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=280030${queryParam}">乐山
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="280040">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=280040${queryParam}">泸州
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="280050">
                            <a href="${S_DOMAIN.m}/mianyang/${uri}/">绵阳
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="280060">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=280060${queryParam}">内江
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="280070">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=280070${queryParam}">宜宾
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="280080">
                            <a href="${S_DOMAIN.m}/zigong/${uri}/">自贡
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="280090">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=280090${queryParam}">攀枝花
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="280100">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=280100${queryParam}">德阳
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="280110">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=280110${queryParam}">广元
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="280120">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=280120${queryParam}">遂宁
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="280130">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=280130${queryParam}">南充
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="280140">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=280140${queryParam}">眉山
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="280150">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=280150${queryParam}">广安
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="280160">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=280160${queryParam}">达州
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="280170">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=280170${queryParam}">雅安
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="280180">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=280180${queryParam}">巴中
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="280190">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=280190${queryParam}">资阳
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="280200">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=280200${queryParam}">西昌
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="280210">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=280210${queryParam}">甘孜
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="280220">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=280220${queryParam}">阿坝
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="280230">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=280230${queryParam}">凉山
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="280240">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=280240${queryParam}">峨眉
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="280250">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=280250${queryParam}">简阳
                                <i class="text-icon icon-check"></i></a>
                        </li>
                    </ul>
                </div>
                <div class="aui-localdataui-scroll content-html" style="display:none;">
                    <ul style="transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1); transition-duration: 0ms; transform: translate(0px, 0px) translateZ(0px);">
                        <li data-value="290">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=290${queryParam}">西藏
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="290020">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=290020${queryParam}">拉萨
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="290030">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=290030${queryParam}">日喀则
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="290040">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=290040${queryParam}">林芝
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="290050">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=290050${queryParam}">山南
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="290060">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=290060${queryParam}">昌都
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="290070">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=290070${queryParam}">那曲
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="290080">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=290080${queryParam}">阿里
                                <i class="text-icon icon-check"></i></a>
                        </li>
                    </ul>
                </div>
                <div class="aui-localdataui-scroll content-html" style="display:none;">
                    <ul style="transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1); transition-duration: 0ms; transform: translate(0px, 0px) translateZ(0px);">
                        <li data-value="300">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=300${queryParam}">新疆
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="300020">
                            <a href="${S_DOMAIN.m}/wulumuqi/${uri}/">乌鲁木齐
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="300030">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=300030${queryParam}">喀什
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="300040">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=300040${queryParam}">克拉玛依
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="300050">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=300050${queryParam}">伊犁
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="300060">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=300060${queryParam}">阿克苏
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="300070">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=300070${queryParam}">哈密
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="300080">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=300080${queryParam}">石河子
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="300090">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=300090${queryParam}">阿拉尔
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="300100">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=300100${queryParam}">五家渠
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="300110">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=300110${queryParam}">图木舒克
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="300120">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=300120${queryParam}">昌吉
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="300130">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=300130${queryParam}">阿勒泰
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="300140">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=300140${queryParam}">吐鲁番
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="300150">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=300150${queryParam}">塔城
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="300160">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=300160${queryParam}">和田
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="300180">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=300180${queryParam}">巴音郭楞
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="300190">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=300190${queryParam}">博尔塔拉
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="300200">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=300200${queryParam}">奎屯市
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="300210">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=300210${queryParam}">乌苏
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="300170">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=300170${queryParam}">克孜勒苏柯尔克孜
                                <i class="text-icon icon-check"></i></a>
                        </li>
                    </ul>
                </div>
                <div class="aui-localdataui-scroll content-html" style="display:none;">
                    <ul style="transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1); transition-duration: 0ms; transform: translate(0px, 0px) translateZ(0px);">
                        <li data-value="310">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=310${queryParam}">云南省
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="310020">
                            <a href="${S_DOMAIN.m}/kunming/${uri}/">昆明
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="310030">
                            <a href="${S_DOMAIN.m}/dali/${uri}/">大理
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="310040">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=310040${queryParam}">丽江
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="310050">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=310050${queryParam}">玉溪
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="310060">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=310060${queryParam}">曲靖
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="310070">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=310070${queryParam}">保山
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="310080">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=310080${queryParam}">昭通
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="310090">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=310090${queryParam}">普洱
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="310100">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=310100${queryParam}">临沧
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="310110">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=310110${queryParam}">红河
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="310120">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=310120${queryParam}">文山
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="310130">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=310130${queryParam}">西双版纳
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="310140">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=310140${queryParam}">德宏
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="310150">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=310150${queryParam}">楚雄
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="310160">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=310160${queryParam}">怒江
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="310170">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=310170${queryParam}">迪庆
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="310180">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=310180${queryParam}">思茅
                                <i class="text-icon icon-check"></i></a>
                        </li>
                    </ul>
                </div>
                <div class="aui-localdataui-scroll content-html" style="display:none;">
                    <ul style="transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1); transition-duration: 0ms; transform: translate(0px, 0px) translateZ(0px);">
                        <li data-value="320">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=320${queryParam}">香港
                                <i class="text-icon icon-check"></i></a>
                        </li>
                    </ul>
                </div>
                <div class="aui-localdataui-scroll content-html" style="display:none;">
                    <ul style="transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1); transition-duration: 0ms; transform: translate(0px, 0px) translateZ(0px);">
                        <li data-value="330">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=330${queryParam}">澳门
                                <i class="text-icon icon-check"></i></a>
                        </li>
                    </ul>
                </div>
                <div class="aui-localdataui-scroll content-html" style="display:none;">
                    <ul style="transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1); transition-duration: 0ms; transform: translate(0px, 0px) translateZ(0px);">
                        <li data-value="340">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=340${queryParam}">台湾
                                <i class="text-icon icon-check"></i></a>
                        </li>
                    </ul>
                </div>
                <div class="aui-localdataui-scroll content-html" style="display:none;">
                    <ul style="transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1); transition-duration: 0ms; transform: translate(0px, 0px) translateZ(0px);">
                        <li data-value="350">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=350${queryParam}">亚洲
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="350020">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=350020${queryParam}">蒙古
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="350030">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=350030${queryParam}">朝鲜
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="350040">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=350040${queryParam}">韩国
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="350050">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=350050${queryParam}">日本
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="350060">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=350060${queryParam}">菲律宾
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="350070">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=350070${queryParam}">越南
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="350080">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=350080${queryParam}">老挝
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="350090">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=350090${queryParam}">柬埔寨
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="350100">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=350100${queryParam}">缅甸
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="350110">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=350110${queryParam}">泰国
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="350120">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=350120${queryParam}">马来西亚
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="350130">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=350130${queryParam}">文莱
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="350140">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=350140${queryParam}">新加坡
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="350150">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=350150${queryParam}">印度尼西亚
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="350160">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=350160${queryParam}">东帝汶
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="350170">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=350170${queryParam}">尼泊尔
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="350180">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=350180${queryParam}">不丹
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="350190">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=350190${queryParam}">孟加拉
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="350200">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=350200${queryParam}">印度
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="350210">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=350210${queryParam}">巴基斯坦
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="350220">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=350220${queryParam}">斯里兰卡
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="350230">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=350230${queryParam}">马尔代夫
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="350240">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=350240${queryParam}">哈萨克斯坦
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="350250">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=350250${queryParam}">吉尔吉斯
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="350260">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=350260${queryParam}">塔吉克斯坦
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="350270">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=350270${queryParam}">乌兹别克
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="350280">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=350280${queryParam}">土库曼斯坦
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="350290">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=350290${queryParam}">阿富汗
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="350300">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=350300${queryParam}">伊拉克
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="350310">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=350310${queryParam}">伊朗
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="350320">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=350320${queryParam}">叙利亚
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="350330">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=350330${queryParam}">约旦
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="350340">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=350340${queryParam}">黎巴嫩
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="350350">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=350350${queryParam}">以色列
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="350360">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=350360${queryParam}">巴勒斯坦
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="350370">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=350370${queryParam}">沙特阿拉伯
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="350380">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=350380${queryParam}">巴林
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="350390">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=350390${queryParam}">卡塔尔
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="350400">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=350400${queryParam}">科威特
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="350410">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=350410${queryParam}">阿联酋
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="350420">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=350420${queryParam}">阿曼
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="350430">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=350430${queryParam}">也门
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="350440">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=350440${queryParam}">格鲁吉亚
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="350450">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=350450${queryParam}">亚美尼亚
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="350460">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=350460${queryParam}">阿塞拜疆
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="350470">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=350470${queryParam}">土耳其
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="350480">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=350480${queryParam}">塞浦路斯
                                <i class="text-icon icon-check"></i></a>
                        </li>
                    </ul>
                </div>
                <div class="aui-localdataui-scroll content-html" style="display:none;">
                    <ul style="transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1); transition-duration: 0ms; transform: translate(0px, 0px) translateZ(0px);">
                        <li data-value="360">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=360${queryParam}">北美洲
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="360020">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=360020${queryParam}">加拿大
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="360030">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=360030${queryParam}">美国
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="360040">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=360040${queryParam}">墨西哥
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="360050">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=360050${queryParam}">格陵兰
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="360060">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=360060${queryParam}">危地马拉
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="360070">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=360070${queryParam}">伯利兹
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="360080">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=360080${queryParam}">萨尔瓦多
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="360090">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=360090${queryParam}">洪都拉斯
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="360100">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=360100${queryParam}">尼加拉瓜
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="360110">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=360110${queryParam}">哥斯达黎加
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="360120">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=360120${queryParam}">巴拿马
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="360130">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=360130${queryParam}">巴哈马
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="360140">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=360140${queryParam}">古巴
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="360150">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=360150${queryParam}">牙买加
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="360160">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=360160${queryParam}">海地
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="360170">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=360170${queryParam}">多米尼加
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="360180">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=360180${queryParam}">安提瓜
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="360190">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=360190${queryParam}">圣基茨
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="360200">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=360200${queryParam}">多米尼克
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="360210">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=360210${queryParam}">圣卢西亚
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="360220">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=360220${queryParam}">圣文森特
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="360230">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=360230${queryParam}">格林纳达
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="360240">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=360240${queryParam}">巴巴多斯
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="360250">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=360250${queryParam}">特立尼达
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="360260">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=360260${queryParam}">波多黎各
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="360270">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=360270${queryParam}">英属维尔京
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="360280">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=360280${queryParam}">美属维尔京
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="360290">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=360290${queryParam}">安圭拉
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="360300">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=360300${queryParam}">蒙特塞拉特
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="360310">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=360310${queryParam}">瓜德罗普
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="360320">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=360320${queryParam}">马提尼克
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="360330">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=360330${queryParam}">安的列斯
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="360340">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=360340${queryParam}">阿鲁巴
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="360350">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=360350${queryParam}">特克斯
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="360360">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=360360${queryParam}">开曼群岛
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="360370">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=360370${queryParam}">百慕大
                                <i class="text-icon icon-check"></i></a>
                        </li>
                    </ul>
                </div>
                <div class="aui-localdataui-scroll content-html" style="display:none;">
                    <ul style="transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1); transition-duration: 0ms; transform: translate(0px, 0px) translateZ(0px);">
                        <li data-value="370">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=370${queryParam}">南美洲
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="370020">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=370020${queryParam}">哥伦比亚
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="370030">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=370030${queryParam}">委内瑞拉
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="370040">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=370040${queryParam}">圭亚那
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="370050">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=370050${queryParam}">法属圭亚那
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="370060">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=370060${queryParam}">苏里南
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="370070">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=370070${queryParam}">厄瓜多尔
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="370080">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=370080${queryParam}">秘鲁
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="370090">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=370090${queryParam}">玻利维亚
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="370100">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=370100${queryParam}">巴西
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="370110">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=370110${queryParam}">智利
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="370120">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=370120${queryParam}">阿根廷
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="370130">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=370130${queryParam}">乌拉圭
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="370140">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=370140${queryParam}">巴拉圭
                                <i class="text-icon icon-check"></i></a>
                        </li>
                    </ul>
                </div>
                <div class="aui-localdataui-scroll content-html" style="display:none;">
                    <ul style="transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1); transition-duration: 0ms; transform: translate(0px, 0px) translateZ(0px);">
                        <li data-value="380">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=380${queryParam}">大洋洲
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="380020">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=380020${queryParam}">澳大利亚
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="380030">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=380030${queryParam}">新西兰
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="380040">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=380040${queryParam}">巴布亚
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="380050">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=380050${queryParam}">所罗门群岛
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="380060">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=380060${queryParam}">瓦努阿图
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="380080">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=380080${queryParam}">马绍尔群岛
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="380090">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=380090${queryParam}">帕劳群岛
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="380100">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=380100${queryParam}">瑙鲁
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="380110">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=380110${queryParam}">基里巴斯
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="380120">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=380120${queryParam}">图瓦卢
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="380130">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=380130${queryParam}">萨摩亚
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="380140">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=380140${queryParam}">斐济群岛
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="380150">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=380150${queryParam}">汤加
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="380160">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=380160${queryParam}">库克群岛
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="380170">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=380170${queryParam}">关岛
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="380190">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=380190${queryParam}">波利尼西亚
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="380200">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=380200${queryParam}">皮特凯恩岛
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="380210">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=380210${queryParam}">瓦利斯
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="380220">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=380220${queryParam}">纽埃
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="380230">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=380230${queryParam}">托克劳
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="380240">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=380240${queryParam}">美属萨摩亚
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="380250">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=380250${queryParam}">北马里亚纳
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="380070">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=380070${queryParam}">密克罗尼西亚
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="380180">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=380180${queryParam}">新喀里多尼亚
                                <i class="text-icon icon-check"></i></a>
                        </li>
                    </ul>
                </div>
                <div class="aui-localdataui-scroll content-html" style="display:none;">
                    <ul style="transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1); transition-duration: 0ms; transform: translate(0px, 0px) translateZ(0px);">
                        <li data-value="390">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=390${queryParam}">欧洲
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="390020">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=390020${queryParam}">芬兰
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="390030">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=390030${queryParam}">瑞典
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="390040">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=390040${queryParam}">挪威
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="390050">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=390050${queryParam}">冰岛
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="390060">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=390060${queryParam}">丹麦
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="390070">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=390070${queryParam}">法罗群岛
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="390080">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=390080${queryParam}">爱沙尼亚
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="390090">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=390090${queryParam}">拉脱维亚
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="390100">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=390100${queryParam}">立陶宛
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="390110">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=390110${queryParam}">白俄罗斯
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="390120">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=390120${queryParam}">俄罗斯
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="390130">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=390130${queryParam}">乌克兰
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="390140">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=390140${queryParam}">摩尔多瓦
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="390150">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=390150${queryParam}">波兰
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="390160">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=390160${queryParam}">捷克
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="390450">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=390450${queryParam}">斯洛伐克
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="390170">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=390170${queryParam}">匈牙利
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="390180">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=390180${queryParam}">德国
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="390190">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=390190${queryParam}">奥地利
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="390200">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=390200${queryParam}">瑞士
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="390210">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=390210${queryParam}">列支敦士登
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="390220">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=390220${queryParam}">英国
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="390230">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=390230${queryParam}">爱尔兰
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="390240">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=390240${queryParam}">荷兰
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="390250">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=390250${queryParam}">比利时
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="390260">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=390260${queryParam}">卢森堡
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="390270">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=390270${queryParam}">法国
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="390280">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=390280${queryParam}">摩纳哥
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="390290">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=390290${queryParam}">罗马尼亚
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="390300">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=390300${queryParam}">保加利亚
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="390310">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=390310${queryParam}">塞尔维亚
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="390320">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=390320${queryParam}">马其顿
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="390330">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=390330${queryParam}">阿尔巴尼亚
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="390340">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=390340${queryParam}">希腊
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="390350">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=390350${queryParam}">斯洛文尼亚
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="390360">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=390360${queryParam}">克罗地亚
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="390370">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=390370${queryParam}">波墨
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="390380">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=390380${queryParam}">意大利
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="390390">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=390390${queryParam}">梵蒂冈
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="390400">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=390400${queryParam}">圣马力诺
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="390410">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=390410${queryParam}">马耳他
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="390420">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=390420${queryParam}">西班牙
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="390430">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=390430${queryParam}">葡萄牙
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="390440">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=390440${queryParam}">安道尔
                                <i class="text-icon icon-check"></i></a>
                        </li>
                    </ul>
                </div>
                <div class="aui-localdataui-scroll content-html" style="display:none;">
                    <ul style="transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1); transition-duration: 0ms; transform: translate(0px, 0px) translateZ(0px);">
                        <li data-value="400">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=400${queryParam}">非洲
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="400020">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=400020${queryParam}">埃及
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="400030">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=400030${queryParam}">利比亚
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="400040">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=400040${queryParam}">苏丹
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="400050">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=400050${queryParam}">突尼斯
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="400060">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=400060${queryParam}">阿尔及利亚
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="400070">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=400070${queryParam}">摩洛哥
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="400080">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=400080${queryParam}">亚速尔群岛
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="400090">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=400090${queryParam}">马德拉群岛
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="400100">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=400100${queryParam}">埃塞俄比亚
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="400110">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=400110${queryParam}">厄立特里亚
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="400120">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=400120${queryParam}">索马里
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="400130">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=400130${queryParam}">吉布提
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="400140">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=400140${queryParam}">肯尼亚
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="400150">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=400150${queryParam}">坦桑尼亚
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="400160">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=400160${queryParam}">乌干达
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="400170">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=400170${queryParam}">卢旺达
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="400180">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=400180${queryParam}">布隆迪
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="400190">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=400190${queryParam}">塞舌尔
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="400200">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=400200${queryParam}">乍得
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="400210">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=400210${queryParam}">中非
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="400220">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=400220${queryParam}">喀麦隆
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="400230">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=400230${queryParam}">赤道几内亚
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="400240">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=400240${queryParam}">加蓬
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="400250">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=400250${queryParam}">刚果
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="400260">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=400260${queryParam}">圣普
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="400270">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=400270${queryParam}">毛里塔尼亚
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="400280">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=400280${queryParam}">西撒哈拉
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="400290">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=400290${queryParam}">塞内加尔
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="400300">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=400300${queryParam}">冈比亚
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="400310">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=400310${queryParam}">马里
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="400320">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=400320${queryParam}">布基纳法索
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="400330">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=400330${queryParam}">几内亚
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="400340">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=400340${queryParam}">几内亚比绍
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="400350">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=400350${queryParam}">佛得角
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="400360">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=400360${queryParam}">塞拉利昂
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="400370">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=400370${queryParam}">利比里亚
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="400380">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=400380${queryParam}">科特迪瓦
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="400390">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=400390${queryParam}">加纳
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="400400">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=400400${queryParam}">多哥
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="400410">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=400410${queryParam}">贝宁
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="400420">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=400420${queryParam}">尼日尔
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="400430">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=400430${queryParam}">加那利群岛
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="400440">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=400440${queryParam}">赞比亚
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="400450">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=400450${queryParam}">安哥拉
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="400460">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=400460${queryParam}">津巴布韦
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="400470">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=400470${queryParam}">马拉维
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="400480">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=400480${queryParam}">莫桑比克
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="400490">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=400490${queryParam}">博茨瓦纳
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="400500">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=400500${queryParam}">纳米比亚
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="400510">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=400510${queryParam}">南非
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="400520">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=400520${queryParam}">斯威士兰
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="400530">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=400530${queryParam}">莱索托
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="400540">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=400540${queryParam}">马达加斯加
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="400550">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=400550${queryParam}">科摩罗
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="400560">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=400560${queryParam}">毛里求斯
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="400570">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=400570${queryParam}">留尼旺
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="400580">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=400580${queryParam}">圣赫勒拿
                                <i class="text-icon icon-check"></i></a>
                        </li>
                        <li data-value="400590">
                            <a rel="nofollow" href="${S_DOMAIN.m}/zhaopin/?dqs=400590${queryParam}">尼日利亚
                                <i class="text-icon icon-check"></i></a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="aui-localdataui-btns">
                <button data-selector="cancel-static-city" class="btn btn-localdataui-cancel">取消</button>
            </div>
        </div>
    </div>
    <div class="aui-dialog-btns flexbox"></div>
</div>