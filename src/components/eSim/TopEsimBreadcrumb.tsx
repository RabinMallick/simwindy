
'use client'
import { useSearchParams } from 'next/navigation';
import { Breadcrumb } from '../include/Breadcrumb';

export const TopEsimBreadcrumb = () => {

    const searchParams = useSearchParams();
    const destination = searchParams.get('destination') ?? '';
    const type = searchParams.get('type') ?? '';
    return (
        <Breadcrumb type={type} destination={destination} />
    )
}
