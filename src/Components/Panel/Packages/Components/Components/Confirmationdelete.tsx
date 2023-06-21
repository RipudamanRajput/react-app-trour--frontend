import { Button, LegacyStack } from "@shopify/polaris";
import React, { useState } from "react";
import { DeleteMinor, MobileAcceptMajor, CancelMajor } from '@shopify/polaris-icons';

function ConfrimDelete(props: any) {
    const [confirmdelete, setconfirmdelete] = useState<boolean>(false);
    return (
        <>
            {!confirmdelete ?
                <Button
                    outline
                    disabled={props.disabled ? props.disabled : false}
                    destructive
                    icon={DeleteMinor}
                    onClick={() => setconfirmdelete(true)} />
                :
                <LegacyStack spacing="extraTight" distribution="center" alignment="center">
                    <Button
                        loading={props.loading ? props.loading : false}
                        onClick={() => { props.onClick(); setconfirmdelete(false) }}
                        icon={MobileAcceptMajor} />
                    <Button
                        outline
                        destructive
                        onClick={() => { setconfirmdelete(false) }}
                        icon={CancelMajor} />
                </LegacyStack>
            }
        </>
    )
}

export default ConfrimDelete;