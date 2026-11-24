import {readFileSync,writeFileSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
const preview=process.argv.includes('--preview');
const id=process.env.CLOUDFLARE_DATABASE_ID;
if(!id||!/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(id)||id.startsWith('00000000'))throw Error('Set CLOUDFLARE_DATABASE_ID in Cloudflare build variables.');
for(const file of ['wrangler.json','dist/server/wrangler.json']){
 const config=JSON.parse(readFileSync(file,'utf8'));
 config.d1_databases[0].database_id=id;
 writeFileSync(file,JSON.stringify(config,null,2));
}
const commands=preview
 ? [['versions','upload','--config','dist/server/wrangler.json']]
 : [['d1','migrations','apply','DB','--remote','--config','wrangler.json'],['deploy','--config','dist/server/wrangler.json']];
if(preview)console.log('Uploading preview version only. It shares the configured database; no migrations are applied.');
for(const args of commands){
 const result=spawnSync(process.execPath,['node_modules/wrangler/bin/wrangler.js',...args],{stdio:'inherit',env:process.env});
 if(result.status!==0)process.exit(result.status||1);
}
