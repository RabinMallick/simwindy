import Image from 'next/image';

export const ProfileHeader = () => {
  return (
    <div className="px-3 mt-4">
      <div className="bg-white rounded-md p-3 flex items-center gap-4 border border-gray-200">
        <Image
          src="/assets/help.png"
          alt="User"
          width={60}
          height={60}
          className="rounded-full border-2 border-gray-100 h-[50] w-[50]"
        />

        <div className="flex-1">
          <h2 className="text-lg font-semibold text-gray-800">Apurbo Kumar</h2>
          <p className="text-sm text-gray-500">apurbo@email.com</p>
        </div>

        <button className="text-sm text-blue-600 font-medium">Edit</button>
      </div>
    </div>
  );
};
