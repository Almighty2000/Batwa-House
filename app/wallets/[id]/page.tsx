import {cache} from 'react';
import {notFound} from 'next/navigation';
import Shop from '../../shop';
import {readCatalog} from '../../catalog';
import {origin, pageMetadata, productPath} from '../../seo';

export const dynamic = 'force-dynamic';
type Props = {params: Promise<{id: string}>};
const catalog = cache(readCatalog);

async function details(params: Props['params']) {
  const {id} = await params;
  const products = await catalog();
  const product = products.find(p => p.id === id);
  if (!product) notFound();
  return {id, product, products};
}

export async function generateMetadata({params}: Props) {
  const {id, product} = await details(params);
  return pageMetadata(product.name + ' | Batwa House', String(product.description), productPath(id), product.images[0]);
}

export default async function Page({params}: Props) {
  const {id, product, products} = await details(params);
  const url = origin + productPath(id);
  const schema = {'@context':'https://schema.org','@type':'Product', name:product.name,
    description:product.description, url, brand:{'@type':'Brand',name:'Batwa House'},
    image:product.images.map((src:string) => new URL(src,origin).href),
    offers:{'@type':'Offer',url,price:product.price,priceCurrency:'PKR',
      availability:'https://schema.org/' + (Number(product.stock)>0?'InStock':'OutOfStock')}};
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,'\\u003c')}}/>
    <Shop initialProducts={products} productId={id}/></>;
}
