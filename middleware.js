import { rewrite } from '@vercel/edge';

export const config = {
    matcher: '/'
}

export default async function middleware(request) {
    const host = request.headers.get('host');
    let app = 'dev';

    if (host.includes('.conflictjs.dev')) app = host.substring(0, host.indexOf('.conflictjs.dev'));
    else if (host.includes('conflictjs.dev')) return rewrite(new URL('/landing.html', request.url));

    if (request.headers.get('user-agent')?.toLowerCase?.()?.includes?.('discord')) {
        const appData = await fetch(new URL('/api/apps/' + app, request.url)).then(res => res.json());

        return rewrite(new URL(appData.endpoint, request.url));
    }

    return rewrite(new URL('/dashboard.html', request.url));
}
