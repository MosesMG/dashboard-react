import React, { useEffect, useState } from "react";
import PageTitle from "../../components/ui/PageTitle";
import Breadcrumb from "../../components/ui/Breadcrumb";
import { useParams } from "react-router-dom";
import type { PostsProps } from "../../types";
import axiosClient from "../../api/axios";

const SinglePost: React.FC = () => {
    const breadcrumbItems = [
        { name: "Accueil", link: '/accueil' },
        { name: "Posts", link: '/posts' },
        { name: "Détails d'un post", link: '' }
    ];

    const { id } = useParams();
    const [post, setPost] = useState<PostsProps>();

    const fetchPost = async () => {
        const response = await axiosClient.get(`/api/posts/${id}`);
        setPost(response.data.data);
    }

    useEffect(() => {
        fetchPost();
    }, []);

    return (
        <>
            <PageTitle title="Détails d'un post" />
            <Breadcrumb items={breadcrumbItems} />

            <div>
                <h2>Titre : {post?.title}</h2>
                <p>Description : {post?.description}</p>
                <p>Statut : {post?.status ? 'Actif' : 'Inactif'}</p>
            </div>
        </>
    );
}

export default SinglePost;
