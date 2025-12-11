import { useSearchParams } from 'next/navigation';
import {
  HiOutlineChat,
  HiOutlinePhone,
  HiOutlineCalendar,
  HiOutlineDatabase,
  HiOutlineIdentification,
  HiOutlineUserGroup,
} from 'react-icons/hi';

export const Package = () => {
  const params = useSearchParams();

  const dataPack = params.get('title');
  const dataAmount = params.get('data');
  const text = params.get('text');
  const voice = params.get('voice');
  const day = params.get('day');
  const esimType = params.get('esimType');
  const operatorType = params.get('operatorType'); 

  const iconClass = 'text-sm text-gray-600';

  const infoFields = [
    { label: 'Data', value: dataAmount, emptyText: '-', icon: <HiOutlineDatabase className={iconClass} /> },
    { label: 'SMS', value: text ? `${text} SMS` : '', emptyText: 'No Text', icon: <HiOutlineChat className={iconClass} /> },
    { label: 'Voice', value: voice ? `${voice} Min` : '', emptyText: 'No Voice', icon: <HiOutlinePhone className={iconClass} /> },
    { label: 'Validity', value: day ? `${day} Days` : '', emptyText: '-', icon: <HiOutlineCalendar className={iconClass} /> },
    { label: 'eSIM Type', value: esimType, emptyText: '-', icon: <HiOutlineIdentification className={iconClass} /> },
    { label: 'Operator Type', value: operatorType, emptyText: '-', icon: <HiOutlineUserGroup className={iconClass} /> },
  ];

  return (
    <div>
      {dataPack && (
        <p className="text-sm font-medium mb-2">
          Package : <span className="px-1 text-xs">{dataPack}</span>
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {infoFields.map((item, i) => (
          <div
            key={i}
            className={`bg-gray-50 border border-gray-100 p-3 py-2.5 rounded-lg flex justify-between text-sm
              ${!item.value ? 'hidden sm:flex' : ''}
            `}
          >
            <span className="flex gap-1 text-[13px] md:text-[13px] items-center">
              {item.icon} {item.label}
            </span>
            <span className="text-[13px] md:text-[13px] capitalize">
              {/* Show emptyText if value is missing */}
              {item.value || item.emptyText}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
