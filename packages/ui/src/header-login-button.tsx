import { LogIn } from 'lucide-react';

export function HeaderLoginButton() {
  return (
    <a
      href="/api/auth/login"
      className="ui-btn ui-flex ui-items-center ui-space-x-2 ui-px-4 ui-py-2 ui-border ui-border-purple-700 ui-rounded-md ui-text-white ui-bg-purple-700 ui-hover:bg-purple-800 ui-transition-all ui-duration-200"
    >
      <LogIn className="ui-w-5 ui-h-5 ui-mr-2 ui-text-white" />
      <span className="ui-font-medium">Login</span>
    </a>
  );
}
