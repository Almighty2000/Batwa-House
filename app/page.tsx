import Shop from './shop';
import {readCatalog} from './catalog';
import {pageMetadata} from './seo';
export const dynamic = 'force-dynamic';
export const metadata = pageMetadata('Batwa House | Everyday Wallets & Cardholders in Pakistan', 'Discover everyday bifold wallets and slim cardholders from Batwa House in Karachi. Shop online with cash on delivery across Pakistan.', '/');
export default async function Page(){return <Shop initialProducts={await readCatalog()}/>}
