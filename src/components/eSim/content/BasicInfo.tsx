"use client";
import { FC } from "react";
import { GiInfinity } from "react-icons/gi";
import {
  HiOutlineDeviceMobile,
  HiOutlineChat,
  HiOutlinePhone,
  HiOutlineCalendar,
  HiOutlineDatabase,
  HiOutlineIdentification,
  HiOutlineUserGroup,
  HiOutlineDocumentDuplicate,
  HiOutlineCheckCircle,
  HiOutlineAdjustments,
} from "react-icons/hi";

interface BasicInfoProps {
  data: any;
}

const iconClass = "text-gray-500 w-5 h-5";
const labelClass = "text-[12px] md:text-[13px] text-gray-600";
const valueClass = "text-[13px] font-semibold text-gray-800 capitalize";
const cardClass = "flex items-center space-x-2 bg-white border border-gray-100 rounded-md p-2 py-1.5 hover:bg-gray-100 transition-colors duration-200";

const BasicInfo: FC<BasicInfoProps> = ({ data }) => {

  const infoFields = [
    { label: "Data", value: data?.data ?? "-", icon: <HiOutlineDeviceMobile className={iconClass} /> },
    { label: "SMS", value: data?.text ? `${data.text} SMS` : "No Text", icon: <HiOutlineChat className={iconClass} /> },
    { label: "Voice", value: data?.voice ? `${data.voice} Min` : "No Call", icon: <HiOutlinePhone className={iconClass} /> },
    { label: "Validity", value: data?.day ? `${data.day} Days` : "-", icon: <HiOutlineCalendar className={iconClass} /> },
    { label: "Data MB", value: data?.amount ?? "-", icon: <HiOutlineDatabase className={iconClass} /> },
    { label: "Unlimited", value: data?.isUnlimited ? "Yes" : "No", icon: <GiInfinity className={iconClass} /> },
    { label: "eSIM Type", value: data?.esimType ?? "-", icon: <HiOutlineIdentification className={iconClass} /> },
    { label: "Operator", value: data?.operatorTitle ?? "-", icon: <HiOutlineUserGroup className={iconClass} /> },
    { label: "Operator Type", value: data?.operatorType ?? "-", icon: <HiOutlineUserGroup className={iconClass} /> },
    { label: "Plan Type", value: data?.planType ?? "-", icon: <HiOutlineDocumentDuplicate className={iconClass} /> },
    { label: "Rechargeable", value: data?.rechargeability ? "Yes" : "No", icon: <HiOutlineCheckCircle className={iconClass} /> },
    { label: "KYC Required", value: data?.isKycVerify ? "Yes" : "No", icon: <HiOutlineAdjustments className={iconClass} /> },
    { label: "Activation Policy", value: data?.activationPolicy ?? "-", icon: <HiOutlineAdjustments className={iconClass} /> },
  ];


  return (
    <div>
      {/* Header */}
      <div className="w-full  p-2 md:px-4  bg-gray-50 hover:bg-gray-100 transition-colors">
        <h2 className="text-[13px] md:text-[18px] font-semibold text-gray-800">{data?.title}</h2>
        <p className="text-[13px] text-gray-600">{data?.operatorTitle} • {data?.countryTitle}</p>
      </div>

      <div className="mt-3 grid grid-cols-2 lg:grid-cols-3 gap-3">
        {infoFields.map((item, idx) => (
          <div key={idx} className={cardClass}>
            {item.icon}
            <div>
              <div className={labelClass}>{item.label}</div>
              <div className={valueClass}>{item.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BasicInfo;
