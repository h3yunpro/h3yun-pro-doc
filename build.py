import os
import re
from markdown2 import Markdown


def readContent(path):
    with open(path, "r", encoding="utf-8") as file:
        return file.read()


def mergeContent():
    buildDir = "./build"
    convert = Markdown()

    sidebar = readContent("./_sidebar.md")
    pathList = re.findall("\(\/doc\/.+\)", sidebar)

    html = "<!DOCTYPE html><html lang='cn'><head><meta charset='UTF-8'><meta http-equiv='X-UA-Compatible' content='IE=edge'><meta name='viewport' content='width=device-width, initial-scale=1.0'><title>氚专开发者共创文档</title></head><body>"
    html += convert.convert(readContent("./README.md") + "\n")
    if pathList is not None and len(pathList) > 0:
        for filePath in pathList:
            filePath = filePath.replace("(", "").replace(")", "")
            filePath = "."+filePath+".md"
            html += convert.convert(readContent(filePath) + "\n")

    html += "</body></html>"

    print("convert to html complete.")

    if not os.path.exists(buildDir):
        os.mkdir(buildDir)

    with open(buildDir+"/index.html", "w", encoding="utf-8") as file:
        file.write(html)

    print("build complete.")


if __name__ == "__main__":
    mergeContent()
