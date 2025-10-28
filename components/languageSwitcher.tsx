'use client';

import {useLocale} from 'next-intl';
import {useRouter, usePathname} from '@/i18n/navigation';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    router.replace(pathname, {locale: e.target.value as 'en' | 'de'});
  }

  return (
    <select
      value={locale}
      onChange={handleChange}
      className="border rounded px-2 py-1 text-sm"
    >
      <option value="en">English</option>
      <option value="de">Deutsch</option>
    </select>
  );
}