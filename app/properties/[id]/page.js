"use client";
import { useParams, useSearchParams } from "next/navigation";

export default function Property () {
    const {id} = useParams();
    const params = useSearchParams();
    const name = params.get("name");
    return (
        <main>
            Property {id} {name}
        </main>
    );
}