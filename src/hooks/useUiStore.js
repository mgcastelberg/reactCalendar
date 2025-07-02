import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { onCloseDateModal, onOpenDateModal } from '../store/ui/uiSlice';

export const useUiStore = () => {

    const dispatch = useDispatch(); //solo de manera interna


    const { isDateModalOpen } = useSelector( state => state.ui );

    const openDateModal = () => {
        dispatch( onOpenDateModal() );
    }

    const closeDateModal = () => {
        dispatch( onCloseDateModal() );
    }

    const toggleDateModal = () => {
        ( isDateModalOpen ) ? closeDateModal() : openDateModal();
    }

    return {
        //* Properties
        isDateModalOpen,

        //* Methods
        openDateModal,
        closeDateModal,
        toggleDateModal,
    }

}
