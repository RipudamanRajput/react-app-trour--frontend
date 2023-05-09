import { TopBar } from "@shopify/polaris";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function TopbarPannel(props: any) {
    const history = useNavigate();
    const userID = useSelector((state: any) => state.login.username)
    const [menuopen, setmenuopen] = useState(false)
    return (
        <>
            <TopBar
                showNavigationToggle
                userMenu={<TopBar.UserMenu
                    actions={[
                        {
                            items: [
                                {
                                    content: "Logout",
                                    onAction: () => {
                                        history('/login')
                                        localStorage.removeItem('Data')
                                        window.location.reload()
                                    }
                                },
                            ]
                        },
                    ]}
                    name={`${userID?.username}`}
                    detail={`${userID?.id}`}
                    initials={`${userID?.username?.substring(0, 1).toUpperCase()}`}
                    open={menuopen}
                    onToggle={() => { setmenuopen(!menuopen) }}
                />} />
        </>
    )
}
export default TopbarPannel;