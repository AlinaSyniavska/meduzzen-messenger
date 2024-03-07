import {FC, ReactNode} from 'react';

import style from './Error.module.css';
import {Button} from "@mui/material";

interface IProps {
  children?: ReactNode;
  isOpen: boolean;
  toggle: () => void;
}

const Error: FC<IProps> = ({children, isOpen, toggle}) => {

  return (
    <>
      {isOpen && (
        <div className={style.modalOverlay} onClick={toggle}>
          <div onClick={(e) => e.stopPropagation()} className={style.modalBox}>
            {children}

            <Button onClick={toggle} variant="outlined">OK</Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Error;