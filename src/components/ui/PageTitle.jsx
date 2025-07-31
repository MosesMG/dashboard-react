import { useEffect } from "react";

const PageTitle = ({ title }) => {
    useEffect(() => {
        title ? document.title = title : 'Gestion boutiques';
    }, [title])

    return null;
}

export default PageTitle;
