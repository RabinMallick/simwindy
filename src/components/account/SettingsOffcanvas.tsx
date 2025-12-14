import { FiX } from 'react-icons/fi';
import { SettingItem } from './SettingItem';

export const SettingsOffcanvas = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity
                   ${open ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
      />

      {/* Bottom Sheet */}
      <div
        className={`fixed bottom-0 left-0 w-full bg-white rounded-t-xl z-100
                   transform transition-transform duration-300
                   ${open ? 'translate-y-0' : 'translate-y-full'}`}
      >
        <div className="p-4 flex justify-between items-center border-b">
          <h3 className="font-semibold text-base">Settings</h3>
          <button onClick={onClose}>
            <FiX size={20} />
          </button>
        </div>

        <div className="p-4 space-y-3">
          <SettingItem title="Edit Profile" />
          <SettingItem title="Change Password" />
          <SettingItem title="Language" />
          <SettingItem title="Notifications" />
          <SettingItem title="Privacy Policy" />
        </div>
      </div>
    </>
  );
};
