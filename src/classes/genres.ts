export const genres: { names: string[] } = {
	names: ['horror', 'fantasy', 'history', 'triller', 'drama']
}
export const getGenres = (): string[] => {
	return genres.names;
}

export const addGenre = (name: string): void | never => {
	const genreName = name.trim().toLowerCase()
	if (genres.names.includes(genreName))
		throw Error(`Genre ${genreName} already exists`);

	genres.names.push(genreName);
}