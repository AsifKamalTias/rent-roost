"use client";
import { useParams } from "next/navigation";
import { loadProperty } from "@/utils/requests";
import { useEffect, useState } from "react";
import PropertyHero from "@/app/_components/PropertyHero";
import Link from "next/link";
import PropertyDetails from "@/app/_components/PropertyDetails";
import { FaArrowLeft } from "react-icons/fa";
import Spinner from "@/app/_components/Spinner";
import PropertyBookmark from "@/app/_components/PropertyBookmark";
import PropertyShare from "@/app/_components/PropertyShare";
import PropertyContactForm from "@/app/_components/PropertyContactForm";

export default function Property() {
    const { id } = useParams();

    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getProperty = async () => {
            try {
                if (!id) return;
                const property = await loadProperty(id);
                setProperty(property);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        if (property === null) {
            getProperty();
        }
    }, [id, property])

    if (!property && !loading) {
        return (
            <p className="text-center mt-5">No property found.</p>
        );
    }

    return (
        <>
            {loading && <Spinner loading={loading} />}
            {
                !loading && property && (
                    <>
                        <PropertyHero src={property.images[0]} alt={property.name} />
                        <section>
                            <div className="container m-auto py-6 px-6">
                                <Link
                                    href="/properties"
                                    className="text-teal-500 hover:text-teal-600 flex items-center"
                                >
                                    <FaArrowLeft className="inline-block mr-2" />
                                    Back to Properties
                                </Link>
                            </div>
                        </section>
                        <section className="bg-teal-50">
                            <div className="container m-auto py-10 px-6">
                                <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
                                    <PropertyDetails property={property} />

                                    {/* <!-- Sidebar --> */}
                                    <aside className="space-y-4">
                                        <PropertyBookmark property={property} />
                                        <PropertyShare property={property} />
                                        <PropertyContactForm property={property} />
                                    </aside>
                                </div>
                            </div>
                        </section>
                    </>
                )
            }
        </>
    );
}