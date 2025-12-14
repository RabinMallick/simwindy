export const SettingItem = ({ title }: { title: string }) => {
  return (
    <button className="w-full p-3 bg-gray-100 rounded-md text-left text-sm">
      {title}
    </button>
  );
};
