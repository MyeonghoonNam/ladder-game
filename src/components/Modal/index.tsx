import ModalPotal from './portal';

import * as Styled from './styled';

interface Props {
  children?: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export default function Modal({ children, isOpen, onClose }: Props) {
  if (!isOpen) return;

  return (
    <ModalPotal>
      <Styled.ModalDim>
        <Styled.ModalContents>
          <Styled.ModalCloseButton type="button" onClick={onClose}>
            &times;
          </Styled.ModalCloseButton>
          {children}
        </Styled.ModalContents>
      </Styled.ModalDim>
    </ModalPotal>
  );
}
