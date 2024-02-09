import ConfirmDialog, { ConfirmDialogProps } from 'component/ui/confirm-dialog'
import React, { FC } from 'react'


const DeleteConfirm:FC<Omit<ConfirmDialogProps, 'title' | 'content'>> = ({...restProps}) => {
  return (
    <ConfirmDialog
        {...restProps}
        title='Удаление'
        content='Вы уверены, что хотите продолжить удаление?'
    />
  )
}

export default DeleteConfirm