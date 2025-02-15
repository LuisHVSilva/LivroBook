import useFormHandler from "../hooks/useFormHandler";

const Forms = ({ urlPath, fields, buttonTitle }) => {
    const { formData, handleChange, handleSubmit, loading, error } = useFormHandler(urlPath);
    
    return (
        <form onSubmit={handleSubmit}>
            {fields.map((field) => (
                <div key={field.id}>
                    <label htmlFor={field.id}>{field.label}</label>
                    <input
                        type={field.type}
                        id={field.id}
                        name={field.id}
                        value={formData[field.id] || ""}
                        onChange={handleChange}
                        required
                    />
                </div>
            ))}

            {error && <p style={{ color: "red" }}>{error}</p>}

            <button type="submit" disabled={loading}>
                {loading ? "Enviando..." : buttonTitle}
            </button>
        </form>
    );
};

export default Forms;
