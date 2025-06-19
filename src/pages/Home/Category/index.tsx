import { watches, bracelets, mens, rings, necklaces, earrings } from "../../../assets";
import "./index.scss"

const categories = [
    { name: "Bracelets", image: bracelets },
    { name: "Rings", image: rings },
    { name: "Necklaces", image: necklaces },
    { name: "Earrings", image: earrings },
    { name: "Watches", image: watches },
    { name: "Mens", image: mens },
];

export default function CategoryHome() {
    return (
        <div className="wrapper">
            <div className="categories-wrapper">
                {categories.map((category, index) => (
                    <div key={index} className="category-card">
                        <img
                            src={category.image}
                            alt={category.name}
                            style={{ width: "100%", height: "auto" }}
                        />
                        <p className="h3">
                            {category.name}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
