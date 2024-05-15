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
            <h1 className='mb-5' >{data.name.toUpperCase()}</h1>
{/* Add first list to display items that have not been marked as done */}
            <ul className="flex flex-col items-center gap-5">
                {data.items
                .filter((item) => !item.done)
                .map((item) => (
                    <li key={item._id} className="flex items-center text-end justify-end w-80" >
                        <div className='flex items-center'>
                        <p className='mr-3'>{item.quantity}x</p>
                        {item.done ? <p className='line-through'>{item.name}</p> : <p>{item.name}</p>}
                        <button
                        className="flex ml-5 items-center justify-center hover:text-black hover:bg-gray-700 focus:ring-gray-600"
                        onClick={() => handleGot(item._id, listId)}>
                            <img src={gotsvg} alt="Got" />
                        </button>
                        </div>
                    </li>
                ))}
            </ul>

            {data.items.some(item => item.done) && 
            <div className="items-center border-black border-b w-20 mt-10 mb-10"></div>
            }

{/* Add second list to display items that have been marked as done */}
            <ul className="flex flex-col items-center gap-5">
                {data.items
                .filter((item) => item.done)
                .map((item) => (
                    <li key={item._id} className="flex items-center text-end justify-end w-80" >
                        <div className='flex items-center'>
                        <p className='mr-3'>{item.quantity}x</p>
                        {item.done ? <p className='line-through'>{item.name}</p> : <p>{item.name}</p>}
                        <button
                        className="flex ml-5 items-center justify-center hover:text-black hover:bg-gray-700 focus:ring-gray-600"
                        onClick={() => handleGot(item._id, listId)}>
                            <img src={undosvg} alt="Got" />
                        </button>
                        {item.done && 
                        <button 
                        className="flex ml-3 items-center justify-center hover:text-black hover:bg-gray-700 focus:ring-gray-600"
                        onClick={() => handleDelete(item._id, listId)}>
                            <img src={deletesvg} alt="Delete" />
                        </button>
                        }
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
}