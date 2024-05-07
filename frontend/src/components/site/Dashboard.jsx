import { useContext } from "react";
import { DataContext }  from "../../contexts/DataContext";
import { AuthContext } from "../../contexts/AuthContext";
import LoggedOut from "../site/LoggedOut";
import NewList from "../forms/NewList";
import Header from "../site/Header";
import Footer from "../site/Footer";
import { Link } from "react-router-dom";
import deletesvg from "../../assets/trash-solid.svg";

export default function Dashboard() {
    const { shoppingLists, deleteList } = useContext(DataContext);
    const { loggedIn } = useContext(AuthContext);

    return (
    <>
        {!loggedIn ? <LoggedOut /> :
        <>
        <Header />
        <div>
            <div>
                <h1>Dashboard</h1>
                <p>Welcome to the Dashboard</p>
            </div>
            <div>
                <h2>Your Shopping Lists</h2>
                <ul>
                    {shoppingLists.map((data) => (
                        <li key={data.id}>
                        <Link
                        to={{pathname: `/shopping-list/${data.id}`,}}
                        state={{ data: data.id}}
                        >
                        {console.log(data.id)}
                        {data.title}
                        </Link>
                        <button onClick={() => deleteList(data.id)}>
                            <img src={deletesvg} alt="Delete" />
                        </button>
                    </li>
                ))}
                </ul>
            </div>
            <div>
                <NewList />
            </div>
        </div>
        <Footer />
        </> 
        }
    </>
    );
}