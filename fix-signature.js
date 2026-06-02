const fs = require('fs');
const path = require('path');

const pagesToUpdate = [
  'src/app/[lang]/check-in/page.tsx',
  'src/app/[lang]/deals/page.tsx',
  'src/app/[lang]/hotels/page.tsx',
  'src/app/[lang]/manage-booking/page.tsx'
];

for (const p of pagesToUpdate) {
  const fullPath = path.join(__dirname, p);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Fix the signature bug
    content = content.replace(/export default async function function\(/g, 'export default async function Page(');
    
    fs.writeFileSync(fullPath, content);
  }
}
