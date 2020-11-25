<%@ page language="java" pageEncoding="utf-8" %>
<%-- 这个页面是原来的header.jsp的替代品，解决变量 --%>
<nav class="nav">
    <a class="left" href="/"><img src="https://s.lietou-static.com/fe-mobile-h5/v5/static/images/logo_icon.png"/></a>
    <h1>${empty title ? param.title: title}</h1>
    <a class="right" data-nick="nav-right-btn" href="javascript:;"><i class="text-icon icon-user"></i></a>
</nav>
