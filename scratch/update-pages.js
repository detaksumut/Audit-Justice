const fs = require('fs');
function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = dir + '/' + file;
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            if (file.endsWith('page.tsx')) results.push(file);
        }
    });
    return results;
}

const files = walk('c:/Audit Pengadilan/audit-justice/src/app/(categories)');
const targetRegex = /let textToAnalyze = "";\s*if \(file\.type === "text\/plain"\) {[\s\S]*?} else {\s*throw new Error\([\s\S]*?\);\s*}/g;
const replacement = 'const { extractTextFromFile } = await import("@/utils/fileParser");\n      const textToAnalyze = await extractTextFromFile(file);';

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    if (targetRegex.test(content)) {
        content = content.replace(targetRegex, replacement);
        fs.writeFileSync(file, content);
        console.log('Updated', file);
    }
});
