import Header from "./Header";
import Welcome from "./Welcome";
import Footer from "./Footer";

export default function Frontpage() {
    return (
        <div className="flex flex-col min-h-[80vh]">
            <Header />
                <Welcome />
            <Footer />
        </div>
    )
}