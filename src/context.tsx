import * as React from "react";
import { reducer, ActionType } from "./reducer/fs";
import { get } from "./utils/init";
interface AppContextInterface {
	states: Promise<
		Array<{
			e_msg: string;
			image: string;
			meta_data: string;
			account: Array<{ account: string; id: number }>;
		}>
	>;

	dispatch: (arg0: ActionType) => void;
}
export const AppCtx = React.createContext<AppContextInterface | null>(null);
const Context = ({ children }: { children: React.ReactNode }) => {
	const [states, dispatch] = React.useReducer(reducer, get());
	return (
		<>
			<AppCtx.Provider value={{ states, dispatch }}>
				{children}
			</AppCtx.Provider>
		</>
	);
};
export default Context;
