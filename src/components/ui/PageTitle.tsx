import React, { useEffect } from "react";

const PageTitle: React.FC<{ title: string }> = ({ title }) => {
    useEffect(() => {
        document.title = title;
    }, [title])

    return null;
}

export default PageTitle;
