import {useEffect, useState} from "react";

type FormLabelProps = {
    id: string,
    labelTxt: string,
    [key: string]: unknown
}
export const FormLabel = ({id, labelTxt, ...rest}: FormLabelProps) => {
    return (
        <label htmlFor={id}
               className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
               {...rest}
        >
            {labelTxt}
        </label>
    )
}

type FormInputProps = {
    id: string,
    placeholder: string,
    type: string
    [key: string]: unknown
}

export const FormInput = ({id, placeholder, type = "text", ...rest}: FormInputProps) => {
    const inputClassName = `bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`;

    return (
        <input type={type} id={id} className={inputClassName} placeholder={placeholder} {...rest}/>
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
            className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400 disabled:bg-blue-300"
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