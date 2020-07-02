import { EForms, IFormData } from "../../utils/types";
import { useEffect, useState } from "react";
import { getFormDataByKey } from "../../utils/helpers/form.helpers";

export default function useFormData(formKey: EForms): IFormData | null {
    const [formData, setFormData] = useState<IFormData | null>(null);
    useEffect(
        function () {
            if (formKey) {
                setFormData(getFormDataByKey(formKey));
            }
        },
        [formKey]
    );

    return formData;
}
