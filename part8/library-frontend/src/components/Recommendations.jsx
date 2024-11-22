import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { ALL_BOOKS, GET_ME } from "../queries";


const Recommendations = ({ show, token }) => {

    const [favGenre, setFavGenre] = useState('')
    const { data: userData, loading: userLoading, error: userError, refetch: refetchUser } = useQuery(GET_ME);
    const { data: booksData, loading: booksLoading, error: booksError, refetch: refetchBooks } = useQuery(ALL_BOOKS, {
        variables: { genre: favGenre }
    });

    useEffect(() => {
        if (token && userData?.me?.favoriteGenre) {
            refetchUser();
            refetchBooks();
            setFavGenre(userData.me.favoriteGenre);
        }
    }, [token, userData]);


    if (!show) {
        return null;

    }

    if (booksLoading || userLoading) return <div>Loading...</div>;
    if (booksError || userError) {
        console.log(booksError);
        console.log(userError);

        return <div>Error occurred </div>
    };

    return (
        <div>
            <h1>Recommendations for {userData?.me?.username}</h1>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th> author</th>
                        <th> published</th>
                    </tr>
                    {booksData.allBooks.map((a) => (
                        <tr key={a.title}>
                            <td>{a.title}</td>
                            <td> {a.author.name}</td>
                            <td> {a.published}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}

export default Recommendations