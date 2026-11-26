// 赛事约定输出到 /output；可用 MAKEFUN_OUTPUT_DIR 覆盖，便于本地校验。
const outputDir = process.env.MAKEFUN_OUTPUT_DIR?.trim() || "/output";
const entry = "You dump your overdue tasks into your AI's queue, then get annoyed when it reminds you; that's not burnout, that's a clingy work ethic.";

const { mkdir, writeFile } = await import("node:fs/promises");
await mkdir(outputDir, { recursive: true });
await writeFile(`${outputDir}/entry.txt`, entry, "utf8");