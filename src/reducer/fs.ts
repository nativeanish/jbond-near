import { solved } from "../utils/init";
export type ActionType = { type: "solved"; payload: string };
export async function reducer(
	state: Promise<
		Array<{
			e_msg: string;
			image: string;
			meta_data: string;
			account: Array<{ account: string; id: number }>;
		}>
	>,
	action: ActionType
) {
	switch (action.type) {
		case "solved":
			return await solved(action.payload);
		default:
			return state;
	}
}
