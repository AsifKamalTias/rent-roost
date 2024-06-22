import { ClipLoader } from "react-spinners";

const override = {
    display: "block",
    margin: "100px auto"
}

export default function Loader({ loading }) {
    return (
        <ClipLoader
            color="#0f766e"
            loading={loading}
            cssOverride={override}
            size={150}
            aria-label="Loading Spinner"
        />
    );
}