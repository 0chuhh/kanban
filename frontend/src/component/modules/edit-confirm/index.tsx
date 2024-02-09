import ConfirmDialog, { ConfirmDialogProps } from 'component/ui/confirm-dialog'
import React, { FC } from 'react'

const EditConfirm:FC<Omit<ConfirmDialogProps, 'title' | 'content'>> = ({...restProps}) => {
    return (
      <ConfirmDialog
          {...restProps}
          title='Редактирование'
          content='Вы уверены, что хотите сохранить изменения?'
      />
    )
  }
export default EditConfirm