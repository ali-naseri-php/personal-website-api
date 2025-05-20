import * as fs from 'fs';
import * as path from 'path';

const prismaMainFile = 'prisma/schema.prisma';
const modulesDir = 'src/modules';

const schemaHeader = `
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
`;

// پیدا کردن همه فایل‌های `schema.prisma` داخل ماژول‌ها
const moduleSchemas = fs
  .readdirSync(modulesDir)
  .map((module) => path.join(modulesDir, module, 'prisma/schema.prisma'))
  .filter(fs.existsSync)
  .map((filePath) => fs.readFileSync(filePath, 'utf8'));

// ترکیب کردن همه مدل‌ها
const mergedSchema = schemaHeader + '\n' + moduleSchemas.join('\n\n');

// نوشتن محتوای نهایی در `prisma/schema.prisma`
fs.writeFileSync(prismaMainFile, mergedSchema);

console.log('✅ Prisma schema merged successfully!');