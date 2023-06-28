import os
import markdown

def readContent(path):
    with open(path, "r", encoding="utf-8") as file:
        con = "".join(file.readlines())
        return con


dirPath = "./doc"
fileList = os.listdir(dirPath)

content = readContent("./README.md") + "\n"
for filePath in fileList:
    content += readContent(dirPath+"/"+filePath)
    content += "\n"

html = markdown.markdown(content)

with open("dist.html", "w", encoding="utf-8") as file:
    file.write(html)
