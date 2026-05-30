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

const files = walk('c:/Audit Pengadilan/audit-justice/src/app/(categories)');

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // We want to replace:
    // {!markdownData ? ( ... ) : ( ... )}
    // This requires regex or string manipulation.
    // Let's just do a specific string replace since the format is very predictable.

    if (content.includes('!markdownData ? (')) {
        // The structure is roughly:
        // {!markdownData ? (
        //   <div className="mt-12">
        //     <UploadDropzone onUploadSuccess={handleUploadSuccess} isLoading={isLoading} />
        //   </div>
        // ) : (
        //   <MarkdownReport isMock={isMockResult} content={markdownData} fileName={currentFileName} onReset={() => { setMarkdownData(null); setIsMockResult(false); }} />
        // )}
        
        content = content.replace(/{!markdownData \? \([\s\S]*?<UploadDropzone[\s\S]*?<\/div>\s*\)\s*:\s*\([\s\S]*?<MarkdownReport[\s\S]*?\/>\s*\)}/g, (match) => {
            // Extract the UploadDropzone part and MarkdownReport part
            const uploadMatch = match.match(/<div className="mt-12">([\s\S]*?<\/div>)/);
            const reportMatch = match.match(/(<MarkdownReport[\s\S]*?\/>)/);
            
            if (uploadMatch && reportMatch) {
                return `
      <div className={!markdownData ? "block mt-12" : "hidden"}>
        ${uploadMatch[1].replace('</div>', '')}
      </div>

      <div className={markdownData ? "block" : "hidden"}>
        {markdownData && ${reportMatch[1]}}
      </div>
                `;
            }
            return match;
        });
        
        fs.writeFileSync(file, content);
        console.log('Fixed conditional rendering in', file);
    } else if (content.includes('!analysisData ? (')) {
        // For kepolisian and kejaksaan which use analysisData
        content = content.replace(/{!analysisData \? \([\s\S]*?<UploadDropzone[\s\S]*?<\/div>\s*\)\s*:\s*\([\s\S]*?<AnalysisResult[\s\S]*?\/>\s*\)}/g, (match) => {
            const uploadMatch = match.match(/<div className="mt-12">([\s\S]*?<\/div>)/);
            const reportMatch = match.match(/(<AnalysisResult[\s\S]*?\/>)/);
            
            if (uploadMatch && reportMatch) {
                return `
      <div className={!analysisData ? "block mt-12" : "hidden"}>
        ${uploadMatch[1].replace('</div>', '')}
      </div>

      <div className={analysisData ? "block" : "hidden"}>
        {analysisData && ${reportMatch[1]}}
      </div>
                `;
            }
            return match;
        });
        
        fs.writeFileSync(file, content);
        console.log('Fixed conditional rendering in', file);
    }
});
