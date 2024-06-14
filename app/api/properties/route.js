export const GET = async (request) => {
    try {

        return new Response(JSON.stringify({
            message: "Hello"
        }), { status: 200 });
    } catch (e) {
        console.error(e);
        return new Response("Something went wrong.", { status: 500 });
    }
}