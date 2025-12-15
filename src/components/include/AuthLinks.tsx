import { MdPersonAdd } from "react-icons/md";
import Link from "next/link";
import { IconType } from "react-icons";
import { IoLogInSharp } from "react-icons/io5";

type AuthLink = {
  href: string;
  label: string;
  Icon: IconType; 

  className: string;
};

const links: AuthLink[] = [
  { href: "/login", label: "Login", Icon: IoLogInSharp, className:'bg-(--primary) text-white  hover:bg-(--primary)/90' },
  { href: "/register", label: "Register", Icon: MdPersonAdd, className:'bg-white text-(--primary)  hover:bg-gray-50/90' },
];

export default function AuthLinks() {
  return (
    <div className="flex gap-3">
      {links.map(({ href, label, Icon, className }) => (
        <Link
          key={href}
          href={href}
          className={`${className} flex items-center gap-2 px-2 py-1 rounded   border border-gray-200`}
        >
          <Icon size={20} />
          <span className="">{label}</span>
        </Link>
      ))}
    </div>
  );
}
