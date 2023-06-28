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

print("load content complete.")

html = markdown.markdown(content)

print("convert to html complete.")

with open("./dist/index.html", "w", encoding="utf-8") as file:
    file.write(html)

print("build complete.")
