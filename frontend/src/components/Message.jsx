import { XCircle, CheckCircle } from 'lucide-react';

export function Message({ type, message }) {
  const bgColor = type === 'success' ? 'bg-green-100' : 'bg-red-100';
  const textColor = type === 'success' ? 'text-green-800' : 'text-red-800';
  const Icon = type === 'success' ? CheckCircle : XCircle;

  return (
    <div className={`${bgColor} ${textColor} px-4 py-3 rounded relative`} role="alert">
      <div className="flex items-center">
        <Icon className="w-5 h-5 mr-2" />
        <span className="block sm:inline">{message}</span>
      </div>
    </div>
  );
}
