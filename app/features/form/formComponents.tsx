import {useEffect, useState} from "react";

type FormLabelProps = {
    id: string,
    labelTxt: string,
    [key: string]: unknown
}
export const FormLabel = ({id, labelTxt, ...rest}: FormLabelProps) => {
    return (
        <label htmlFor={id}
               className="block mb-2 text-sm font-medium text-gray-900"
               {...rest}
        >
            {labelTxt}
        </label>
    )
}

type FormInputProps = {
    id?: string,
    name: string
    placeholder: string,
    type: string
    [key: string]: unknown
}

export const FormInput = ({id, name, placeholder, type = "text", ...rest}: FormInputProps) => {
    return (
        <input type={type}
               id={id}
               name={name}
               className="border text-sm rounded-lg block w-full p-2.5 border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 focus:border-2"
               placeholder={placeholder}
               {...rest}
        />
    )
}

type FormSubmitButtonProps = {
    buttonTxt: string,
    [key: string]: unknown
}
export const FormSubmitButton = ({buttonTxt, ...rest}: FormSubmitButtonProps) => {
    return (
        <button
            type="submit"
            className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 disabled:bg-blue-300 focus:border-2"
            {...rest}
        >
            {buttonTxt}
        </button>
    )
}

export const ValidationMessage = ({error, isSubmitting}: { error: string | undefined, isSubmitting: boolean }) => {
    const [show, setShow] = useState(!!error);

    useEffect(() => {
        const id = setTimeout(() => {
            const hasError = !!error;
            setShow(hasError && !isSubmitting);
        });
        return () => clearTimeout(id);
    }, [error, isSubmitting]);

    return (
        <div
            style={{
                opacity: show ? 1 : 0,
                height: show ? "1em" : 0,
                color: "red",
                transition: "all 300ms ease-in-out",
            }}
        >
            {error}
        </div>
    );
}