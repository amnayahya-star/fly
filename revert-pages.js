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
    
    // Remove the import
    content = content.replace('import { getDictionary, Locale } from "@/i18n/getDictionary";\n', '');
    
    // Change async signature back
    content = content.replace(/export default async function Page\(\{ params \}: \{ params: Promise<\{ lang: string \}> \}\) \{\n  const \{ lang \} = await params;\n  const dict = await getDictionary\(lang as Locale\);\n/g, 'export default function Page() {\nconst dict = { navbar: {} };\nconst lang = "en";\n');
    
    fs.writeFileSync(fullPath, content);
  }
}
