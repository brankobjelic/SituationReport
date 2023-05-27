import React from "react";

const FetchContext = React.createContext(
    {
        protocol: "https://",
        //host: "localhost:",
        host:"brankobjelic.duckdns.org:",
        //host:"ec2-3-82-155-229.compute-1.amazonaws.com:",
        port: "7281/"
    }
)

export default FetchContext