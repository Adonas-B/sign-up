'use client'

import { Box, SimpleGrid, Text, useCheckbox, useCheckboxGroup } from "@chakra-ui/react"
import { ReactNode, forwardRef } from "react"
import { Control, useController } from "react-hook-form"

type Ref = HTMLFormElement;
type Props = {
	children?: ReactNode;
	name: string;
	defaultValue?: string;
	options: string[];
	control: Control<any>;
}
type CheckboxCardProps = {
	value?: string
}

export const CheckboxCard = forwardRef<Ref, CheckboxCardProps>(({ ...props }, ref) => {
	const { state, getCheckboxProps, getInputProps, getLabelProps, htmlProps } = useCheckbox(props)

	const input = getInputProps({ ref })

	return (
		<Box as='label'
			cursor='pointer'
			borderWidth='1px'
			borderRadius='md'
			boxShadow={state.isFocused ? 'chakra-shadows-outline' : 'md'}
			bg={state.isChecked ? 'brand.100' : 'white'}
			px={5}
			py={3}
			minWidth={150}
			minHeight={{ base: '40px', sm: '150'}}
			display={'flex'}
			alignItems={'center'}
			justifyContent={'center'}
			border={state.isFocused ? '2px solid #3182ce' : ''}
			{...htmlProps}
			
		>
			<input {...input} />
			<Text color="black" fontWeight='semibold' {...getLabelProps()}>{props.value?.toUpperCase()}</Text>
		</Box>
	)
})

CheckboxCard.displayName = 'CheckboxCard'

export const CustomCheckboxGroup = forwardRef<Ref, Props>(({ control, name, options, ...props }, ref) => {
	const { field } = useController({
		name,
		control
	});

	const { getCheckboxProps } = useCheckboxGroup({
		...field
	});

	return (
		<SimpleGrid minChildWidth={'150px'} spacing={{ base: '2', sm: '8'}} justifyContent={"center"}>
			{options.map((value: string) => {
				const checkbox = getCheckboxProps({ value })
				return (
					<CheckboxCard key={value} {...checkbox} />
				)
			})}
		</SimpleGrid>
	);
}
);

CustomCheckboxGroup.displayName = "CustomCheckboxGroup";