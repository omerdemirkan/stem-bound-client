import { EForms, IFormData } from "../../utils/types";
import { useEffect, useState } from "react";
import { getFormDataByKey } from "../../utils/helpers";

export default function useFormData(
    formKey: EForms,
    options?: { initialData: any }
): IFormData | null {
    const [formData, setFormData] = useState<IFormData | null>(
        getFormDataByKey(formKey)
    );
    useEffect(
        function () {
            if (formKey) {
                const formData = getFormDataByKey(formKey);
                if (options?.initialData) {
                    formData.setInitialValues(options?.initialData);
                }
                setFormData(formData);
            }
        },
        [formKey]
    );

    return formData;
}
