import { AutoSelection, Button, Combobox, Icon, LegacyStack, Listbox, Tag } from "@shopify/polaris";
import { SearchMinor, DeleteMinor } from '@shopify/polaris-icons';
import React, { useCallback, useMemo, useState } from "react";

function IncludesItem(props: any) {
    const { Includes, setIncludes, setincludemodal, includemodal,include_data } = props
   
    const removeincludes = useMemo(
        () => include_data,
        [include_data],
    );
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState(removeincludes);

    const updateText = useCallback(
        (value: string) => {
            setInputValue(value);

            if (value === '') {
                setOptions(removeincludes);
                return;
            }

            const filterRegex = new RegExp(value, 'i');
            const resultOptions = removeincludes.filter((option: any) =>
                option.label.match(filterRegex),
            );
            setOptions(resultOptions);
        },
        [removeincludes],
    );

    const updateSelection = useCallback(
        (selected: string) => {
            if (Includes.includes(selected)) {
                setIncludes(
                    Includes.filter((option: string) => option !== selected),
                );
            } else {
                setIncludes([...Includes, selected]);
            }

            updateText('');
        },
        [Includes, updateText],
    );

    const removeTag = useCallback(
        (tag: string) => () => {
            const options = [...Includes];
            options.splice(options.indexOf(tag), 1);
            setIncludes(options);
        },
        [Includes],
    );

    const tagsMarkup = Includes.map((option: any) => (
        <Tag key={`option-${option}`} onRemove={removeTag(option)}>
            {option}
        </Tag>
    ));

    const optionsMarkup =
        options.length > 0
            ? options.map((option: any) => {
                const { label, value } = option;
                return (
                    <Listbox.Option
                        key={`${value}`}
                        value={value}
                        selected={Includes.includes(value)}
                        accessibilityLabel={label}
                    >
                        {label}
                    </Listbox.Option>
                );
            })
            : null;

    return (
        <>
            <Combobox
                allowMultiple
                activator={
                    <Combobox.TextField
                        prefix={<Icon source={SearchMinor} />}
                        onChange={updateText}
                        label="Includes"
                        value={inputValue}
                        helpText={
                            <Button
                                plain
                                onClick={() => setincludemodal(!includemodal)}>
                                Customize Includes
                            </Button>}
                        placeholder="Search tags"
                        autoComplete="off"
                    />
                }>
                {optionsMarkup ? (
                    <Listbox
                        autoSelection={AutoSelection.None}
                        onSelect={updateSelection}>
                        {optionsMarkup}
                    </Listbox>
                ) : null}
            </Combobox>
            <LegacyStack>{tagsMarkup}</LegacyStack>
        </>
    )
}

export default IncludesItem;