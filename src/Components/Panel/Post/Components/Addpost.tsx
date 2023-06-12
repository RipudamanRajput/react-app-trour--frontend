import { LegacyCard, Page } from "@shopify/polaris";
import React, { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import axios from "axios";
import { AlertPop, Sessioncheker } from "../../../../Global/Alert";


function Addpost() {
    const [editorState, seteditorState] = useState<any>([]);

    function Blocktoobject(data: any) {
        function Datatoobject(info: any) {
            if (info?.['text-align']) {
                return [{ textAlign: info?.['text-align'] }]
            } else {
                return {}
            }
        }
        const ar: any = [];
        if (data) {
            Object.keys(data)?.forEach((_: any, index: number) => {
                ar.push({
                    key: data[index].key,
                    text: data[index].text,
                    type: data[index].type,
                    depth: data[index].depth,
                    inlineStyleRanges: data[index].inlineStyleRanges,
                    entityRanges: data[index].entityRanges,
                    data: Datatoobject(data[index].data)
                })
            })
            return ar;
        }
    }

    function entitymaytoObject(data: any) {
        function enitydata(name: any, data: any) {
            switch (name) {
                case "LINK":
                    return {
                        url: data.url,
                        targetOption: data.targetOption
                    }
                case "EMBEDDED_LINK":
                    return {
                        src: data.src,
                        height: data.height,
                        width: data.width
                    }
                default: {
                    return {
                        src: data.src,
                        height: data.height,
                        width: data.width,
                        alignment: data.alignment
                    }
                }
            }
        }
      
        const ar: any = [];
        if (data) {
            Object.keys(data)?.forEach((_: any, index: number) => {
                ar.push({
                    type: data[index].type,
                    mutability: data[index].mutability,
                    data: enitydata(data[index].type, data[index].data)
                })
            });
            return ar;
        } else {
            return {}
        }
    }

    const data = {
        blocks: Blocktoobject(editorState?.blocks),
        entityMap: entitymaytoObject(editorState?.entityMap)
    }
    // console.log(data, "=======>")

    function Addpost() {
        const config = {
            method: "post",
            url: process.env.REACT_APP_SHOP_NAME + "/api/addpost/",
            withCredentials: true,
            credentials: 'include',
            data: data,
            headers: {
                'Authorization': process.env.REACT_APP_TOKEN || '',
                'Content-Type': 'application/json'
            }
        };
        axios(config).then((res) => {
            Sessioncheker(res)

        }).catch((err) => {
            AlertPop("Error", err.toString(), "error");
        })
    }
    return (
        <Page
            title="Add Post"
            primaryAction={{
                content: "Save",
                onAction: () => Addpost()
            }}>
            <LegacyCard sectioned>
                <Editor
                    spellCheck
                    placeholder="Enter your text here:"
                    // toolbar={{
                    //     options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'image', 'remove', 'history'],
                    //     inline: {
                    //         inDropdown: false,
                    //         className: undefined,
                    //         component: undefined,
                    //         dropdownClassName: undefined,
                    //         options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace', 'superscript', 'subscript'],
                    //         bold: { className: undefined },
                    //         italic: { className: undefined },
                    //         underline: { className: undefined },
                    //         strikethrough: { className: undefined },
                    //         monospace: { className: undefined },
                    //         superscript: { className: undefined },
                    //         subscript: { className: undefined },
                    //     },
                    //     blockType: {
                    //         inDropdown: true,
                    //         options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote', 'Code'],
                    //         className: undefined,
                    //         component: undefined,
                    //         dropdownClassName: undefined,
                    //     },
                    //     fontSize: {
                    //         //   icon: fontSize,
                    //         options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96],
                    //         className: undefined,
                    //         component: undefined,
                    //         dropdownClassName: undefined,
                    //     },
                    //     fontFamily: {
                    //         options: ['Arial', 'Georgia', 'Impact', 'Tahoma', 'Times New Roman', 'Verdana'],
                    //         className: undefined,
                    //         component: undefined,
                    //         dropdownClassName: undefined,
                    //     },
                    //     list: {
                    //         inDropdown: false,
                    //         className: undefined,
                    //         component: undefined,
                    //         dropdownClassName: undefined,
                    //         options: ['unordered', 'ordered', 'indent', 'outdent'],
                    //         unordered: { className: undefined },
                    //         ordered: { className: undefined },
                    //         indent: { className: undefined },
                    //         outdent: { className: undefined },
                    //     },
                    //     textAlign: {
                    //         inDropdown: false,
                    //         className: undefined,
                    //         component: undefined,
                    //         dropdownClassName: undefined,
                    //         options: ['left', 'center', 'right', 'justify'],
                    //         left: { className: undefined },
                    //         center: { className: undefined },
                    //         right: { className: undefined },
                    //         justify: { className: undefined },
                    //     },
                    //     colorPicker: {
                    //         //   icon: color,
                    //         className: undefined,
                    //         component: undefined,
                    //         popupClassName: undefined,
                    //         colors: ['rgb(97,189,109)', 'rgb(26,188,156)', 'rgb(84,172,210)', 'rgb(44,130,201)',
                    //             'rgb(147,101,184)', 'rgb(71,85,119)', 'rgb(204,204,204)', 'rgb(65,168,95)', 'rgb(0,168,133)',
                    //             'rgb(61,142,185)', 'rgb(41,105,176)', 'rgb(85,57,130)', 'rgb(40,50,78)', 'rgb(0,0,0)',
                    //             'rgb(247,218,100)', 'rgb(251,160,38)', 'rgb(235,107,86)', 'rgb(226,80,65)', 'rgb(163,143,132)',
                    //             'rgb(239,239,239)', 'rgb(255,255,255)', 'rgb(250,197,28)', 'rgb(243,121,52)', 'rgb(209,72,65)',
                    //             'rgb(184,49,47)', 'rgb(124,112,107)', 'rgb(209,213,216)'],
                    //     },
                    //     link: {
                    //         inDropdown: false,
                    //         className: undefined,
                    //         component: undefined,
                    //         popupClassName: undefined,
                    //         dropdownClassName: undefined,
                    //         showOpenOptionOnHover: true,
                    //         defaultTargetOption: '_self',
                    //         options: ['link', 'unlink'],
                    //         link: { className: undefined },
                    //         unlink: { className: undefined },
                    //         linkCallback: undefined
                    //     },
                    //     emoji: {
                    //         //   icon: emoji,
                    //         className: undefined,
                    //         component: undefined,
                    //         popupClassName: undefined,
                    //         emojis: [
                    //             '😀', '😁', '😂', '😃', '😉', '😋', '😎', '😍', '😗', '🤗', '🤔', '😣', '😫', '😴', '😌', '🤓',
                    //             '😛', '😜', '😠', '😇', '😷', '😈', '👻', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '🙈',
                    //             '🙉', '🙊', '👼', '👮', '🕵', '💂', '👳', '🎅', '👸', '👰', '👲', '🙍', '🙇', '🚶', '🏃', '💃',
                    //             '⛷', '🏂', '🏌', '🏄', '🚣', '🏊', '⛹', '🏋', '🚴', '👫', '💪', '👈', '👉', '👉', '👆', '🖕',
                    //             '👇', '🖖', '🤘', '🖐', '👌', '👍', '👎', '✊', '👊', '👏', '🙌', '🙏', '🐵', '🐶', '🐇', '🐥',
                    //             '🐸', '🐌', '🐛', '🐜', '🐝', '🍉', '🍄', '🍔', '🍤', '🍨', '🍪', '🎂', '🍰', '🍾', '🍷', '🍸',
                    //             '🍺', '🌍', '🚑', '⏰', '🌙', '🌝', '🌞', '⭐', '🌟', '🌠', '🌨', '🌩', '⛄', '🔥', '🎄', '🎈',
                    //             '🎉', '🎊', '🎁', '🎗', '🏀', '🏈', '🎲', '🔇', '🔈', '📣', '🔔', '🎵', '🎷', '💰', '🖊', '📅',
                    //             '✅', '❎', '💯',
                    //         ],
                    //     },
                    //     embedded: {
                    //         //   icon: embedded,
                    //         className: undefined,
                    //         component: undefined,
                    //         popupClassName: undefined,
                    //         embedCallback: undefined,
                    //         defaultSize: {
                    //             height: 'auto',
                    //             width: 'auto',
                    //         },
                    //     },
                    //     image: {
                    //         //   icon: image,
                    //         className: undefined,
                    //         component: undefined,
                    //         popupClassName: undefined,
                    //         urlEnabled: true,
                    //         uploadEnabled: true,
                    //         alignmentEnabled: true,
                    //         uploadCallback: undefined,
                    //         previewImage: false,
                    //         inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
                    //         alt: { present: false, mandatory: false },
                    //         defaultSize: {
                    //             height: 'auto',
                    //             width: 'auto',
                    //         },
                    //     },
                    //     remove: { className: undefined, component: undefined },
                    //     history: {
                    //         inDropdown: false,
                    //         className: undefined,
                    //         component: undefined,
                    //         dropdownClassName: undefined,
                    //         options: ['undo', 'redo'],
                    //         undo: { className: undefined },
                    //         redo: { className: undefined },
                    //     },
                    // }}
                    // uploadCallback={(file: any) => console.log(file)}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    onChange={(w: any) => seteditorState(w)}
                // onEditorStateChange={(w: any) => seteditorState(w)}
                />
            </LegacyCard>
        </Page>
    );
}
export default Addpost;