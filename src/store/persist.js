import {get} from 'lodash'

export function getPersistedState(path) {
	try {
		const serializedState = localStorage.getItem(`Test.${path}`);
		return serializedState === null ? undefined : JSON.parse(serializedState);
	} catch (err) {
		return undefined;
	}
}

export function persist(state, path) {
	try {
		const value = get(state, path);
		const serializedState = JSON.stringify(value);
		localStorage.setItem(`Test.${path}`, serializedState);
	} catch {
		// ignore write errors
	}
}
