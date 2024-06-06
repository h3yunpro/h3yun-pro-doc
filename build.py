import os
import re
from markdown2 import Markdown


def readContent(path):
    """
    读取文件内容
    :param path: 文件路径
    :return: 文件内容
    """
    if not os.path.exists(path):
        return ""
    with open(path, "r", encoding="utf-8") as file:
        return file.read()


def writeContent(path, content):
    """
    写入文件内容
    :param path: 文件路径
    :param content: 文件内容
    :return: None
    """
    if not os.path.exists(os.path.dirname(path)):
        os.makedirs(os.path.dirname(path))
    with open(path, "w", encoding="utf-8") as file:
        file.write(content)


def mergeContent(buildDir):
    """
    合并所有md文件
    :param buildDir: 构建目录
    :return: 合并后的内容
    """
    sidebar = readContent("./_sidebar.md")
    pathList = re.findall("\(\/doc\/.+\)", sidebar)

    content = ""
    if pathList is not None and len(pathList) > 0:
        for filePath in pathList:
            filePath = filePath.replace("(", "").replace(")", "")
            filePath = "." + filePath + ".md"
            content += readContent(filePath) + "\n\n"

    if not os.path.exists(buildDir):
        os.mkdir(buildDir)
    return content


def count_words_and_chars(content):
    """
    统计中文字符和英文单词的数量
    :param content: 文本内容
    :return: 中文字符数，英文单词数
    """
    # 使用正则表达式匹配中文字符和英文单词
    chinese_chars = len(re.findall(r"[\u4e00-\u9fa5]", content))  # 匹配中文字符
    english_words = len(
        re.findall(r"\b\w+\b", content, re.IGNORECASE)
    )  # 匹配英文单词（不区分大小写）

    return chinese_chars, english_words


def remove_script_tags(html):
    start_tag = "<script"
    end_tag = "</script>"

    script_start = html.find(start_tag)
    while script_start != -1:
        script_end = html.find(end_tag, script_start + len(start_tag))
        if script_end != -1:
            # 移除找到的script标签及其内容
            html = html[:script_start] + html[script_end + len(end_tag) :]
            # 更新起始位置，以检查是否有嵌套的script标签
            script_start = html.find(start_tag, script_start)
        else:
            # 如果找不到结束标签，跳过当前开始标签并继续查找
            script_start = html.find(start_tag, script_start + 1)

    return html


if __name__ == "__main__":
    print("build start.")

    buildDir = "./build"
    convert = Markdown(
        extras=[
            "footnotes",
            "tables",
            "code-color",
            "fenced-code-blocks",
            "highlightjs-lang",
            "html-classes",
        ]
    )
    content = mergeContent(buildDir)

    chinese_count, english_count = count_words_and_chars(content)
    print(
        f"中文字符数: {chinese_count}，英文单词数: {english_count}，总计：{chinese_count+english_count}"
    )

    writeContent(buildDir + "/index.md", content)

    print("save md.")

    # 读取index.html文件内容
    html = readContent("./index.html")
    # 截取<body>标签之前的内容
    html = html[: html.find("</head>")]
    # 去除<link>标签
    html = re.sub(r"<link.*?>", "", html)
    # 去除<style>标签
    html = re.sub(r"<style.*?>.*?</style>", "", html)
    # 去除<script>标签
    html = remove_script_tags(html)
    # 去除注释
    html = re.sub(r"<!--.*?-->", "", html)

    html += (
        "<link rel='icon' href='../favicon.ico' /><link rel='stylesheet' href='../css/vue.css'>\n\n</head>\n\n<body class='ready sticky'>\n\n<div id='app' style='text-align: left;'>"
        + convert.convert(content)
    )
    html += "\n\n</div></body></html>"
    writeContent(buildDir + "/index.html", html)

    print("save html.")
