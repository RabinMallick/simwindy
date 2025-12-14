import React, { FC } from 'react'
import { TopHeader } from '../include/TopHeader';
import { FAQ } from '../landing/FAQ';
import { Offcanvase } from '../common/Offcanvase';

// --- Props ---
interface FAQSupportProps {
    open: boolean;
    onClose: () => void;
}

export const FAQSupport: FC<FAQSupportProps> = ({ open, onClose }) => {
    return (
        <Offcanvase open={open} onClose={onClose}>
            {/* Header */}
            <TopHeader title="Support / FAQ" onClick={onClose} cross={true} show={true} />


            <div className="px-3">
                <FAQ className='mt-0' />
            </div>

        </Offcanvase>
    )
}
