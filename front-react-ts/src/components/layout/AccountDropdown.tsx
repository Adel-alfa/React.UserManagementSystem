import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { LogOutIcon, SettingsIcon, HelpCircleIcon, BadgeCheckIcon } from "lucide-react";
import useAuth from "../../hooks/useAuth";
export function AccountDropdown() {
    const {  user, logout } = useAuth();
	
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className=" rounded-full px-3 py-2 hover:bg-gray-100">
        <img
          src="https://i.pravatar.cc/300"
          alt="User avatar"
          className="rounded-full w-10 h-10 ring-2 ring-blue-500"
        />
       
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          sideOffset={8}
          className="z-50 min-w-[220px] rounded-md border border-gray-100 bg-white p-2 me-6 shadow-lg shadow-gray-500/50 "
        >
          <DropdownMenu.Label className="px-2 py-1.5 text-sm text-muted-foreground">
            {user ? user.email : "--"} 
          </DropdownMenu.Label>
          <DropdownMenu.Separator className="my-1 h-px bg-gray-200" />

          <DropdownMenu.Item className="flex items-center gap-2 rounded px-2 py-1.5 text-sm hover:bg-gray-100">
            <SettingsIcon className="size-4 text-gray-500" />
            Account settings
          </DropdownMenu.Item>

          <DropdownMenu.Item className="flex items-center gap-2 rounded px-2 py-1.5 text-sm hover:bg-gray-100">
            <HelpCircleIcon className="size-4 text-gray-500" />
            Support
          </DropdownMenu.Item>

          <DropdownMenu.Item className="flex items-center gap-2 rounded px-2 py-1.5 text-sm hover:bg-gray-100">
            <BadgeCheckIcon className="size-4 text-gray-500" />
            License
          </DropdownMenu.Item>

          <DropdownMenu.Separator className="my-1 h-px bg-gray-200" />

          <DropdownMenu.Item className="flex items-center gap-2 rounded px-2 py-1.5 text-sm text-red-600 hover:bg-red-50"
          onClick={logout}>
            <LogOutIcon className="size-4 text-red-600" />
            Sign out
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
export  default AccountDropdown;