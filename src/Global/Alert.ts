import { useState } from "react";
import { Button, Modal, Toast, } from "@shopify/polaris";

import swal from "sweetalert";

export function AlertPop(title: any, text: any, icon: any) {
    swal({
        title: title,
        text: text,
        icon: icon,
    })
}

export function Sessioncheker(data: any) {
    if (data?.data?.sessionActive === false) {
        localStorage.removeItem('Data');
        window.location.reload()
    }
}

