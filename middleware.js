export { default } from "next-auth/middleware";
export const config = {
    matcher: [
        '/profile',
        '/properties/create',
        '/properties/:id/edit',
        '/properties/bookmarks',
        '/messages',
    ]
}