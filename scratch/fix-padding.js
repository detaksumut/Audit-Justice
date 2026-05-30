const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            if (file.endsWith('.tsx')) results.push(file);
        }
    });
    return results;
}

const files = walk('c:/Audit Pengadilan/audit-justice/src');

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes('className="p-8 md:p-12')) {
        content = content.replace(/className="p-8 md:p-12/g, 'className="p-4 md:p-8 lg:p-12');
        fs.writeFileSync(file, content);
        console.log('Fixed padding in', file);
    }
});
