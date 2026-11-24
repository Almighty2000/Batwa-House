import {env} from 'cloudflare:workers';
const initial=[['classic','The Everyday Bifold','Bifolds','#7e452b',1500,40,'A clean silhouette with six card slots, two note compartments and room for your everyday essentials.'],['slim','The Slim Cardholder','Cardholders','#292923',1200,30,'A compact carry with four card slots and a central pocket. Designed to disappear into your pocket.'],['heritage','The Heritage Fold','Bifolds','#aa7547',1800,25,'A classic profile in a warm tan finish. Eight card slots and a generous note compartment.'],['midnight','The Midnight Bifold','Bifolds','#242424',1500,35,'Understated black, thoughtful organisation. Six card slots and a full-length note compartment.']];

type CatalogRow = {id:string; name:string; category:string; color:string; price:number; stock:number; active:number; description:string; data:string|null};
export async function readCatalog(){
  const db = env.DB;
  if (!db) throw new Error('Database unavailable');
  const query = db.prepare(`SELECT p.id, p.name, p.category, p.color, p.price, p.stock, p.active, p.description, d.data
    FROM products p LEFT JOIN catalog_details d ON d.id = p.id WHERE p.active = 1 ORDER BY p.rowid`);
  let {results} = await query.all<CatalogRow>();
  if (!results.length) {
    await db.batch(initial.map(values => db.prepare(
      'INSERT OR IGNORE INTO products (id,name,category,color,price,stock,description,active) VALUES (?,?,?,?,?,?,?,1)'
    ).bind(...values)));
    ({results} = await query.all<CatalogRow>());
  }
  return results.map(({data, ...product}) => {
    const details = JSON.parse(String(data || '{}'));
    return {...product, images: details.images || [], material: details.material || '', size: details.size || '',
      variant: details.variant || '', weight: Number(details.weight) || 0};
  });
}
