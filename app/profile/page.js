"use client";
import Image from "next/image";
import defaultProfileImg from "../../public/images/profile.png";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Spinner from "../_components/Spinner";
import Link from "next/link";
import { toast } from "react-toastify";

export default function Profile() {
    const { data: session } = useSession();

    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getProperties = async (ownerId) => {
            try {
                const response = await fetch(`/api/properties/owner/${ownerId}`);
                if (response.ok) {
                    const data = await response.json();
                    setProperties(data);
                }

            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        if (session?.user?.id) {
            getProperties(session?.user?.id);
        }

    }, [session]);

    const deleteProperty = async (id) => {
        try {
            const confirm = window.confirm("Are you sure that you want to delete this property?");
            if (!confirm) return;

            const response = await fetch(`/api/properties/${id}`, {
                method: "Delete"
            });

            if (response.status === 200) {
                const updateProperties = properties.filter((property) => property._id !== id);
                setProperties(updateProperties);
                toast.success("Property deleted successfully.")
            } else {
                toast.error("Failed to delete property. Please try again later.")
            }

        } catch (error) {
            console.error(error);
            toast.error("Failed to delete property. Please try again later.")
        }

    }

    return (
        <section className="bg-teal-50">
            <div className="container m-auto py-24">
                <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
                    <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
                    <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/4 mx-20 mt-10">
                            <div className="mb-4">
                                <Image
                                    className="h-32 w-32 md:h-48 md:w-48 rounded-full mx-auto md:mx-0"
                                    src={session?.user?.image || defaultProfileImg}
                                    alt="User"
                                    width={0}
                                    height={0}
                                    sizes="1000vw"
                                    priority={true}
                                />
                            </div>
                            <h2 className="text-2xl mb-4"><span className="font-bold block">Name: </span> {session?.user?.name}</h2>
                            <h2 className="text-2xl"><span className="font-bold block">Email: </span> {session?.user?.email}</h2>
                        </div>

                        <div className="md:w-3/4 md:pl-4">
                            <h2 className="text-xl font-semibold mb-4">Your Listings</h2>
                            {
                                !loading && properties.length === 0 && (
                                    <p className="text-center mt-5">You have no property listing.</p>
                                )
                            }
                            {
                                loading ? (<Spinner loading={loading} />) : (
                                    properties.map((property) => (
                                        <div className="mb-10" key={property._id}>
                                            <Link href={`/properties/${property._id}`}>
                                                <Image
                                                    className="h-32 w-full rounded-md object-cover"
                                                    src={property.images[0]}
                                                    alt={property.name}
                                                    width={0}
                                                    height={0}
                                                    sizes="100vw"
                                                    priority={true}
                                                />
                                            </Link>
                                            <div className="mt-2">
                                                <p className="text-lg font-semibold">{property.name}</p>
                                                <p className="text-gray-600">Address: {property.location.street} {property.location.city}, {property.location.state}</p>
                                            </div>
                                            <div className="mt-2">
                                                <Link href={`/properties/${property._id}/edit`}
                                                    className="bg-teal-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-teal-600"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
                                                    type="button"
                                                    onClick={() => { deleteProperty(property._id) }}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    ))

                                )
                            }

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}