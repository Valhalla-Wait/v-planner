import React, { useContext } from 'react'
import { ModalContext } from '../../../../context/ModalContext'
import { classNames } from '../../../../utils/classNames'
import ModalMiddleContent from '../../../UI/Modal/ModalMiddleContent'
import Button from '../../UI/Button/Button'
import { schemaServiceType } from '../../../../validation/schemas'
import f from '../../../../validation/fieldName'
import Input from '../../UI/Input/Input'
import cls from "./ServiceTypeModal.module.scss"
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

const ServiceTypeModal = ({ callback, header, footer, name = "" }) => {
    const modal = useContext(ModalContext)
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        mode: "all",
        resolver: yupResolver(schemaServiceType()),
        defaultValues: {
            [f.name]: name
        }
    });

    const isValidField = (field) => !errors[field];
    const getErrorField = (field) => errors[field]?.message;

    const handleClick = (data) => {
        modal.destroy()
        callback(data)
    }

    return (
        <ModalMiddleContent>
            <form onSubmit={handleSubmit(handleClick)}>
                <div className={cls.header}>
                    <h4>
                        {header}
                    </h4>
                </div>
                <div className={cls.body}>
                    <label className={cls.label}>Title</label>
                    <Input
                        className={cls.input}
                        isValid={isValidField(f.name)}
                        error={getErrorField(f.name)}
                        register={register(f.name)}
                    />
                </div>
                <div className={cls.footer}>
                    <Button
                        className={classNames(cls.footerBtn, {}, [cls.footerConfirmBtn])}
                        type="submit"
                    >
                        {footer}
                    </Button>
                    <Button
                        className={classNames(cls.footerBtn, {}, [cls.footerCancelBtn])}
                        onClick={modal.destroy}
                        type="button"
                    >Cancel</Button>
                </div>
            </form>
        </ModalMiddleContent >
    )
}

export default ServiceTypeModal