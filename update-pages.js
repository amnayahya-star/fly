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
    
    // Add imports
    if (!content.includes('getDictionary')) {
      content = 'import { getDictionary, Locale } from "@/i18n/getDictionary";\n' + content;
    }
    
    // Change function signature
    content = content.replace(/export default function \w+\(\) {/, (match) => {
      const name = match.split(' ')[2].split('(')[0];
      return `export default async function ${name}({ params }: { params: Promise<{ lang: string }> }) {\n  const { lang } = await params;\n  const dict = await getDictionary(lang as Locale);\n`;
    });
    
    // Replace <Navbar />
    content = content.replace(/<Navbar \/>/g, '<Navbar dict={dict.navbar} lang={lang} />');
    
    fs.writeFileSync(fullPath, content);
    console.log(`Updated ${p}`);
  }
}
