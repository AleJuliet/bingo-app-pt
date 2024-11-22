interface UseSaveProps {
	cardId: number;
	saveId: number;
	checkedState: Array<number>;
}

export const useSave = (props: UseSaveProps) => {
	if (props.cardId && props.saveId && props.checkedState) {
		localStorage.setItem(`${props.cardId.toString()}-${props.saveId.toString()}`, JSON.stringify(props.checkedState));
	}

	return null;
}