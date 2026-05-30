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

const targetStateRegex = /const \[markdownData, setMarkdownData\] = useState<string \| null>\(null\);/;
const targetSetRegex = /setMarkdownData\(result\.data\);/;
const targetComponentRegex = /<MarkdownReport content=\{markdownData\} fileName=\{currentFileName\}/;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;

    if (targetStateRegex.test(content) && !content.includes('isMockResult')) {
        content = content.replace(targetStateRegex, 'const [markdownData, setMarkdownData] = useState<string | null>(null);\n  const [isMockResult, setIsMockResult] = useState<boolean>(false);');
        changed = true;
    }

    if (targetSetRegex.test(content) && !content.includes('setIsMockResult(')) {
        content = content.replace(targetSetRegex, 'setMarkdownData(result.data);\n      setIsMockResult(result.isMock === true);');
        changed = true;
    }

    if (targetComponentRegex.test(content) && !content.includes('isMock={isMockResult}')) {
        content = content.replace(targetComponentRegex, '<MarkdownReport isMock={isMockResult} content={markdownData} fileName={currentFileName}');
        changed = true;
    }

    // Also reset isMockResult on onReset
    const targetResetRegex = /onReset=\{.*\s*=>\s*setMarkdownData\(null\)\}/;
    if (targetResetRegex.test(content) && !content.includes('setIsMockResult(false)')) {
        content = content.replace(targetResetRegex, 'onReset={() => { setMarkdownData(null); setIsMockResult(false); }}');
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(file, content);
        console.log('Updated', file);
    }
});
