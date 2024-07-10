import * as React from "react";
import { Spinner } from "@fluentui/react-components";


export const Loader: React.FC = () => {
    return (
        <div className="overlay-container" >
            <div className="overlay">
                <Spinner />
            </div>
        </div>

    )
}
