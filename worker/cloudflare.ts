import handler from 'vinext/server/fetch-handler';
export default {async fetch(request:Request,env:Cloudflare.Env,ctx:ExecutionContext){
 const headers=new Headers(request.headers);for(const name of Array.from(headers.keys()))if(name.startsWith('oai-authenticated-user-'))headers.delete(name);
 const url=new URL(request.url);if(['/signin-with-chatgpt','/signout-with-chatgpt','/callback'].includes(url.pathname))return Response.redirect(url.origin+'/',303);
 return handler.fetch(new Request(request,{headers}),env,ctx);
}};
