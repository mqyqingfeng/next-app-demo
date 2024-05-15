'use client';

import { useTranslation } from "@/app/i18n/client.js"
export default function Like({lng}) {
  const { t } = useTranslation(lng, 'basic')
  return <button>{t('like')}</button>
}