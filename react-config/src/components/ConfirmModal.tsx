import React from 'react';
import ReactDom from 'react-dom'

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onClickPayment: () => void
}

const ConfirmModal = ({ isOpen, onClose, onClickPayment }: Props) => {
  if (!isOpen) return null
  return ReactDom.createPortal(
    <div className='overlay-layer' onClick={onClose}>
      <div className="modal-layer">
        <p>결제 하시겠습니까?</p>
        <div>
          <button onClick={onClickPayment}>결제</button>
          <button onClick={onClose}>취소</button>
        </div>
      </div>
    </div>,
    document.getElementById('portal')!
  )
}

export default ConfirmModal
