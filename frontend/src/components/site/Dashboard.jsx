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
{/* Start of List display container */}
        <div className="flex justify-center">
            <div className="mt-10 w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <div className="flex items-center justify-center mb-4">
                    <h2 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Your Shopping Lists</h2>
                </div>
                <div className="flow-root">
                    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    {shoppingLists.map((data) => (
                        <li key={data.id} className="flex justify-end py-3 sm:py-4">
                            <Link
                            to={{ pathname: `/shopping-list/${data.id}` }}
                            state={{ data: data.id }}
                            className="flex-grow-1"
                            >
                            {data.title}
                            </Link>
                        <button
                            onClick={() => deleteList(data.id)}
                            className="ml-5 flex justify-center items-center w-4 h-4 text-blue-700 dark:text-blue-500 bg-blue-700 hover:bg-blue-800">
                            <img src={deletesvg} alt="Delete" />
                        </button>
                        </li>
                    ))}
                    </ul>
                </div>
        </div>
                
        </div>
{/* End of List display container */}
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