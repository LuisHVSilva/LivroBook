import {useAdminEntityAdd} from "../../../hooks/admin/adminMutations.hook.ts";
import type {EntityDtoInfos} from "../../../../core/models/types/admin.type.ts";
import {formUtil} from "../../../../core/utils/form/form.util.ts";
import {FormFactory} from "../../../factories/FormFactory.tsx";
import {useState} from "react";

type AdminEntityAddDataProps = {
    selectedEntity: string;
};

const AdminEntityAddData = ({selectedEntity}: AdminEntityAddDataProps) => {
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean | null>(null);

    const {formBaseData, referenceData, handleInclude} = useAdminEntityAdd(selectedEntity, setSuccess, setError);

    if (!formBaseData || formBaseData.length === 0) {
        return <h1>Sem valores cadastrados</h1>;
    }

    return (
        <>
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">Registro incluido com sucesso</p>}

            <form action={handleInclude}>
                {
                    Object.entries(formBaseData).map(([, value]: [string, EntityDtoInfos]) => {
                        const valueKey = Object.keys(value)[0];
                        const options = referenceData && valueKey in referenceData
                            ? formUtil.getOptionsValueFromArrayObject(referenceData, valueKey, String(value))
                            : null;

                        const {label, type, mandatory} = Object.values(value)[0];

                        return options ? FormFactory.makeSelectField(valueKey, label ?? valueKey, options) : FormFactory.makeInputField(valueKey, label ?? valueKey, undefined, type, mandatory)
                    })
                }

                <button type="submit">Incluir</button>
            </form>
        </>
    )
}

export default AdminEntityAddData;

