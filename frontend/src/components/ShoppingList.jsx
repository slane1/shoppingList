import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { DataContext } from "../contexts/DataContext";
import { Link } from "react-router-dom";
import deletesvg from "../assets/trash-solid.svg";  
import gotsvg from "../assets/check-solid.svg";
import undosvg from "../assets/undo-solid.svg";

export default function ShoppingList({data, listId}) {
    const { loggedIn } = useContext(AuthContext);
    const { handleGot, handleDelete } = useContext(DataContext);

    console.log("Logging data items", data.items);
    if (!data.items) {
        return (
            <>
            <h1>Error loading Shopping List</h1>
            <Link to="/">Back to Homepage</Link>
            </>
        );
    } else {
    return (
        <div className="flex flex-col items-center">
            <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                    <h1 className='mb-5' >{data.name.toUpperCase()}</h1>
                </div>
                <div className="flow-root">
                    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                        {data.items
                        .filter((item) => !item.done)
                        .map((item) => (
                            <li key={item._id} className="py-3 sm:py-4" >
                                <div className="flex items-end">
                                    <div className="flex-shrink-0">
                                        <p className='ml-3 mr-3'>{item.quantity}</p>
                                    </div>
                                    <div className="flex-1 min-w-0 ms-4 text-right mr-1">
                                        <p className="text-sm font-medium text-gray-900  dark:text-white">{item.name}</p>
                                    </div>
                                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                        <button
                                        className="flex ml-5 items-center justify-center bg-teal-600 hover:text-black hover:bg-teal-200 focus:ring-gray-600"
                                        onClick={() => handleGot(item._id, listId)}>
                                            <img src={gotsvg} alt="Got" />
                                        </button>
                                    </div>
                                </div>
                                
                            </li>
                        ))}
                    </ul>
            </div>
        </div>

{/* Add second list to display items that have been marked as done */}
{data.items.some(item => item.done) &&
        <div className="mt-16 w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
                <h2 className='mb-5' >Done:</h2>
            </div>
            <div className="flow-root">
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    {data.items
                    .filter((item) => item.done)
                    .map((item) => (
                        <li key={item._id} className="py-3 sm:py-4" >
                            <div className="flex items-end">
                                <div className="flex-shrink-0">
                                    <p className='ml-3 mr-3 line-through'>{item.quantity}</p>
                                </div>
                                <div className="flex-1 min-w-0 ms-4 text-right mr-1">
                                    <p className="text-sm font-medium text-gray-900  dark:text-white line-through">{item.name}</p>
                                </div>
                                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                    <button
                                        className="ml-5 flex justify-center items-center w-4 h-4 text-blue-700 dark:text-blue-500 bg-blue-700 hover:bg-blue-800"
                                        onClick={() => handleGot(item._id, listId)}>
                                            <img src={undosvg} alt="Got" />
                                    </button>
                                    <button 
                                        className="ml-5 flex justify-center items-center w-4 h-4 text-red-700 dark:text-red-500 bg-red-700 hover:bg-red-800"
                                        onClick={() => handleDelete(item._id, listId)}>
                                            <img src={deletesvg} alt="Delete" />
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
        </div>
    </div>}
</div>
    );
}
}