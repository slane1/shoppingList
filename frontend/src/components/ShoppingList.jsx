export default function ShoppingList({slist}) {

    if (!slist) {
        return <h1>Error loading Shopping List</h1>;
    } else {
    return (
        <div>
            <h1>{slist.title}</h1>
            <ul>
                {slist.items.map((item) => (
                    <li key={item.number}>
                        {item.name} - {item.quantity}
                    </li>
                ))}
            </ul>
        </div>
    );
}
}