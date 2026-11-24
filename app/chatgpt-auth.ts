// Independent hosting has no trusted customer identity provider configured.
export type ChatGPTUser={userId:string;displayName:string;email:string;fullName:string|null};
export async function getChatGPTUser():Promise<ChatGPTUser|null>{return null}
export async function requireChatGPTUser(_returnTo:string):Promise<never>{throw new Error('Customer sign-in is not configured')}
export function chatGPTSignInPath(_returnTo:string){return '/'}
export function chatGPTSignOutPath(_returnTo='/'){return '/'}
