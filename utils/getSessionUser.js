import { getServerSession } from "next-auth/next";
import { authOptions } from "./authOptions";

const sessionUser = async () => {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return null;
    }

    return session.user;
}

export default sessionUser;