import { CardMarked } from "../components/BingoCard";

interface UseSaveProps {
	cardId: number;
	saveId: number;
}

const encodeSaveId = (cardId: string, saveId: string) => `${cardId.toString()}-${saveId.toString()}`;

export const useSave = (props: UseSaveProps) => {
	const load = () => {
		const save = localStorage.getItem(encodeSaveId(props.cardId.toString(), props.saveId.toString()));
		if (save === null) return save;
		return JSON.parse(save);
	}

	const save = (cardState: CardMarked) => {
		if (props.cardId && props.saveId !== undefined && cardState !== undefined) {
			console.log('saving');
			localStorage.setItem(encodeSaveId(props.cardId.toString(), props.saveId.toString()), JSON.stringify(cardState));
		}
	}

	return { load, save };
}