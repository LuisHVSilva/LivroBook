// import {type NavigateFunction, useNavigate} from "react-router-dom";
import {useState} from "react";
import type {RegisterUserAuthRequest} from "../../core/api/types/auth.types.ts";
import {formUtil} from "../../core/utils/form.util.ts";
import {ConflictError, NullFieldError, ValidationError} from "../../core/errors/generic.error.ts";
import {authApiService} from "../../core/api/services/auth.api.service.ts";
import InputField from "../components/InputField.tsx";

const RegisterUser = () => {
    // const [selectedDDDPhone, setSelectedDDDPhone] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [passwordCriteria, setPasswordCriteria] = useState({
        minLength: false,
        uppercase: false,
        specialChar: false,
    });

    const handleConfirmPasswordChange = (value: string) => {
        setPasswordsMatch(password === value);
    };

    const validatePassword = (value: string) => {
        const criteria = {
            minLength: value.length >= 6,
            uppercase: /[A-Z]/.test(value),
            specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(value),
        };

        setPasswordCriteria(criteria);
        setPassword(value);
    };


    async function handleRegister(formData: FormData): Promise<void> {
        try {

            const payload: RegisterUserAuthRequest = {
                name: formUtil.getFormValue(formData, "name"),
                email: formUtil.getFormValue(formData, "email"),
                birthday: new Date(formData.get("birthday")?.toString() ?? ""),
                userCredential: {
                    password: formUtil.getFormValue(formData, "password"),
                },
            };

            // console.log(payload)
            await authApiService.register(payload);
        } catch (e) {
            if (e instanceof NullFieldError || e instanceof ValidationError || e instanceof ConflictError) {
                setError(e.message);
            }
            console.clear()
            console.log(e);
        }

    }

    return (
        <>
            {error && <p style={{color: "red"}}>{error}</p>}
            <section id="register-user">
                <p className="h1">Bem vindo à LivroBook!</p>
                <form id="login-form" action={handleRegister}>
                    <InputField
                        name="name"
                        type="text"
                        placeHolder="Nome"
                        required={true}
                    />

                    <InputField
                        name="email"
                        type="email"
                        placeHolder="E-mail"
                        required={true}
                    />

                    <InputField
                        name="password"
                        type="password"
                        placeHolder="Senha"
                        required={true}
                        onChangeFunction={validatePassword}
                    />
                    <div id="password-info">
                        <p className={passwordCriteria.minLength ? "field-not-informed" : "field-wrong"}>
                            * Mín. 6 letras
                        </p>
                        <p className={passwordCriteria.specialChar ? "field-not-informed" : "field-wrong"}>
                            * 1 caracter especial
                        </p>
                        <p className={passwordCriteria.uppercase ? "field-not-informed" : "field-wrong"}>
                            * 1 letra maiúscula
                        </p>
                    </div>

                    <InputField
                        name="confirmPassword"
                        type="password"
                        placeHolder="Confirme sua senha"
                        required={true}
                        onChangeFunction={handleConfirmPasswordChange}
                        hasError={!passwordsMatch}
                    />

                    <InputField
                        name="birthday"
                        type="date"
                        placeHolder="Data de nascimento"
                        required={true}
                    />
                    {/*<div className="form-area">
                        <SelectField
                            name="documentTypeId"
                            label="Tipo de documento"
                            options={documentTypesList?.data ?? []}
                            getValue={(c) => c.id}
                            getLabel={(c) => c.description}
                        />
                        <input
                            type="text"
                            name="document"
                            placeholder="Documento"
                        />
                    </div>
                    <div className="form-area">

                        <SelectField
                            name="countryId"
                            label="País"
                            options={countriesList?.data ?? []}
                            getValue={(c) => c.id}
                            getLabel={(c) => c.description}
                            onChange={(val) => setSelectedCountry(Number(val))}
                        />

                        <SelectField
                            name="stateId"
                            label="Estado"
                            options={statesList?.data ?? []}
                            getValue={(c) => c.id}
                            getLabel={(c) => c.description}
                            onChange={(val) => setSelectedState(Number(val))}
                        />

                        <SelectField
                            name="cityId"
                            label="Cidade"
                            options={citiesList?.data ?? []}
                            getValue={(c) => c.id}
                            getLabel={(c) => c.description}
                        />
                    </div>*/}
                    {/*<div className="form-area">
                        <SelectField
                            name="phoneTypeId"
                            label="Tipo de Telefone"
                            options={phoneTypesList?.data ?? []}
                            getValue={(c) => c.id}
                            getLabel={(c) => c.description}

                        />
                        <SelectField
                            name="ddi"
                            label="DDI"
                            options={phoneCodesList?.data ?? []}
                            getValue={(c) => c.ddiCode}
                            getLabel={(c) => c.ddiCode}
                            onChange={(val) => setSelectedDDDPhone(Number(val))}
                        />
                        <SelectField
                            name="ddd"
                            label="DDD"
                            options={dddList?.data ?? []}
                            getValue={(c) => c.id}
                            getLabel={(c) => c.dddCode}
                        />
                        <input
                            type="phone"
                            name="phone"
                            placeholder="Telefone"
                        />
                    </div>*/}
                    <button type="submit">
                        Criar conta
                    </button>
                </form>

            </section>

        </>
    )
}

export default RegisterUser;