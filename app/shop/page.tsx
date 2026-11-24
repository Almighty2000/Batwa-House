import Shop from '../shop';
import {readCatalog} from '../catalog';
import {pageMetadata} from '../seo';
export const dynamic = 'force-dynamic';
export const metadata = pageMetadata('Shop Wallets & Cardholders in Pakistan | Batwa House', 'Browse the Batwa House wallet collection. Compare prices in Pakistani rupees, check available stock and choose your everyday carry.', '/shop');
export default async function Page(){return <Shop catalog initialProducts={await readCatalog()}/>}
