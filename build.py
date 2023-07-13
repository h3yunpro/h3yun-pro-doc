import os
import re
from markdown2 import Markdown


def readContent(path):
    with open(path, "r", encoding="utf-8") as file:
        return file.read()


def mergeContent():
    sidebar = readContent("./_sidebar.md")
    pathList = re.findall("\(\/doc\/.+\)", sidebar)

    content = readContent("./README.md") + "\n"
    if pathList is not None and len(pathList) > 0:
        for filePath in pathList:
            filePath = filePath.replace("(", "").replace(")", "")
            filePath = "."+filePath+".md"
            content += readContent(filePath) + "\n"

    if not os.path.exists(buildDir):
        os.mkdir(buildDir)
    return content


if __name__ == "__main__":
    print("build start.")

    buildDir = "./build"
    convert = Markdown()
    content = mergeContent()

    with open(buildDir+"/index.md", "w", encoding="utf-8") as file:
        file.write(content)

    print("save md.")

    html = "<!DOCTYPE html><html lang='cn'><head><meta charset='UTF-8'><meta http-equiv='X-UA-Compatible' content='IE=edge'><meta name='viewport' content='width=device-width,initial-scale=1,minimum-scale=1'><meta name='keywords' content='氚云,氚云专业版,氚云文档,氚云专业版文档,氚专开发者共创文档,氚云专业版扩展文档,氚专开发者文档'><meta name='description' content='氚专开发者共创文档'><title>氚专开发者共创文档</title></head><body>"
    html += convert.convert(content)
    html += "</body></html>"
    with open(buildDir+"/index.html", "w", encoding="utf-8") as file:
        file.write(html)

    print("save html.")