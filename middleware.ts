import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
    // A list of all locales that are supported
    locales: ['en', 'ar'],

    // Used when no locale matches
    defaultLocale: 'en',

    // The default locale can be used without a prefix (e.g. `/about`)
    localePrefix: 'as-needed'
});

export const config = {
    // Match only internationalized pathnames
    matcher: ['/', '/(ar|en)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)']
};
