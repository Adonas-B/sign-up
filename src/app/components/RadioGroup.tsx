'use client'
import { Box, SimpleGrid, Text, useRadio, useRadioGroup } from "@chakra-ui/react"
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

type RadioCardProps = {
	children: React.ReactNode
}

export const RadioCard = forwardRef<Ref, RadioCardProps>(({ children, ...props }, ref) => {
	const { getInputProps, getRadioProps, htmlProps, state } = useRadio(props)

	const input = getInputProps({ ref })
	const radio = getRadioProps()

	return (
		<Box as='label' {...htmlProps}>
			<input {...input} />
			<Box
				{...radio}
				cursor='pointer'
				borderWidth='1px'
				borderRadius='md'
				boxShadow='md'
				_checked={{
					bg: 'brand.100',
					color: 'white',
					boxShadow: 'brand.100',
				}}
				_focus={{
					boxShadow: 'outline',
				}}
				px={5}
				py={3}
				minWidth={150}
				minHeight={{ base: '40px', sm: '150'}}
				display={'flex'}
				alignItems={'center'}
				justifyContent={'center'}
			>
				{children}
			</Box>
		</Box>
	)
})

RadioCard.displayName = 'RadioCard'

export const CustomRadioGroup = forwardRef<Ref, Props>(({ control, name, defaultValue, options, ...props }, ref) => {
	const { field } = useController({
		name,
		control,
		defaultValue,
	});

	const { getRootProps, getRadioProps } = useRadioGroup({
		...field
	});

	return (
		<SimpleGrid minChildWidth={'150px'} spacing={{ base: '2', sm: '8'}} justifyContent={"center"}  {...getRootProps()}>
			{options.map((value: string) => {
				const radio = getRadioProps({ value })
				return (
					<RadioCard key={value} {...radio}>
						<Text color='black' fontWeight='semibold'>{value.toUpperCase()}</Text>
					</RadioCard>
				)
			})}
		</SimpleGrid>
	);
}
);

CustomRadioGroup.displayName = "CustomRadioGroup";
