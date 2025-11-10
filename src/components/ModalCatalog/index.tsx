import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { allToLowerCase } from "@/utils/wordsFormatting.ts";
import { formatFacetLabel } from "@/utils/facet.ts";
import CatalogCard from "@/components/CatalogCard";
import Button from "@/components/Button.tsx";

import { catalogImages } from "@/assets/catalogImages";
import styles from "./index.module.scss";

const tabs = [
    {
        "tab": "female",
        "categories": [
            {
                "_id": "1",
                "name": "Bracelets",
                "image": catalogImages.female.bracelets,
                "subcategories": []
            },
            {
                "_id": "2",
                "name": "Rings",
                "image": catalogImages.female.rings,
                "subcategories": []
            },
            {
                "_id": "3",
                "name": "Necklaces",
                "image": catalogImages.female.necklaces,
                "subcategories": []
            },
            {
                "_id": "4",
                "name": "Chains",
                "image": catalogImages.female.chains,
                "subcategories": []
            },
            {
                "_id": "5",
                "name": "Earrings",
                "image": catalogImages.female.earrings,
                "subcategories": []
            },
            {
                "_id": "6",
                "name": "Brooches",
                "image": catalogImages.female.brooches,
                "subcategories": []
            },
            {
                "_id": "7",
                "name": "Watches",
                "image": catalogImages.female.watches,
                "subcategories": []
            },
            {
                "_id": "8",
                "name": "Collections",
                "image": catalogImages.female.collections,
                "subcategories": []
            },
            {
                "_id": "9",
                "name": "Sets",
                "image": catalogImages.female.sets,
                "subcategories": []
            }
        ]
    },
    {
        "tab": "male",
        "categories": [
            {
                "_id": "11",
                "name": "Bracelets",
                "image": catalogImages.male.bracelets,
                "subcategories": []
            },
            {
                "_id": "12",
                "name": "Rings",
                "image": catalogImages.male.rings,
                "subcategories": []
            },
            {
                "_id": "13",
                "name": "Chains",
                "image": catalogImages.male.chains,
                "subcategories": []
            },
            {
                "_id": "14",
                "name": "Pendants",
                "image": catalogImages.male.pendants,
                "subcategories": []
            },
            {
                "_id": "15",
                "name": "Watches",
                "image": catalogImages.male.watches,
                "subcategories": []
            },
            {
                "_id": "16",
                "name": "Collections",
                "image": catalogImages.male.collections,
                "subcategories": []
            }
        ]
    },
    {
        "tab": "kids",
        "categories": [
            {
                "_id": "17",
                "name": "Earrings",
                "image": catalogImages.kids.earrings,
                "subcategories": []
            },
            {
                "_id": "18",
                "name": "Chains",
                "image": catalogImages.kids.chains,
                "subcategories": []
            },
            {
                "_id": "19",
                "name": "Pendants",
                "image": catalogImages.kids.pendants,
                "subcategories": []
            },
            {
                "_id": "20",
                "name": "Collections",
                "image": catalogImages.kids.collections,
                "subcategories": []
            }
        ]
    }
]

type Props = {
    handleClose: () => void;
}

export default function ModalCatalog({ handleClose }: Props) {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState(0);

    const handleClick = (category: string, gender: string) => {
        handleClose();
        navigate(`/catalog/${allToLowerCase(category)}?gender=${gender}`);
    }

    return (
        <div className={styles.tabs}>
            <div className={styles.tabHeader}>
                {tabs.map((tab, idx) => (
                    <Button
                        key={tab.tab}
                        variant="clear"
                        className={activeTab === idx ? styles.active : ""}
                        onClick={() => setActiveTab(idx)}
                    >
                        {formatFacetLabel("gender", tab.tab)}
                    </Button>
                ))}
            </div>
            <div className={styles.tab}>
                <div className={styles.tabContent}>
                    {tabs[activeTab].categories.map(category => (
                        <CatalogCard
                            cardData={category}
                            handleClick={() => handleClick(category.name, tabs[activeTab].tab)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
