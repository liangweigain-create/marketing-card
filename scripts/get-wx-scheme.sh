#!/bin/bash

# ============================================
# 微信小程序 URL Scheme 生成脚本
# ============================================
# 使用方法：
# 1. 修改下方的 APPID 和 SECRET
# 2. 终端执行：chmod +x scripts/get-wx-scheme.sh
# 3. 终端执行：./scripts/get-wx-scheme.sh
# ============================================

# ⚠️ 请替换为你的小程序 AppID 和 Secret
APPID="wxa91cf7282d5a4c3a"
SECRET="你的SECRET"

# 可选：指定跳转的页面路径（留空则跳转首页）
PAGE_PATH=""
# 可选：页面参数（如 id=123）
PAGE_QUERY=""

echo "🔄 正在获取 access_token..."

# 获取 access_token
TOKEN_RESPONSE=$(curl -s "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APPID}&secret=${SECRET}")

# 解析 access_token
ACCESS_TOKEN=$(echo $TOKEN_RESPONSE | grep -o '"access_token":"[^"]*"' | cut -d'"' -f4)

if [ -z "$ACCESS_TOKEN" ]; then
    echo "❌ 获取 access_token 失败"
    echo "返回结果: $TOKEN_RESPONSE"
    exit 1
fi

echo "✅ access_token 获取成功"
echo ""
echo "🔄 正在生成 URL Scheme..."

# 构建请求体
if [ -n "$PAGE_PATH" ]; then
    REQUEST_BODY="{\"jump_wxa\":{\"path\":\"${PAGE_PATH}\",\"query\":\"${PAGE_QUERY}\"}}"
else
    REQUEST_BODY="{}"
fi

# 生成 URL Scheme
SCHEME_RESPONSE=$(curl -s -X POST "https://api.weixin.qq.com/wxa/generatescheme?access_token=${ACCESS_TOKEN}" \
    -H "Content-Type: application/json" \
    -d "$REQUEST_BODY")

# 解析 openlink
OPENLINK=$(echo $SCHEME_RESPONSE | grep -o '"openlink":"[^"]*"' | cut -d'"' -f4)

if [ -z "$OPENLINK" ]; then
    echo "❌ 生成 URL Scheme 失败"
    echo "返回结果: $SCHEME_RESPONSE"
    exit 1
fi

echo "✅ URL Scheme 生成成功！"
echo ""
echo "============================================"
echo "🔗 你的 URL Scheme:"
echo ""
echo "   $OPENLINK"
echo ""
echo "============================================"
echo ""
echo "📌 使用方法："
echo "   在网页中使用 <a href=\"$OPENLINK\">打开小程序</a>"
echo "   或在 Markdown 中：[打开小程序]($OPENLINK)"
echo ""
