import { Navigation } from '@shopify/polaris';
import { HomeMinor, OrdersMinor, ProductsMinor,LocationsMinor,FinancesMinor,CustomersMinor } from '@shopify/polaris-icons';
import React, { useEffect, useState } from 'react';

function Sidebar() {
    const [active, setactive] = useState("Dashboard");

    const setactivetab = (data: any) => {
        setactive(data);
    }
    const item = [
        {
            url: '/panel/Dashboard',
            label: 'Dashboard',
            icon: HomeMinor,
            selected: active == "Dashboard",
            onClick: () => setactivetab('Dashboard')
        },
        // {
        //     url: '/panel/Profile',
        //     label: 'Profile',
        //     icon: OrdersMinor,
        //     selected: active == "Profile",
        //     onClick: () => setactivetab('Profile')
        // },
        // {
        //     url: '/panel/Products',
        //     label: 'Products',
        //     icon: ProductsMinor,
        //     selected: active == "Products",
        //     onClick: () => setactivetab('Products')
        // },
        {
            url: '/panel/Locations',
            label: 'Locations',
            icon: LocationsMinor,
            selected: active == "Locations",
            onClick: () => setactivetab('Locations')
        },
        {
            url: '/panel/Hotels',
            label: 'Hotels',
            icon: HomeMinor,
            selected: active == "Hotels",
            onClick: () => setactivetab('Hotels')
        },
        {
            url: '/panel/Packages',
            label: 'Packages',
            icon: FinancesMinor,
            selected: active == "Packages",
            onClick: () => setactivetab('Packages')
        },
        {
            url: '/panel/Bookings',
            label: 'Bookings',
            icon: ProductsMinor,
            selected: active == "Bookings",
            onClick: () => setactivetab('Bookings')
        },
        {
            url: '/panel/Users',
            label: 'Users',
            icon: CustomersMinor,
            selected: active == "Users",
            onClick: () => setactivetab('Users')
        },

    ];
    useEffect(() => {
        const url = window.location.href;
        item.map((data, index) => {
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