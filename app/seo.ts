export const origin = 'https://batwa-house.batwas.workers.dev';
export const productPath = (id: string) => '/wallets/' + encodeURIComponent(id);
export function pageMetadata(title: string, description: string, path: string, image?: string) {
  const url = new URL(path, origin).href;
  return {title, description, alternates: {canonical: url},
    openGraph: {type: 'website' as const, siteName: 'Batwa House', title, description, url,
      ...(image ? {images: [new URL(image, origin).href]} : {})}};
}
