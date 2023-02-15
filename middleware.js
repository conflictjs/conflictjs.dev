import { rewrite } from '@vercel/edge';

export const config = {
    matcher: '/'
}

export default function middleware(request) {
    if (request.headers['user-agent']?.toLowerCase?.()?.includes?.('discord')) return rewrite(new URL('https://vercel-conflict-bot.vercel.app/discord', request.url));

    return rewrite(new URL('/dashboard', request.url));
}
