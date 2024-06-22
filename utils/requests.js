const endpoint = process.env.NEXT_PUBLIC_API_URL || null;

async function loadProperties() {
    try {
        if (!endpoint) {
            return [];
        }
        const response = await fetch(`${endpoint}/properties`, { cache: "no-store" });
        if (!response.ok) {
            throw new Error("Something went wrong.");
        }

        return response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}

async function loadFeaturedProperties() {
    try {
        if (!endpoint) {
            return [];
        }
        const response = await fetch(`${endpoint}/properties/featured`, { cache: "no-store" });
        if (!response.ok) {
            throw new Error("Something went wrong.");
        }

        return response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}

async function loadProperty(id) {
    try {
        if (!endpoint) {
            return null;
        }
        const response = await fetch(`${endpoint}/properties/${id}`);
        if (!response.ok) {
            throw new Error("Something went wrong.");
        }

        return response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}

export { loadProperties, loadFeaturedProperties, loadProperty };