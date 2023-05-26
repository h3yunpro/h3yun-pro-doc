# 部门/人员/角色

在氚云的后端，可以两种方式（SQL、API）获取 部门/人员/权限 三类的信息，本篇文档演示在后端通过API的方式获取。

## 部门

### 部门类属性

| 属性名                | 数据类型                         | 释义            |
|--------------------|------------------------------|-----------------------|
| ObjectId           | ```String```                 | 部门Id                |
| Name               | ```String```                 | 部门名称               |
| ManagerId          | ```String```                 | 部门经理的人员Id       |
| ParentId           | ```String```                 | 父部门Id              |

### 部门实例方法

1. 获取用户所在部门

``` cs
H3.Organization.Unit unit = this.Engine.Organization.GetParentUnit("用户Id");   
```

2. 根据人员Id查询其所有的部门Id

``` cs
//先获取到人员信息
H3.Organization.User user = (H3.Organization.User) this.Engine.Organization.GetUnit("用户Id");
//通过人员信息获取其所有部门的Id
string[] pIds = user.ParentIds;
```

3. 根据人员id第N级父部门

``` cs
int level = 1;//0是第一级，1是第二级，以此类推
H3.Organization.Unit unit = this.Engine.Organization.GetParentUnitByLevel("用户Id", level);
```

4. 根据部门Id获取其第N级父部门

``` cs
int level = 1;//0是第一级，1是第二级，以此类推
H3.Organization.Unit unit = this.Engine.Organization.GetParentUnitByLevel("部门Id", level);
```

5. 判断一个部门是否是另一个部门的祖先部门

``` cs
//isAncestor：结果为true表示是祖先部门
bool isAncestor = this.Engine.Organization.IsAncestor("子孙部门Id", "祖先部门Id");
```

6. 根据部门Id获取部门名称

``` cs
/*
    H3.Organization.NameType：枚举，有以下选项
        H3.Organization.NameType.Name       名称
        H3.Organization.NameType.Path       组织路径，/Company/OU1/OU2 格式
        H3.Organization.NameType.FullName   完整名称，/Company/OU1/OU2 格式
*/
H3.Organization.NameType type = H3.Organization.NameType.Name;
string name=this.Engine.Organization.GetName("部门Id", type);
```
