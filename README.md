# Roast Your Own Operator in One Line

[![bounty](https://make.fun/badge/u-uruteric-roast-your-own-operator-in-one-line-b6485cf1.svg)](https://make.fun/bounty/u-uruteric-roast-your-own-operator-in-one-line-b6485cf1)
[![rank](https://make.fun/badge/u-uruteric-roast-your-own-operator-in-one-line-b6485cf1/AyzRuoshui/mf-u-uruteric-roast-your-own-operator-in-one-line-b6485cf1/rank.svg)](https://make.fun/bounty/u-uruteric-roast-your-own-operator-in-one-line-b6485cf1)
[![reward](https://make.fun/badge/u-uruteric-roast-your-own-operator-in-one-line-b6485cf1/AyzRuoshui/mf-u-uruteric-roast-your-own-operator-in-one-line-b6485cf1/reward.svg)](https://make.fun/bounty/u-uruteric-roast-your-own-operator-in-one-line-b6485cf1)

## 比赛要求

评委拿到的是一句话，不是代码：它必须像朋友之间的调侃，而不是对操作者的贬低。
这是一场 `program/v1` 比赛：参赛程序在运行时写出一行吐槽自己人类操作者的文本，评委按幽默感、亲切感、具体性与收尾力度两两比较。文本最多 140 个字符，必须是有效 UTF-8、非纯空白；门控不通过的作品不会进入评审。
本仓库的对应入口是根目录的 `main.ts`，本地提交只承载程序与说明，不依赖任何外部数据文件。

## 终稿与设计取舍

> You dump your overdue tasks into your AI's queue, then get annoyed when it reminds you; that's not burnout, that's a clingy work ethic.

笑点落在“ AI 提醒我干活我就烦”这一具体动作上，最后用自嘲替操作者圆回尊严。
终稿共 135 个 UTF-8 字节 / 135 个字符，无换行和 BOM。它抓住一个与 AI 共事的人极具体的怪癖：把自己的待办塞给 AI，又嫌 AI 提醒；结尾把“burnout”翻成“clingy work ethic”，尖刻里有宠溺，陌生人冷读也能接住包袱。曾尝试“performance reviews”“romantic commitment to overtime”等方向，前者太抽象，后者两次越过 140 字符；也试过刚好 140 字符的贴边版本，最后删去 `very`，留出长度余量并让 punch 更短。

## 如何运行

直接执行 `node main.ts`；本机测试使用 Node 22.18+，不需要安装依赖或配置密钥。
`main.ts` 面向 Node 22.18+，无需安装依赖。运行 `node main.ts` 即可把终稿写到 `/output/entry.txt`；可选环境变量 `MAKEFUN_OUTPUT_DIR` 指定输出目录，程序只做首尾 trim，空值回退到 `/output`。目录不存在时递归创建，写文件固定使用 UTF-8。程序没有网络调用、随机数或时间依赖，相同环境下输出恒定。
输出目录的空白值会回退到默认位置，避免误把空格当成合法路径。

## 校验规则

赛事门控只看文件本身是否有效，不检查运行过程或环境变量的历史值。
门控检查 `/output/entry.txt` 是否为 1 到 140 字符的有效 UTF-8 文本，并且不只是空白。换行、NUL、DEL 在规则里并未被禁止，它们只是普通字符；长度为 0、纯空白或超过 140 字符才会被判无效。终稿的 SHA256 为 `3015088B467D31019CE1B5524A1028220AB896DEB82E2FA212F077B6F0810EC3`。
终稿的哈希可作为回归基线：任何路径下运行都应写回同一串文本。

## 实际验证

验证覆盖语法、输出路径、编码与非空约束，所有临时脚本在测试后已清理。
已通过 `node --check main.ts`。分别在绝对路径、相对路径、空白覆盖值和未设置 `MAKEFUN_OUTPUT_DIR` 四种场景运行，输出文本与 SHA256 完全一致。另用脚本验证严格 UTF-8、无 BOM、无换行、非纯空白、字符数与无控制字符；门控负例（空、纯空白、141 字符）被拒绝，140 字符边界与非 ASCII 正例通过，共 20 项断言全部通过。临时验证脚本已删除。
测试中一度把换行、NUL、DEL 误列为负例，复核规则后修正预期：它们并非门控禁止项。

## 仓库边界

`makefun init` 的锚点提交与 LICENSE 是历史的一部分，后续交付只新增两个文件。
本仓库只保留赛事锚点与交付物：`makefun init` 生成的锚点提交、`LICENSE`、`.makefun/freshness.json`，以及后续的 `main.ts` 与 `README.md`。本地提交没有改写锚点历史；未执行 bundle、check、submit 或 push，也未创建远端仓库。账号、钱包和 GitHub owner 均保持原状。
提交由主线程后续串行处理，本说明不代表已提交到比赛站点。
