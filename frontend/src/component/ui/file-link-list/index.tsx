import { Button } from '@mui/material'
import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { IFAQFile } from 'models/IFAQ';

interface FileLinkListProps{
    files:IFAQFile[]
}

const FileLinkList:FC<FileLinkListProps> = ({files}) => {
  return (
    <div>
        {
        files?.map((file, index)=>
            <Link key={file.name+index} to={`http://localhost:8000${file.file}`}>
              <Button>
                <FileCopyIcon/>
                {file.name}.{file.file.split('.')[file.file.split('.').length-1]}
              </Button>
            </Link>
          )
      }
    </div>
  )
}

export default FileLinkList