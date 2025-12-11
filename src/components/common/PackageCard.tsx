import Image from "next/image";
import React from "react";

interface PackageCardProps {
  countryFlag: string;
  dataAmount: string;
  validity: string;
  sms: number;
  coverage: string;
  status: string;
  price: string;
}

const PackageCard: React.FC<PackageCardProps> = ({
  countryFlag,
  dataAmount,
  validity,
  sms,
  coverage,
  status,
  price,
}) => {
  return (
    <div className="flex items-center justify-between p-4 border rounded-xl shadow-sm bg-white  3">
      <div className="flex items-center ">
        <Image src={countryFlag} alt="flag" width={100} height={100} className="w-10 h-10 rounded" />
        
        <div>
          <p className="font-semibold text-gray-800">{`${dataAmount} - ${validity}`}</p>
          <p className="text-sm text-gray-500">
            Call: N/A SMS: {sms} <br />
            Coverage: {coverage}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className={`font-semibold ${status === "Active" ? "text-green-500" : "text-gray-400"}`}>
          {status}
        </p>
        <p className="font-bold text-gray-900">{price}</p>
      </div>
    </div>
  );
};

export default PackageCard;
