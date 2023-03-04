import React from "react";

const FetchContext = React.createContext(
    {
        protocol: "https://",
        host: "localhost:",
        //host:"brankobjelic.duckdns.org:",
        port: "7281/"
    }
)

export default FetchContext