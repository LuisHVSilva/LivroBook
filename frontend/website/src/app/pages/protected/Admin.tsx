import {useState} from "react";

const menus = [
    {
        title: "Documento",
        items: ["Tipo de Documento"],
    },
    {
        title: "Localização",
        items: ["País", "Estado", "Cidade"],
    },
];

const Admin = () => {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    const [selectedContent, setSelectedContent] = useState("Conteúdo");


    const toggleList = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <div id="admin">
            <section id="admin-painel">
                <p className="h1 admin-title">Painel</p>
                <div className="admin-painel-items">
                    {menus.map((menu, index) => (
                        <div key={index} className="admin-painel-item">
                            <p onClick={() => toggleList(index)}>{menu.title}</p>
                            <ul className={expandedIndex === index ? "open" : "closed"}>
                                {menu.items.map((item, i) => (
                                    <li key={i} onClick={() => setSelectedContent(item)}>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            <section id="admin-content">
                <p className="h1 admin-title">{selectedContent}</p>
                <p>Criar nova entidade</p>
                <p>Atualizar entidade</p>
            </section>
        </div>
    );
};

export default Admin;