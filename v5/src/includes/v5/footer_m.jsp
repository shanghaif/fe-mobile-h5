<%--
  Created by wanglc.
  Date: 2017/3/13
  Time: 14:47
  作用与footer.html 作用相同，修改电脑版链接为动态，如果链接不存在，使用www主页。SEO移动适配添加
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="td" uri="/WEB-INF/lb.tld" %>
<footer>
    <div class="browse-list">
        <ul class="flexbox">
            <li class="flex-1">
                <c:choose>
                    <c:when test="${not empty pcUrl}">
                        <a href="${pcUrl}">电脑版</a>
                    </c:when>
                    <c:otherwise>
                        <a href="https://www.liepin.com/?s=m">电脑版</a>
                    </c:otherwise>
                </c:choose>
            </li>
            <li class="flex-1">
                <a class="active" href="javascript:;">触屏版</a>
            </li>
            <li class="flex-1">
                <a href="https://app-tongdao.liepin.com/p/download/liepinmishu-latest-mobile-auto?from=mindex">客户端</a>
            </li>
        </ul>
    </div>
    <div class="menu-list">
        <ul class="flexbox">
            <li class="flex-1">
                <a href="/">首页</a>
            </li>
            <li class="flex-1">
                <a href="/h/?c=0" rel="nofollow">帮助</a>
            </li>
            <li class="flex-1">
                <a href="https://m-c.liepin.com/feedback/editfeedback/" rel="nofollow">反馈</a>
            </li>
            <li class="flex-1">
                <a href="/about_us/" rel="nofollow">关于</a>
            </li>
        </ul>
    </div>
    <div class="footer-tip"><a href="http://www.beian.miit.gov.cn" target="_blank"
                               style="color: #999;">京ICP备09083200号</a> 合字B2-20160007<br>
        人才服务许可证:120116174002号 <img src="https://s.lietou-static.com/fe-mobile-h5/v5/static/images/police.png"
                                   style="width: 15px;height: 15px;"><a
                href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010502035189" target="_blank"
                style="color: #999;">京公网安备:11010502035189</a><br>
        Copyright © ${td:getCopyright()} liepin.com All Rights Reserved
    </div>
</footer>