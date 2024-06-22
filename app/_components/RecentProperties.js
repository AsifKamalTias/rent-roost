import Link from 'next/link';
import Property from './Property';
import { loadProperties } from '@/utils/requests';

export default async function RecentProperties() {
    const data = await loadProperties();
    let randomProperties = [];
    // if (data?.properties && data?.properties?.length > 0) {
    //     randomProperties = data.properties.sort(() => (Math.random() - Math.random())).slice(0, 3);
    // }
    return (
        <>
            <section className="px-4 py-6">
                <div className="container-xl lg:container m-auto">
                    <h2 className="text-3xl font-bold text-teal-500 mb-6 text-center">
                        Recent Properties
                    </h2>
                    {
                        randomProperties.length === 0 ? (
                            <p className="text-center mt-5">No properties found.</p>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {randomProperties.map((property) => {
                                    return <Property key={property._id} property={property} />
                                })}
                            </div>
                        )
                    }
                </div>
            </section>

            <section className="m-auto max-w-lg my-10 px-6">
                <Link
                    href="/properties"
                    className="block bg-teal-700 text-white text-center py-4 px-6 rounded-xl hover:bg-teal-500"
                >
                    View All Properties
                </Link>
            </section>
        </>
    );
}