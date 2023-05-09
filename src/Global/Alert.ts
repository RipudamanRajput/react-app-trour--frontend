import React, { FC, ReactElement } from "react";
import swal from "sweetalert";

interface AlertPopI {
    title?: String
    text: String
    icon?: "error" | "warning" | "success"
}
export function AlertPop(title:any,text:any,icon:any) {
    console.log(title,text,icon)
     swal({
        title: title,
        text: text,
        icon: icon,
    })



}