import { rewrite } from '@vercel/edge';

export const config = {
    matcher: '/'
}

export default function middleware(request) {
    console.log(request.host)

    if (request.headers.get('user-agent')?.toLowerCase?.()?.includes?.('discord')) return rewrite(new URL('https://vercel-conflict-bot.vercel.app/discord', request.url));

    return rewrite(new URL('/dashboard.html', request.url));
}
