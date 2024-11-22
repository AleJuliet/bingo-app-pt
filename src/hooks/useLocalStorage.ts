interface UseLocalStorageProps {
	cardId: number;
	saveId: number;
	checkedState: Array<number>;
}

export const useLocalStorage = (props: UseLocalStorageProps) => {
	localStorage.setItem(`${props.cardId.toString()}-${props.saveId.toString()}`, JSON.stringify(props.checkedState));

	return null;
}