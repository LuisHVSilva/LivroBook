import { useState } from "react";
import axios from "axios";
import {api} from "../utils/apiServer";

const useFormHandler = (urlPath) => {
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        console.clear();
        
        try {                             
            const apiCall  = api[urlPath];            
            const response = await apiCall(formData);            
            console.log("Sucesso:", response.data);
        } catch (err) {            
            console.log(err)
            setError(err.response?.data?.error || "Erro desconhecido");
        } finally {
            setLoading(false);
        }
    };

    return { formData, handleChange, handleSubmit, loading, error };
};

export default useFormHandler;
