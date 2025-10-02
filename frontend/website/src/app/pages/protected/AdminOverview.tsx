import {useState} from "react";
import {useAllEntitiesNames} from "../../../core/hooks/admin.hook.ts";
import {type EntityInfo} from "../../components/admin/entity/AdminEntityListData.tsx";
import AdminEntityMain from "../../components/admin/entity/AdminEntityMain.tsx";


const MenuOptions = {
    1: "Entidades",
}


const AdminOverview = () => {

    const [expandedIndex, setExpandedIndex] = useState<string | null>(null);
    const [selectedMenuOption, setSelectedMenuOption] = useState<string | null>(null);
    const [selectedEntities, setSelectedEntities] = useState<EntityInfo | null>(null);

    const {data: entitiesList = {}} = useAllEntitiesNames();

    const toggleList = (index: string) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    const toggleMenuOptionList = (index: string) => {
        if (selectedMenuOption === index) {
            setSelectedMenuOption(null);
            return;
        }
        setSelectedMenuOption(index);
    }

    const formatText = (text: string): string => {
        return text.replace("_", " ").toUpperCase();
    };

    const handleSelectEntity = (key: string, value: string) => {
        setSelectedEntities({name: key, selectedEntities: value});
    };

    return (
        <>
            <section id="admin-overview">
                <div id="admin-menu">
                    <p className="h1">Menu</p>
                    <div id="admin-menu-option">
                        <p
                            className="h3 admin-menu-option"
                            onClick={() => toggleMenuOptionList(MenuOptions[1])}>
                            {MenuOptions[1]}
                        </p>
                        <div className={`admin-menu-option-items ${selectedMenuOption === MenuOptions[1] ? "open" : "close"}`}>
                            {Object.keys(entitiesList).map((entityName) => (
                                <div className="admin-menu-item" key={entityName}>
                                    <p onClick={() => toggleList(entityName)}>{entityName}</p>

                                    <ul className={expandedIndex === entityName ? "open" : "closed"}>
                                        {Object.keys(entitiesList[entityName]).map((entity) => (
                                            <li
                                                key={entity}
                                                onClick={() =>
                                                    handleSelectEntity(formatText(entity), entitiesList[entityName][entity])
                                                }
                                            >
                                                {formatText(entity)}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div id="admin-content">
                    {
                        MenuOptions[1] && selectedEntities !== null && (
                            <AdminEntityMain
                                selectedEntities ={selectedEntities}
                            />
                        )
                    }
                </div>
            </section>
        </>
    )
}

export default AdminOverview;