'use client';

import ISDIHeader from '@/components/Schools/ISDI/Header/ISDIHeader';
import { ismeSite } from '@/lib/schools/isme/navigation';
import * as ismeSkin from './styles';

/**
 * ISME school header — the shared school header (components/Schools/ISDI/Header) driven by
 * ISME's navigation model and skin. A client wrapper because `ismeSite.applyHref` is a function
 * and the skin is a module namespace: neither can cross from the server layout as a prop.
 */
export default function ISMEHeader() {
  return <ISDIHeader site={ismeSite} skin={ismeSkin} />;
}
