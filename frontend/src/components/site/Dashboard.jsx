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
    <div>
        {!loggedIn ? <LoggedOut /> :
        <div>
        <Header />
        <div>
            <div className="flex flex-col">
                <h1 className="mb-5">Dashboard</h1>
                <p>Welcome to your Dashboard</p>
                <p>Here you can view, edit and create ShoppingLists</p>
            </div>
            <div className="flex flex-col gap-3 mt-5">
                <h2>Your Shopping Lists</h2>
                <ul className="flex flex-col items-center gap-5 ">
                {shoppingLists.map((data) => (
                    <li key={data.id} className="flex items-center text-end justify-end w-80 ">
                        <Link
                        to={{ pathname: `/shopping-list/${data.id}` }}
                        state={{ data: data.id }}
                        className="flex-grow-1"
                        >
                    {data.title}
                        </Link>
                    <button
                        onClick={() => deleteList(data.id)}
                        className="flex ml-5 items-center justify-center hover:text-black hover:bg-gray-700 focus:ring-gray-600">
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
        </div>
        }
    </div>
    );
}