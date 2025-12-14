import React from 'react'

export const Stats = () => {
    return (
        <div className="grid grid-cols-3 gap-3">
            {[
                { label: 'Balance', value: '$120' },
                { label: 'Orders', value: '12' },
                { label: 'eSIMs', value: '5' },
            ].map((item, i) => (
                <div
                    key={i}
                    className="bg-white rounded-md p-3 text-center border border-gray-200"
                >
                    <p className="text-sm text-gray-500">{item.label}</p>
                    <p className="text-lg font-semibold text-gray-800">
                        {item.value}
                    </p>
                </div>
            ))}
        </div>
    )
}
