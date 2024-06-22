import Property from "../_components/Property";
import { loadProperties } from "@/utils/requests";
import PropertySearch from "../_components/PropertySearch";

export default async function Properties() {

  const properties = await loadProperties();
  properties.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  return (
    <>
      <section className='bg-blue-700 py-4'>
        <div className='max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8'>
          <PropertySearch />
        </div>
      </section>
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto px-4 py-6">
          {
            properties.length === 0 ? (
              <p className="text-center mt-5">No properties found.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {properties.map((property) => {
                  return <Property key={property._id} property={property} />
                })}
              </div>
            )
          }
        </div>
      </section>
    </>
  );
}
