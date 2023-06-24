import { Navigation } from '@shopify/polaris';
import {
    HomeMinor,
    // ProductsMinor,
    // LocationsMinor,
    FinancesMinor,
    CustomersMinor,
    ContentMinor,
    QuestionMarkInverseMinor,
    InsertDynamicSourceMinor,
    TemplateMinor
} from '@shopify/polaris-icons';
import React, { useEffect, useState } from 'react';

function Sidebar() {
    const [active, setactive] = useState<any>("Dashboard");

    const setactivetab = (data: any) => {
        setactive(data);
    }
    const item = [
        {
            url: '/panel/Dashboard',
            label: 'Dashboard',
            icon: HomeMinor,
            selected: active === "Dashboard",
            onClick: () => setactivetab('Dashboard')
        },

        // {
        //     url: '/panel/Locations',
        //     label: 'Locations',
        //     icon: LocationsMinor,
        //     selected: active === "Locations",
        //     onClick: () => setactivetab('Locations')
        // },
        // {
        //     url: '/panel/Hotels',
        //     label: 'Hotels',
        //     icon: HomeMinor,
        //     selected: active === "Hotels",
        //     onClick: () => setactivetab('Hotels')
        // },
        {
            url: '/panel/Packages',
            label: 'Packages',
            icon: FinancesMinor,
            selected: active === "Packages",
            onClick: () => setactivetab('Packages')
        },
        // {
        //     url: '/panel/Bookings',
        //     label: 'Bookings',
        //     icon: ProductsMinor,
        //     selected: active === "Bookings",
        //     onClick: () => setactivetab('Bookings')
        // },
        {
            url: '/panel/Users',
            label: 'Users',
            icon: CustomersMinor,
            selected: active === "Users",
            onClick: () => setactivetab('Users')
        },
        {
            url: '/panel/Media',
            label: 'Media',
            icon: ContentMinor,
            selected: active === "Media",
            onClick: () => setactivetab('Media')
        },
        {
            url: '/panel/Query',
            label: 'Query',
            icon: QuestionMarkInverseMinor,
            selected: active === "Query",
            onClick: () => setactivetab('Query')
        },
        {
            url: '/panel/Event',
            label: 'Event',
            icon: InsertDynamicSourceMinor,
            selected: active === "Event",
            onClick: () => setactivetab('Event')
        },
        // {
        //     url: '/panel/Post',
        //     label: 'Post',
        //     icon: TemplateMinor,
        //     selected: active === "Post",
        //     onClick: () => setactivetab('Post')
        // },

    ];
    useEffect(() => {
        const url = window.location.href;
        item.forEach((data, index) => {
            if (url.includes(data.label)) {
                setactivetab(data.label)
            }
        })
    }, [active])

    return (
        <Navigation location="/">
            <Navigation.Section
                items={item}
            />
        </Navigation>
    );
}

export default Sidebar;