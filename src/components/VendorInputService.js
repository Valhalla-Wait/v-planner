import React from 'react'
import { v4 as uuid } from 'uuid';
import { useFieldArray } from 'react-hook-form';
import { ServiceForm } from './Forms/Vendor/VendorServiceForm';
import f from '../validation/fieldName';

const VendorInputService = ({ register, control, isValidField, getErrorField, }) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name: f.serviceModels,
    });

    const generateId = () => {
        return parseInt(uuid(), 16)
    }

    const addService = () => {
        append({ id: generateId(), name: '', price: 0 })
    }

    return (
        <>
            {fields.map((input, index) =>
                <ServiceForm
                    key={input.id}
                    title={input.title}
                    remove={remove}
                    register={register}
                    index={index}
                    isValidField={isValidField}
                    getErrorField={getErrorField}
                />
            )}
            <div
                className="btn btn-light add-btn"
                onClick={addService}
            >Add item</div>
            <br />
        </>
    )
}

export default VendorInputService